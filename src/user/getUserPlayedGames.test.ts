import nock from "nock";

import type { AuthorizationPayload } from "../models";
import { UserPlayedGamesResponse } from "../models/user-played-games-response.model";
import { getUserPlayedGames } from "./getUserPlayedGames";
import { USER_GAMES_BASE_URL } from "./USER_BASE_URL";

describe("Function: getUserPlayedGames", () => {
  afterEach(() => {
    nock.cleanAll();
  });

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

    // ... extract the base URL and path from USER_GAMES_BASE_URL ...
    const baseUrlObj = new URL(USER_GAMES_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/me/titles`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getUserPlayedGames(mockAuthorization, "me");

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
