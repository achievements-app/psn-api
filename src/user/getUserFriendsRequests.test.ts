import nock from "nock";

import type {
  AuthorizationPayload,
  GetUserFriendsRequestsResponse
} from "../models";
import { getUserFriendsRequests } from "./getUserFriendsRequests";
import { USER_BASE_URL } from "./USER_BASE_URL";

describe("Function: getUserFriendsRequests", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserFriendsRequests).toBeDefined();
  });

  it("retrieves the received friend requests for the authenticated user", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: GetUserFriendsRequestsResponse = {
      receivedRequests: ["2984038888603282554", "8403439712302084350"],
      totalItemCount: 2
    };

    const baseUrlObj = new URL(USER_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/me/friends/receivedRequests`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getUserFriendsRequests(mockAuthorization);

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
      .get("/api/userProfile/v1/internal/users/me/friends/receivedRequests")
      .query(true)
      .reply(200, mockResponse);

    // ASSERT
    await expect(
      getUserFriendsRequests(mockAuthorization)
    ).rejects.toThrow();
  });
});
