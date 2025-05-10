import nock from "nock";

import type {
  AuthorizationPayload,
  UserTrophyGroupEarningsForTitleResponse
} from "../../models";
import { generateTrophyCounts } from "../../test/generators";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getUserTrophyGroupEarningsForTitle } from "./getUserTrophyGroupEarningsForTitle";

describe("Function: getUserTrophyGroupEarningsForTitle", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserTrophyGroupEarningsForTitle).toBeDefined();
  });

  it("retrieves a summarized count of trophy earnings for a given user", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockAccountId = "mockAccountId";
    const mockNpCommunicationId = "mockNpCommunicationId";

    const mockResponse: UserTrophyGroupEarningsForTitleResponse = {
      trophySetVersion: "1.00",
      hiddenFlag: false,
      progress: 80,
      earnedTrophies: generateTrophyCounts(),
      trophyGroups: [],
      lastUpdatedDateTime: "mockLastUpdatedDateTime"
    };

    const baseUrlObj = new URL(TROPHY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(
        `${basePath}/v1/users/${mockAccountId}/npCommunicationIds/${mockNpCommunicationId}/trophyGroups`
      )
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getUserTrophyGroupEarningsForTitle(
      mockAuthorization,
      mockAccountId,
      mockNpCommunicationId
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
        `${basePath}/v1/users/${mockAccountId}/npCommunicationIds/${mockNpCommunicationId}/trophyGroups`
      )
      .query(true)
      .reply(200, mockResponse);

    // ASSERT
    await expect(
      getUserTrophyGroupEarningsForTitle(
        mockAuthorization,
        mockAccountId,
        mockNpCommunicationId
      )
    ).rejects.toThrow();
  });
});
