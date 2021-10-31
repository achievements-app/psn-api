import { getTitleTrophies } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: getTitleTrophies", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can load the trophy list for a PS3 title", async () => {
    // ACT
    const response = await getTitleTrophies(
      authorization,
      "NPWR00867_00", // Red Dead Redemption
      "all",
      { npServiceName: "trophy" }
    );

    // ASSERT
    expect(response.trophies).toBeDefined();
    expect(response.trophies).not.toEqual(0);

    const firstTrophy = response.trophies[0];
    expect(firstTrophy.trophyId).toEqual(0);
    expect(firstTrophy.trophyType).toEqual("platinum");
    expect(firstTrophy.trophyName).toEqual("Legend of the West");
    expect(firstTrophy.trophyGroupId).toEqual("default");
  });

  it("can load the trophy list for a PS4 title", async () => {
    // ACT
    const response = await getTitleTrophies(
      authorization,
      "NPWR08719_00", // Dark Cloud 2
      "all",
      { npServiceName: "trophy" }
    );

    // ASSERT
    expect(response.trophies).toBeDefined();
    expect(response.trophies).not.toEqual(0);

    const firstTrophy = response.trophies[0];
    expect(firstTrophy.trophyId).toEqual(0);
    expect(firstTrophy.trophyType).toEqual("platinum");
    expect(firstTrophy.trophyName).toEqual("Past, Present, and Future");
    expect(firstTrophy.trophyGroupId).toEqual("default");
  });

  it("can load the trophy list for a PS5 title", async () => {
    // ACT
    const response = await getTitleTrophies(
      authorization,
      "NPWR21341_00", // Final Fantasy VII Remake
      "all"
    );

    // ASSERT
    expect(response.trophies).toBeDefined();
    expect(response.trophies).not.toEqual(0);

    const firstTrophy = response.trophies[0];
    expect(firstTrophy.trophyId).toEqual(0);
    expect(firstTrophy.trophyType).toEqual("platinum");
    expect(firstTrophy.trophyName).toEqual("Master of Fate");
    expect(firstTrophy.trophyGroupId).toEqual("default");
  });
});
