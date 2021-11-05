import { getUserTrophyGroupEarningsForTitle } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: getUserTrophyGroupEarningsForTitle", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can get a user's trophy group earnings for a PS3 title", async () => {
    // ACT
    const response = await getUserTrophyGroupEarningsForTitle(
      authorization,
      "2545901274862028456", // NeutraLiTe
      "NPWR00867_00", // Red Dead Redemption
      { npServiceName: "trophy" }
    );

    // ASSERT
    expect(response.earnedTrophies.bronze).toBeDefined();
    expect(response.earnedTrophies.silver).toBeDefined();
    expect(response.earnedTrophies.gold).toBeDefined();
    expect(response.earnedTrophies.platinum).toBeDefined();

    expect(response.trophyGroups.length).toEqual(5);

    const firstTrophyGroup = response.trophyGroups[0];
    expect(firstTrophyGroup.trophyGroupId).toEqual("default");
  });

  it("can get a user's trophy group earnings for a PS5 title", async () => {
    // ACT
    const response = await getUserTrophyGroupEarningsForTitle(
      authorization,
      "2545901274862028456", // NeutraLiTe
      "NPWR20188_00" // Astro's Playroom
    );

    // ASSERT
    expect(response.earnedTrophies.bronze).toBeDefined();
    expect(response.earnedTrophies.silver).toBeDefined();
    expect(response.earnedTrophies.gold).toBeDefined();
    expect(response.earnedTrophies.platinum).toBeDefined();

    expect(response.trophyGroups.length).toEqual(2);

    const firstTrophyGroup = response.trophyGroups[0];
    expect(firstTrophyGroup.trophyGroupId).toEqual("default");
  });
});
