import { readFile, readdir } from "node:fs/promises";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { parse } from "yaml";

const root = new URL("../", import.meta.url);
const contract = parse(
  await readFile(new URL("psn.openapi.yaml", root), "utf8")
) as {
  components: {
    schemas: Record<string, object>;
    examples: Record<string, { externalValue: string }>;
  };
  paths: Record<
    string,
    {
      get: {
        operationId: string;
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: string };
                examples: Record<string, { $ref: string }>;
              };
            };
          };
        };
      };
    }
  >;
};

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
// Register the OpenAPI schema container so Ajv resolves its JSON Pointer refs.
// `components` is a container rather than a JSON Schema validation keyword.
ajv.addKeyword("components");
ajv.addSchema({ components: contract.components }, "psn");

const cases = Object.values(contract.paths).flatMap(({ get }) => {
  const response = get.responses["200"].content["application/json"];
  return Object.values(response.examples).map(({ $ref }) => {
    const name = $ref.replace("#/components/examples/", "");
    return {
      operation: get.operationId,
      fixture: contract.components.examples[name].externalValue,
      validate: ajv.compile({ $ref: `psn${response.schema.$ref}` })
    };
  });
});

const readFixture = async (file: string) =>
  JSON.parse(await readFile(new URL(file, root), "utf8"));

describe("OpenAPI response fixtures", () => {
  it("references every response fixture from an operation", async () => {
    const files = await readdir(new URL("fixtures/", root));
    expect(
      cases.map(({ fixture }) => fixture.replace("./fixtures/", "")).sort()
    ).toEqual(files.filter((file) => file.endsWith(".json")).sort());
  });

  it.each(cases)(
    "validates $fixture for $operation",
    async ({ fixture, validate }) => {
      expect(
        validate(await readFixture(fixture)),
        ajv.errorsText(validate.errors)
      ).toBe(true);
    }
  );

  const validateUserTrophies = ajv.compile({
    $ref: "psn#/components/schemas/UserTrophiesEarnedForTitleResponse"
  });

  it.each([
    ["trophyId", "38"],
    ["trophyEarnedRate", 20.8],
    ["earnedDateTime", "yesterday"]
  ] as const)("rejects an invalid %s", async (property, value) => {
    const data = await readFixture("./fixtures/user-trophies-ps4.json");
    data.trophies[0][property] = value;
    expect(validateUserTrophies(data)).toBe(false);
  });

  it("rejects a missing required trophy field", async () => {
    const data = await readFixture("./fixtures/user-trophies-ps4.json");
    delete data.trophies[0].trophyHidden;
    expect(validateUserTrophies(data)).toBe(false);
  });

  it("allows new response fields without coercing existing values", async () => {
    const data = await readFixture("./fixtures/user-trophies-ps5.json");
    data.futureField = { enabled: true };
    data.trophies[0].futureField = "new";
    const original = structuredClone(data);

    expect(validateUserTrophies(data)).toBe(true);
    expect(data).toEqual(original);
  });

  it("allows an empty terminal page without optional pagination fields", () => {
    const validate = ajv.compile({
      $ref: "psn#/components/schemas/UserTitlesResponse"
    });
    expect(validate({ trophyTitles: [], totalItemCount: 0 })).toBe(true);
  });
});
