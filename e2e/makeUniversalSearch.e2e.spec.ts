import { makeUniversalSearch } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: makeUniversalSearch", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can search for users", async () => {
    // ACT
    const response = await makeUniversalSearch(
      authorization,
      "xelnia",
      "SocialAllAccounts"
    );

    // ASSERT
    const firstResult = response.domainResponses[0].results[0];

    expect(firstResult.socialMetadata.accountId).toEqual("962157895908076652");
    expect(firstResult.socialMetadata.onlineId).toEqual("xelnia");
  });
});
