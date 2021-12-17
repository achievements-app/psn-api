import { getUserFriendsAccountIds } from "../src";
import { getWorkingAccessToken } from "./utils/getWorkingAccessToken";

describe("E2E Health Check: getUserFriendsAccountIds", () => {
  let authorization = { accessToken: "" };

  beforeAll(async () => {
    authorization = await getWorkingAccessToken();
  });

  it("can load a list of accountId values associated with a target user's friends list", async () => {
    // ACT
    const response = await getUserFriendsAccountIds(
      authorization,
      "2545901274862028456" // NeutraLiTe
    );

    // ASSERT
    expect(response.friends.length).toBeGreaterThan(1);
    expect(response.totalItemCount).toBeGreaterThan(5);
  });
});
