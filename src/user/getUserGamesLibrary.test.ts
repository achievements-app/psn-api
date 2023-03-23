import { rest } from "msw";
import { setupServer } from "msw/node";

import { AuthorizationPayload } from "../models";
import { GamesLibraryForUserResponse } from "../models/games-library-for-user.model";
import { getUserGamesLibrary } from "./getUserGamesLibrary";

const server = setupServer();

describe("Function: getUserGamesLibrary", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserGamesLibrary).toBeDefined();
  });

  it("retrieve the games library for a given user", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: GamesLibraryForUserResponse = {
      data: {
        purchasedTitlesRetrieve: {
          __typename: "GameList",
          games: [
            {
              __typename: "GameLibraryTitle",
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
              __typename: "GameLibraryTitle",
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
      rest.get(
        // TODO: Fix this URL to be more dynamic
        "`https://web.np.playstation.com/api/graphql/v1/op?operationName=getPurchasedGameList&variables=%7B%22isActive%22%3Atrue%2C%22platform%22%3A%5B%22ps4%22%2C%22ps5%22%5D%2C%22size%22%3A500%2C%22start%22%3A0%2C%22sortBy%22%3A%22ACTIVE_DATE%22%2C%22sortDirection%22%3A%22desc%22%2C%22subscriptionService%22%3A%22NONE%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%222c045408b0a4d0264bb5a3edfed4efd49fb4749cf8d216be9043768adff905e2%22%7D%7D`",
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getUserGamesLibrary(mockAuthorization);
    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
