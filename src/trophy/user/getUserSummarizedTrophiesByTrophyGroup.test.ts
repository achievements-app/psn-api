import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  UserSummarizedTrophiesByTrophyGroupResponse
} from "../../models";
import { generateTrophyCounts } from "../../test/generators";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getUserSummarizedTrophiesByTrophyGroup } from "./getUserSummarizedTrophiesByTrophyGroup";

const server = setupServer();

describe("Function: getUserSummarizedTrophiesByTrophyGroup", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserSummarizedTrophiesByTrophyGroup).toBeDefined();
  });

  it("retrieves a summarized count of trophy earnings for a given user", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockAccountId = "mockAccountId";
    const mockNpCommunicationId = "mockNpCommunicationId";

    const mockResponse: UserSummarizedTrophiesByTrophyGroupResponse = {
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
    const response = await getUserSummarizedTrophiesByTrophyGroup(
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

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/users/${mockAccountId}/npCommunicationIds/${mockNpCommunicationId}/trophyGroups`,
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ASSERT
    await expect(
      getUserSummarizedTrophiesByTrophyGroup(
        mockAuthorization,
        mockAccountId,
        mockNpCommunicationId
      )
    ).rejects.toThrow();
  });
});
