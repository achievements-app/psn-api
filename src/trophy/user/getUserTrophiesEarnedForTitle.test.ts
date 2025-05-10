import nock from "nock";

import type {
  AuthorizationPayload,
  UserTrophiesEarnedForTitleResponse
} from "../../models";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getUserTrophiesEarnedForTitle } from "./getUserTrophiesEarnedForTitle";

describe("Function: getUserTrophiesEarnedForTitle", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserTrophiesEarnedForTitle).toBeDefined();
  });

  it("retrieves trophies earned by a given user for a given title", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockAccountId = "mockAccountId";
    const mockNpCommunicationId = "mockNpCommunicationId";
    const mockTrophyGroupId = "mockTrophyGroupId";

    const mockResponse: UserTrophiesEarnedForTitleResponse = {
      trophySetVersion: "1.00",
      hasTrophyGroups: false,
      lastUpdatedDateTime: "mockLastUpdatedDateTime",
      trophies: [],
      totalItemCount: 0
    };

    const baseUrlObj = new URL(TROPHY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(
        `${basePath}/v1/users/${mockAccountId}/npCommunicationIds/${mockNpCommunicationId}/trophyGroups/${mockTrophyGroupId}/trophies`
      )
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getUserTrophiesEarnedForTitle(
      mockAuthorization,
      mockAccountId,
      mockNpCommunicationId,
      mockTrophyGroupId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("throws an error if we receive a response containing an `error` object", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockAccountId = "mockAccountId";
    const mockNpCommunicationId = "mockNpCommunicationId";
    const mockTrophyGroupId = "mockTrophyGroupId";

    const mockResponse = {
      error: {
        referenceId: "mockReferenceId",
        code: "mockCode",
        message: "Resource not found"
      }
    };

    const baseUrlObj = new URL(TROPHY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(
        `${basePath}/v1/users/${mockAccountId}/npCommunicationIds/${mockNpCommunicationId}/trophyGroups/${mockTrophyGroupId}/trophies`
      )
      .query(true)
      .reply(200, mockResponse);

    // ASSERT
    await expect(
      getUserTrophiesEarnedForTitle(
        mockAuthorization,
        mockAccountId,
        mockNpCommunicationId,
        mockTrophyGroupId
      )
    ).rejects.toThrow();
  });
});
