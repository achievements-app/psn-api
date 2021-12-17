import { getProfileFromUserName } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: getProfileFromUserName", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can load a profile from a username", async () => {
    // ACT
    const response = await getProfileFromUserName(authorization, "xelnia");

    // ASSERT
    const profile = response.profile;

    expect(profile).toBeDefined();
    expect(profile.onlineId).toEqual("xelnia");
    expect(profile.accountId).toEqual("962157895908076652");
  });
});
