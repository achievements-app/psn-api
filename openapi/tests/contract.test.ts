import { readFile, readdir } from "node:fs/promises";

import { parse } from "yaml";

type Reference = { $ref: string };

const root = new URL("../", import.meta.url);
const contract = parse(
  await readFile(new URL("psn.openapi.yaml", root), "utf8")
) as {
  components: { examples: Record<string, Reference> };
  paths: Record<
    string,
    {
      get: {
        parameters: Array<{
          $ref?: string;
          name?: string;
          schema?: { type?: string; maximum?: number };
        }>;
        responses: {
          "200": {
            content: {
              "application/json": { examples: Record<string, Reference> };
            };
          };
        };
      };
    }
  >;
};

describe("OpenAPI contract", () => {
  it("references every fixture from an operation so Redocly validates it", async () => {
    const fixtures = Object.values(contract.paths).flatMap(({ get }) => {
      const response = get.responses["200"].content["application/json"];
      return Object.values(response.examples).map(({ $ref }) => {
        const name = $ref.replace("#/components/examples/", "");
        return contract.components.examples[name].$ref.replace(
          "./fixtures/",
          ""
        );
      });
    });
    const files = await readdir(new URL("fixtures/", root));

    expect(fixtures.sort()).toEqual(
      files.filter((file) => file.endsWith(".json")).sort()
    );
  });

  it("caps getUserTitles at 800 titles per page", () => {
    const parameters =
      contract.paths["/v1/users/{accountId}/trophyTitles"].get.parameters;
    const limit = parameters.find((parameter) => parameter.name === "limit");
    expect(limit?.schema).toEqual({ type: "integer", maximum: 800 });

    for (const path of [
      "/v1/npCommunicationIds/{npCommunicationId}/trophyGroups/{trophyGroupId}/trophies",
      "/v1/users/{accountId}/npCommunicationIds/{npCommunicationId}/trophyGroups/{trophyGroupId}/trophies"
    ]) {
      expect(contract.paths[path].get.parameters).toContainEqual({
        $ref: "#/components/parameters/Limit"
      });
    }
  });
});
