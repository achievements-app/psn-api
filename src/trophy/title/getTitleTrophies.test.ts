import { rest } from "msw";
import { setupServer } from "msw/node";

import type { AuthorizationPayload, TitleTrophiesResponse } from "../../models";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getTitleTrophies } from "./getTitleTrophies";

const server = setupServer();

describe("Function: getTitleTrophies", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getTitleTrophies).toBeDefined();
  });

  it("retrieves trophies for a given title", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockNpCommunicationId = "mockNpCommunicationId";
    const mockTrophyGroupId = "mockTrophyGroupId";

    const mockResponse: TitleTrophiesResponse = {
      trophySetVersion: "1.00",
      hasTrophyGroups: false,
      trophies: [],
      totalItemCount: 0
    };

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/npCommunicationIds/${mockNpCommunicationId}/trophyGroups/${mockTrophyGroupId}/trophies`,
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getTitleTrophies(
      mockAuthorization,
      mockNpCommunicationId,
      mockTrophyGroupId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
