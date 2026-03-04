import nock from "nock";

import type {
  AuthorizationPayload,
  ProfileFromUserNameResponse
} from "../models";
import { getUserRegion } from "./getUserRegion";
import { USER_LEGACY_BASE_URL } from "./USER_BASE_URL";

describe("Function: getUserRegion", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserRegion).toBeDefined();
  });

  it("returns the region for a given username", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: ProfileFromUserNameResponse = {
      profile: {
        onlineId: "xelnia",
        accountId: "asdf",
        npId: "eGVsbmlhQGM2LnVz", // This decodes to xelnia@c6.us
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
    }; // Extract the base URL and path from USER_LEGACY_BASE_URL
    const baseUrlObj = new URL(USER_LEGACY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/xelnia/profile2`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const region = await getUserRegion(mockAuthorization, "xelnia");

    // ASSERT
    expect(region?.code).toEqual("US");
  });

  it("throws an error if there's a problem with the request", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse = {
      error: { code: 2_105_356, message: "User not found (user: 'xeln12ia')" }
    }; // Extract the base URL and path from USER_LEGACY_BASE_URL
    const baseUrlObj = new URL(USER_LEGACY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/xeln12ia/profile2`)
      .query(true)
      .reply(200, mockResponse);

    // ASSERT
    await expect(
      getUserRegion(mockAuthorization, "xeln12ia")
    ).rejects.toThrow();
  });

  it("returns null when the profile has no npId", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: ProfileFromUserNameResponse = {
      profile: {
        onlineId: "xelnia",
        accountId: "asdf",
        npId: "",
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

    const baseUrlObj = new URL(USER_LEGACY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/testuser/profile2`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const region = await getUserRegion(mockAuthorization, "testuser");

    // ASSERT
    expect(region).toBeNull();
  });

  it("returns null when the region cannot be extracted from npId", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    // This decodes to "invalid-format" which has no @ or . separator.
    const invalidNpId = btoa("invalid-format");

    const mockResponse: ProfileFromUserNameResponse = {
      profile: {
        onlineId: "xelnia",
        accountId: "asdf",
        npId: invalidNpId,
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

    const baseUrlObj = new URL(USER_LEGACY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/testuser2/profile2`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const region = await getUserRegion(mockAuthorization, "testuser2");

    // ASSERT
    expect(region).toBeNull();
  });

  it("returns the code with 'Unknown' name when Intl.DisplayNames fails", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: ProfileFromUserNameResponse = {
      profile: {
        onlineId: "xelnia",
        accountId: "asdf",
        npId: "eGVsbmlhQGM2LnVz", // Decodes to xelnia@c6.us
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

    const baseUrlObj = new URL(USER_LEGACY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/xelnia/profile2`)
      .query(true)
      .reply(200, mockResponse);

    // Force Intl.DisplayNames to throw.
    const OriginalDisplayNames = Intl.DisplayNames;
    // @ts-expect-error -- Intentionally overriding a readonly property to test the catch path.
    Intl.DisplayNames = class {
      constructor() {
        throw new Error("Intl not supported");
      }
    } as any;

    try {
      // ACT
      const region = await getUserRegion(mockAuthorization, "xelnia");

      // ASSERT
      expect(region).toEqual({ code: "US", name: "Unknown" });
    } finally {
      // @ts-expect-error -- Restoring the original value.
      Intl.DisplayNames = OriginalDisplayNames;
    }
  });
});
