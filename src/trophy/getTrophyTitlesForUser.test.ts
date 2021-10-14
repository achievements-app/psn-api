import { rest } from "msw";
import { setupServer } from "msw/node";

import type { AuthorizationPayload, UserTrophyTitlesResponse } from "../models";
import { generateTrophyTitle } from "../test/generators";
import { getTrophyTitlesForUser } from "./getTrophyTitlesForUser";
import { TROPHY_BASE_URL } from "./TROPHY_BASE_URL";

const server = setupServer();

describe("Function: getTrophyTitlesForUser", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getTrophyTitlesForUser).toBeDefined();
  });

  it("makes a call to get the list of trophy titles for a given user", async () => {
    // ARRANGE
    const mockAccountId = "mockAccountId";

    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: UserTrophyTitlesResponse = {
      trophyTitles: [generateTrophyTitle()],
      totalItemCount: 1
    };

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/users/${mockAccountId}/trophyTitles`,
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getTrophyTitlesForUser(
      mockAuthorization,
      mockAccountId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
