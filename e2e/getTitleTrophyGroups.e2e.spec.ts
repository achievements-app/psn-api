import { getTitleTrophyGroups } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: getTitleTrophyGroups", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can load the summary of trophy groups for a PS3 title", async () => {
    // ACT
    const response = await getTitleTrophyGroups(
      authorization,
      "NPWR00867_00", // Red Dead Redemption
      { npServiceName: "trophy" }
    );

    // ASSERT
    expect(response.trophyTitleName).toEqual("Red Dead Redemption");
    expect(response.trophyTitlePlatform).toEqual("PS3");
    expect(response.definedTrophies).toEqual({
      bronze: 71,
      silver: 17,
      gold: 2,
      platinum: 1
    });

    expect(response.trophyGroups.length).toBeGreaterThanOrEqual(5);

    const undeadNightmareDlc = response.trophyGroups[4];
    expect(undeadNightmareDlc.trophyGroupName).toEqual("Undead Nightmare Pack");
    expect(undeadNightmareDlc.definedTrophies).toEqual({
      bronze: 11,
      silver: 1,
      gold: 0,
      platinum: 0
    });
  });

  it("can load the trophy groups for a PS5 title", async () => {
    // ACT
    const response = await getTitleTrophyGroups(
      authorization,
      "NPWR20188_00" // Astro's Playroom
    );

    // ASSERT
    expect(response.trophyTitleName).toEqual("ASTRO’s PLAYROOM");
    expect(response.trophyTitlePlatform).toEqual("PS5");
    expect(response.definedTrophies).toEqual({
      bronze: 27,
      silver: 13,
      gold: 5,
      platinum: 1
    });

    expect(response.trophyGroups.length).toBeGreaterThanOrEqual(2);

    const addOnDlc = response.trophyGroups[1];
    expect(addOnDlc.trophyGroupName).toEqual("ASTRO’s PLAYROOM [ADD-ON]");
    expect(addOnDlc.definedTrophies).toEqual({
      bronze: 1,
      silver: 0,
      gold: 2,
      platinum: 0
    });
  });
});
