import nock from "nock";

import type { AuthorizationPayload, BasicPresenceResponse } from "../models";
import { getBasicPresence } from "./getBasicPresence";
import { USER_BASE_URL } from "./USER_BASE_URL";

describe("Function: getBasicPresence", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getBasicPresence).toBeDefined();
  });

  it("retrieves the basic presence for a given account id", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: BasicPresenceResponse = {
      basicPresence: {
        availability: "availableToPlay",

        primaryPlatformInfo: {
          onlineStatus: "online",
          platform: "PS5",
          lastOnlineDate: "2023-06-03T21:25:28.987Z"
        },
        gameTitleInfoList: [
          {
            npTitleId: "PPSA01521_00",
            titleName: "Horizon Forbidden West",
            format: "PS5",
            launchPlatform: "PS5",
            conceptIconUrl:
              "https://image.api.playstation.com/vulcan/ap/rnd/202010/2915/kifM3lnke5lExwRd96mIDojQ.png"
          }
        ]
      }
    };

    const baseUrlObj = new URL(USER_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/111222333444/basicPresences`)
      .query({ type: "primary" })
      .reply(200, mockResponse);

    // ACT
    const response = await getBasicPresence(mockAuthorization, "111222333444");

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
      .get(`${basePath}/111222333444/basicPresences`)
      .query({ type: "primary" })
      .reply(200, mockResponse);

    // ASSERT
    await expect(
      getBasicPresence(mockAuthorization, "111222333444")
    ).rejects.toThrow();
  });
});
