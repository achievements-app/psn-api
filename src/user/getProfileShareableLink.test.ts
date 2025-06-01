import nock from "nock";

import type {
  AuthorizationPayload,
  ShareableProfileLinkResponse
} from "../models";
import { getProfileShareableLink } from "./getProfileShareableLink";
import { USER_CPSS_BASE_URL } from "./USER_BASE_URL";

describe("Function: getProfileShareableLink", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getProfileShareableLink).toBeDefined();
  });

  it("retrieves a shareable profile link for a given account ID", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockAccountId = "2984038888603282554";

    const mockResponse: ShareableProfileLinkResponse = {
      shareUrl: "https://www.playstation.com/acct/profile/2984038888603282554",
      shareImageUrl:
        "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/mockProfileShareImage.png",
      shareImageUrlDestination:
        "https://www.playstation.com/acct/profile/2984038888603282554"
    };

    const baseUrlObj = new URL(USER_CPSS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/share/profile/${mockAccountId}`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getProfileShareableLink(
      mockAuthorization,
      mockAccountId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("throws an error if we receive a response containing an `error` object", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockAccountId = "invalidAccountId123";

    const mockResponse = {
      error: {
        referenceId: "d71bd8ff-5f63-11ec-87da-d5dfd3bc6e67",
        code: 2_105_356,
        message: "User not found"
      }
    };

    const baseUrlObj = new URL(USER_CPSS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/share/profile/${mockAccountId}`)
      .query(true)
      .reply(200, mockResponse);

    // ASSERT
    await expect(
      getProfileShareableLink(mockAuthorization, mockAccountId)
    ).rejects.toThrow("User not found");
  });

  it("throws an error with default message if error object has no message", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockAccountId = "someAccountId";

    const mockResponse = {
      error: {
        referenceId: "d71bd8ff-5f63-11ec-87da-d5dfd3bc6e67",
        code: 500
      }
    };

    const baseUrlObj = new URL(USER_CPSS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/share/profile/${mockAccountId}`)
      .query(true)
      .reply(200, mockResponse);

    // ASSERT
    await expect(
      getProfileShareableLink(mockAuthorization, mockAccountId)
    ).rejects.toThrow("Unexpected Error");
  });
});
