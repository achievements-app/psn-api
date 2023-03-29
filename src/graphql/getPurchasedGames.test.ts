import { rest } from "msw";
import { setupServer } from "msw/node";

import { AuthorizationPayload } from "../models";
import { GetPurchasedGamesResponse } from "../models/purchased-games-response.model";
import { getPurchasedGames } from "./getPurchasedGames";
import { GRAPHQL_BASE_URL } from "./GRAPHQL_BASE_URL";

const server = setupServer();

describe("Function: getUserPurchasedGames", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getPurchasedGames).toBeDefined();
  });

  it("retrieve the games library for a given user", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: GetPurchasedGamesResponse = {
      data: {
        purchasedTitlesRetrieve: {
          __typename: "GameList",
          games: [
            {
              __typename: "PurchasedGame",
              conceptId: null,
              entitlementId: "UP4433-CUSA18779_00-DUNGEONSPS400000",
              image: {
                __typename: "Media",
                url: "https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA18779_00/4/i_c7b0467e8d83d7fa53d63d40a50e65e5da0edc39e07306e356cf5a6f2aba1977/i/icon0.png"
              },
              isActive: true,
              isDownloadable: true,
              isPreOrder: false,
              name: "Minecraft Dungeons",
              platform: "PS4",
              productId: "UP4433-CUSA18779_00-DUNGEONSPS400000",
              subscriptionService: "PS_PLUS",
              titleId: "CUSA18779_00"
            },
            {
              __typename: "PurchasedGame",
              conceptId: null,
              entitlementId: "UP0006-CUSA23249_00-KINGSTONGAME0000",
              image: {
                __typename: "Media",
                url: "https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA23249_00/1/i_44ffa732014f55366235e530a14a191f31fbfb075c58dc12f548ff4dbed6fae2/i/icon0_01.png"
              },
              isActive: true,
              isDownloadable: true,
              isPreOrder: false,
              name: "Battlefield™ 2042",
              platform: "PS4",
              productId: "UP0006-PPSA01464_00-KINGSTONGAME0000",
              subscriptionService: "PS_PLUS",
              titleId: "CUSA23249_00"
            }
          ]
        }
      }
    };

    server.use(
      rest.get(GRAPHQL_BASE_URL, (_, res, ctx) => {
        return res(ctx.json(mockResponse));
      })
    );

    // ACT
    const response = await getPurchasedGames(mockAuthorization);
    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("throws an error if we receive a response containing an `error` object", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse = {
      error: {
        referenceId: "d71bd8ff-5f63-11ec-87da-d5dfd3bc6e67",
        code: 2_281_604,
        message: "Not Found"
      }
    };

    server.use(
      rest.get(GRAPHQL_BASE_URL, (_, res, ctx) => {
        return res(ctx.json(mockResponse));
      })
    );

    // ASSERT
    await expect(getPurchasedGames(mockAuthorization)).rejects.toThrow();
  });
});
