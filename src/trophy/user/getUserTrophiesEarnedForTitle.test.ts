import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  UserTrophiesEarnedForTitleResponse
} from "../../models";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getUserTrophiesEarnedForTitle } from "./getUserTrophiesEarnedForTitle";

const server = setupServer();

describe("Function: getUserTrophiesEarnedForTitle", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/users/${mockAccountId}/npCommunicationIds/${mockNpCommunicationId}/trophyGroups/${mockTrophyGroupId}/trophies`,
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

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

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/users/${mockAccountId}/npCommunicationIds/${mockNpCommunicationId}/trophyGroups/${mockTrophyGroupId}/trophies`,
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

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
