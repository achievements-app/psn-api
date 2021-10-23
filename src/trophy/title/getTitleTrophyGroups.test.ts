import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  TitleTrophyGroupsResponse
} from "../../models";
import { generateTrophyCounts } from "../../test/generators";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getTitleTrophyGroups } from "./getTitleTrophyGroups";

const server = setupServer();

describe("Function: getTitleTrophyGroups", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getTitleTrophyGroups).toBeDefined();
  });

  it("retrieves trophy groups metadata for a given title", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockNpCommunicationId = "mockNpCommunicationId";

    const mockResponse: TitleTrophyGroupsResponse = {
      trophySetVersion: "1.00",
      trophyTitleName: "mockTrophyTitleName",
      trophyTitleIconUrl: "mockTrophyTitleIconUrl",
      trophyTitlePlatform: "PS3",
      definedTrophies: generateTrophyCounts(),
      trophyGroups: []
    };

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/npCommunicationIds/${mockNpCommunicationId}/trophyGroups`,
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getTitleTrophyGroups(
      mockAuthorization,
      mockNpCommunicationId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
