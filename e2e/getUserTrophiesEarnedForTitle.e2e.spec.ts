import { getUserTrophiesEarnedForTitle } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: getUserTrophiesEarnedForTitle", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can get the trophies a user has earned for a PS3 title", async () => {
    // ACT
    const response = await getUserTrophiesEarnedForTitle(
      authorization,
      "2545901274862028456", // NeutraLiTe
      "NPWR00867_00", // Red Dead Redemption
      "all",
      { npServiceName: "trophy" }
    );

    // ASSERT
    expect(response.totalItemCount).toEqual(91);
    expect(response.rarestTrophies?.[0]?.trophyType).toBeDefined();

    const firstTrophy = response.trophies[0];
    expect(firstTrophy.trophyId).toEqual(0);
    expect(firstTrophy.trophyType).toEqual("platinum");
    expect(firstTrophy.earned).toEqual(true);
    expect(firstTrophy.earnedDateTime).toEqual("2021-08-14T19:58:35Z");
  });

  it("can get the trophies a user has earned for a PS5 title", async () => {
    // ACT
    const response = await getUserTrophiesEarnedForTitle(
      authorization,
      "2545901274862028456", // NeutraLiTe
      "NPWR20188_00", // Astro's Playroom
      "all"
    );

    // ASSERT
    expect(response.totalItemCount).toEqual(46);
    expect(response.rarestTrophies?.[0]?.trophyType).toBeDefined();

    const firstTrophy = response.trophies[0];
    expect(firstTrophy.trophyId).toEqual(0);
    expect(firstTrophy.trophyType).toEqual("platinum");
    expect(firstTrophy.earned).toEqual(true);
    expect(firstTrophy.earnedDateTime).toEqual("2021-08-15T21:08:48Z");
  });
});
