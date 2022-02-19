import { getProfileFromAccountId } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: getProfileFromAccountId", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can load a profile from a username", async () => {
    // ACT
    const response = await getProfileFromAccountId(
      authorization,
      "962157895908076652"
    );

    // ASSERT
    const profile = response;

    expect(profile).toBeDefined();
    expect(profile.onlineId).toEqual("xelnia");
  });
});
