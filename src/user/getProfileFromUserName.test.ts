import nock from "nock";

import type {
  AuthorizationPayload,
  ProfileFromUserNameResponse
} from "../models";
import { getProfileFromUserName } from "./getProfileFromUserName";

describe("Function: getProfileFromUserName", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getProfileFromUserName).toBeDefined();
  });

  it("retrieves the profile for a given username", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: ProfileFromUserNameResponse = {
      profile: {
        onlineId: "xelnia",
        accountId: "asdf",
        npId: "asdf",
        avatarUrls: [],
        plus: 1,
        aboutMe: "",
        languagesUsed: ["en"],
        trophySummary: {
          level: 421,
          progress: 53,
          earnedTrophies: { bronze: 1, silver: 2, gold: 3, platinum: 4 }
        },
        isOfficiallyVerified: false,
        personalDetail: {
          firstName: "asdf",
          lastName: "asdf",
          profilePictureUrls: []
        },
        personalDetailSharing: "shared",
        personalDetailSharingRequestMessageFlag: false,
        primaryOnlineStatus: "offline",
        presences: [],
        friendRelation: "friend",
        requestMessageFlag: false,
        blocking: false,
        following: true,
        consoleAvailability: { availabilityStatus: "offline" }
      }
    };

    nock("https://us-prof.np.community.playstation.net")
      .get("/userProfile/v1/users/xelnia/profile2")
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getProfileFromUserName(mockAuthorization, "xelnia");

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

    nock("https://us-prof.np.community.playstation.net")
      .get("/userProfile/v1/users/xeln12ia/profile2")
      .query(true)
      .reply(200, mockResponse);

    // ASSERT
    await expect(
      getProfileFromUserName(mockAuthorization, "xeln12ia")
    ).rejects.toThrow();
  });
});
