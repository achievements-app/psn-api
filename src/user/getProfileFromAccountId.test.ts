import nock from "nock";

import type {
  AuthorizationPayload,
  ProfileFromAccountIdResponse
} from "../models";
import { getProfileFromAccountId } from "./getProfileFromAccountId";
import { USER_BASE_URL } from "./USER_BASE_URL";

describe("Function: getProfileFromAccountId", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getProfileFromAccountId).toBeDefined();
  });

  it("retrieves the profile for a given account id", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: ProfileFromAccountIdResponse = {
      onlineId: "xelnia",
      isPlus: true,
      aboutMe: "",
      languages: ["en"],
      isOfficiallyVerified: false,
      isMe: false,
      avatars: [
        {
          size: "s",
          url: "asdf"
        }
      ]
    };

    const baseUrlObj = new URL(USER_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/111222333444/profiles`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getProfileFromAccountId(
      mockAuthorization,
      "111222333444"
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("throws an error if we receive a response containing an `error` object", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse = {
      error: { code: 2_105_356, message: "User not found (user: 'xeln12ia')" }
    };

    const baseUrlObj = new URL(USER_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/111222333444/profiles`)
      .query(true)
      .reply(200, mockResponse);

    // ASSERT
    await expect(
      getProfileFromAccountId(mockAuthorization, "111222333444")
    ).rejects.toThrow();
  });
});
