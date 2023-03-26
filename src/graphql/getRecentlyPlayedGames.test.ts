import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  RecentlyPlayedGamesResponse
} from "../models";
import { getRecentlyPlayedGames } from "./getRecentlyPlayedGames";
import { GRAPHQL_BASE_URL } from "./GRAPHQL_BASE_URL";

const server = setupServer();
const accessToken = "mockAccessToken";

describe("Function: getRecentlyPlayedGames", () => {
  // MSW Setup
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "error"
    })
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getRecentlyPlayedGames).toBeDefined();
  });

  it("retrieves games the user has played recently", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken
    };

    const mockResponse: RecentlyPlayedGamesResponse = {
      data: {
        gameLibraryTitlesRetrieve: {
          __typename: "GameList",
          games: [
            {
              __typename: "GameLibraryTitle",
              conceptId: "203715",
              entitlementId: "EP2002-CUSA01433_00-ROCKETLEAGUEEU01",
              image: {
                __typename: "Media",
                url: "https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA01433_00/7/i_5c5e430a49994f22df5fd81f446ead7b6ae45027af490b415fe4e744a9918e4c/i/icon0.png"
              },
              isActive: true,
              lastPlayedDateTime: "2023-03-10T01:01:01.390000Z",
              name: "Rocket League®",
              platform: "PS4",
              productId: "EP2002-CUSA01433_00-ROCKETLEAGUEEU01",
              subscriptionService: "NONE",
              titleId: "CUSA01433_00"
            },
            {
              __typename: "GameLibraryTitle",
              conceptId: "10004142",
              entitlementId: null,
              image: {
                __typename: "Media",
                url: "https://image.api.playstation.com/vulcan/ap/rnd/202208/2505/DE9sevLlnfHm7vLrRwDFEZpO.png"
              },
              isActive: null,
              lastPlayedDateTime: "2023-01-19T01:01:01.900000Z",
              name: "CRISIS CORE –FINAL FANTASY VII– REUNION　PS4 & PS5",
              platform: "PS5",
              productId: null,
              subscriptionService: "NONE",
              titleId: "PPSA07809_00"
            }
          ]
        }
      }
    };

    let headers!: Record<string, string>;
    let searchParams!: URLSearchParams;

    server.use(
      rest.get(GRAPHQL_BASE_URL, (_, res, ctx) => {
        headers = _.headers.raw();
        searchParams = _.url.searchParams;

        return res(ctx.json(mockResponse));
      })
    );

    // ACT
    const response = await getRecentlyPlayedGames(mockAuthorization, {
      categories: ["ps4_game", "ps5_native_game"],
      limit: 2
    });

    // ASSERT
    expect(response).toEqual(mockResponse);
    expect(headers["authorization"]).toEqual(`Bearer ${accessToken}`);
    expect(searchParams.get("operationName")).toEqual("getUserGameList");
    expect(searchParams.get("variables")).toEqual(
      JSON.stringify({ limit: 2, categories: "ps4_game,ps5_native_game" })
    );
    expect(searchParams.get("extensions")).toEqual(
      JSON.stringify({
        persistedQuery: {
          version: 1,
          sha256Hash:
            "e780a6d8b921ef0c59ec01ea5c5255671272ca0d819edb61320914cf7a78b3ae"
        }
      })
    );
  });

  it("throws an error if we receive a malformed response", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken
    };

    const mockResponse = {
      // This response occurs if the query/hash is not what the server expected
      message:
        "Query 4e8add9915e3cb6870d778cff38e7f81899066f5603ced4c87d6d7c0abc99941 not whitelisted"
    };

    server.use(
      rest.get(GRAPHQL_BASE_URL, (_, res, ctx) => {
        return res(ctx.json(mockResponse));
      })
    );

    // ASSERT
    await expect(getRecentlyPlayedGames(mockAuthorization)).rejects.toThrow(
      "Query 4e8add9915e3cb6870d778cff38e7f81899066f5603ced4c87d6d7c0abc99941 not whitelisted"
    );
  });
});
