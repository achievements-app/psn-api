import { getUserTrophyProfileSummary } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: getUserTrophyProfileSummary", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can get a user's trophy profile summary", async () => {
    // ACT
    const response = await getUserTrophyProfileSummary(
      authorization,
      "2545901274862028456" // NeutraLiTe
    );

    // ASSERT
    console.log(response);
    expect(response.accountId).toEqual("2545901274862028456");
    expect(response.trophyLevel).toBeGreaterThan(200);
    expect(response.tier).toBeGreaterThanOrEqual(3);

    expect(response.earnedTrophies.bronze).toBeDefined();
    expect(response.earnedTrophies.silver).toBeDefined();
    expect(response.earnedTrophies.gold).toBeDefined();
    expect(response.earnedTrophies.platinum).toBeDefined();
  });
});
