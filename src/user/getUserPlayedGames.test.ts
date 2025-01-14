import { rest } from "msw";
import { setupServer } from "msw/node";

import type { AuthorizationPayload } from "../models";
import { UserPlayedGamesResponse } from "../models/user-played-games-response.model";
import { getUserPlayedGames } from "./getUserPlayedGames";
import { USER_GAMES_BASE_URL } from "./USER_BASE_URL";

const server = setupServer();

describe("Function: getUserPlayedGames", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    expect(getUserPlayedGames).toBeDefined();
  });

  it("retrieves the list of games for a given account id", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: UserPlayedGamesResponse = {
      titles: [
        {
          titleId: "PPSA22040_00",
          name: "Path of Exile 2",
          localizedName: "Path of Exile 2"
        }
      ] as UserPlayedGamesResponse["titles"],
      totalItemCount: 1,
      nextOffset: 1,
      previousOffset: 0
    };

    server.use(
      rest.get(`${USER_GAMES_BASE_URL}/me/titles`, (_, res, ctx) => {
        return res(ctx.json(mockResponse));
      })
    );

    // ACT
    const response = await getUserPlayedGames(mockAuthorization, "me");

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
