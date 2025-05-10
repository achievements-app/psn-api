import nock from "nock";

import type {
  AuthorizationPayload,
  UserTrophyProfileSummaryResponse
} from "../../models";
import { generateTrophyCounts } from "../../test/generators";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getUserTrophyProfileSummary } from "./getUserTrophyProfileSummary";

describe("Function: getUserTrophyProfileSummary", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserTrophyProfileSummary).toBeDefined();
  });

  it("makes a call to retrieve a given user's trophy collection summary", async () => {
    // ARRANGE
    const mockAccountId = "mockAccountId";

    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: UserTrophyProfileSummaryResponse = {
      accountId: mockAccountId,
      trophyLevel: "403",
      progress: 80,
      tier: 5,
      earnedTrophies: generateTrophyCounts()
    };

    const baseUrlObj = new URL(TROPHY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/users/${mockAccountId}/trophySummary`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getUserTrophyProfileSummary(
      mockAuthorization,
      mockAccountId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
