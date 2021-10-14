import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  SummarizedTrophiesByTrophyGroupResponse
} from "../models";
import { generateTrophyCounts } from "../test/generators";
import { getSummarizedTrophiesByTrophyGroup } from "./getSummarizedTrophiesByTrophyGroup";
import { TROPHY_BASE_URL } from "./TROPHY_BASE_URL";

const server = setupServer();

describe("Function: getSummarizedTrophiesByTrophyGroup", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getSummarizedTrophiesByTrophyGroup).toBeDefined();
  });

  it("retrieves a summarized count of trophy earnings for a given user", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockAccountId = "mockAccountId";
    const mockNpCommunicationId = "mockNpCommunicationId";

    const mockResponse: SummarizedTrophiesByTrophyGroupResponse = {
      trophySetVersion: "1.00",
      hiddenFlag: false,
      progress: 80,
      earnedTrophies: generateTrophyCounts(),
      trophyGroups: [],
      lastUpdatedDateTime: "mockLastUpdatedDateTime"
    };

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/users/${mockAccountId}/npCommunicationIds/${mockNpCommunicationId}/trophyGroups`,
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getSummarizedTrophiesByTrophyGroup(
      mockAuthorization,
      mockAccountId,
      mockNpCommunicationId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
