import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  TrophiesEarnedForTitleResponse
} from "@/models";

import { getTrophiesEarnedForTitle } from "./getTrophiesEarnedForTitle";
import { TROPHY_BASE_URL } from "./TROPHY_BASE_URL";

const server = setupServer();

describe("Function: getTrophiesEarnedForTitle", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getTrophiesEarnedForTitle).toBeDefined();
  });

  it("retrieves trophies earned by a given user for a given title", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockAccountId = "mockAccountId";
    const mockNpCommunicationId = "mockNpCommunicationId";
    const mockTrophyGroupId = "mockTrophyGroupId";

    const mockResponse: TrophiesEarnedForTitleResponse = {
      trophySetVersion: "1.00",
      hasTrophyGroups: false,
      lastUpdatedDateTime: "mockLastUpdatedDateTime",
      trophies: [],
      totalItemCount: 0
    };

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/users/${mockAccountId}/npCommunicationIds/${mockNpCommunicationId}/trophyGroups/${mockTrophyGroupId}/trophies`,
        (req, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getTrophiesEarnedForTitle(
      mockAuthorization,
      mockAccountId,
      mockNpCommunicationId,
      mockTrophyGroupId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
