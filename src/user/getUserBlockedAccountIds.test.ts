import nock from "nock";

import type {
  AuthorizationPayload,
  GetUserBlockedAccountIdsResponse
} from "../models";
import { getUserBlockedAccountIds } from "./getUserBlockedAccountIds";
import { USER_BASE_URL } from "./USER_BASE_URL";

describe("Function: getUserBlockedAccountIds", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserBlockedAccountIds).toBeDefined();
  });

  it("retrieves the blocked account IDs for the authenticated user", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: GetUserBlockedAccountIdsResponse = {
      blockList: ["750503368741351124", "2984038888603282554"],
      nextOffset: 2,
      previousOffset: 0
    };

    const baseUrlObj = new URL(USER_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/me/blocks`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getUserBlockedAccountIds(mockAuthorization);

    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("throws an error if we receive a response containing an `error` object", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse = {
      error: {
        referenceId: "d71bd8ff-5f63-11ec-87da-d5dfd3bc6e67",
        code: 2_281_604,
        message: "Not Found"
      }
    };

    nock("https://m.np.playstation.com")
      .get("/api/userProfile/v1/internal/users/me/blocks")
      .query(true)
      .reply(200, mockResponse);

    // ASSERT
    await expect(getUserBlockedAccountIds(mockAuthorization)).rejects.toThrow();
  });
});