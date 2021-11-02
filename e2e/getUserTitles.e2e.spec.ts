import { getUserTitles } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: getUserTitles", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can load a list of games played by the user", async () => {
    // ACT
    const response = await getUserTitles(authorization, "962157895908076652");

    // ASSERT
    const firstTitle = response.trophyTitles[0];

    expect(firstTitle.npServiceName).toContain("trophy");
    expect(firstTitle.npCommunicationId).toBeDefined();
    expect(firstTitle.trophyTitleName).toBeDefined();
    expect(firstTitle.trophyTitlePlatform).toContain("PS");
  });
});
