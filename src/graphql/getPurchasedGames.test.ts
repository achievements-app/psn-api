import nock from "nock";

import type { AuthorizationPayload, PurchasedGamesResponse } from "../models";
import { getPurchasedGames } from "./getPurchasedGames";
import { GRAPHQL_BASE_URL } from "./GRAPHQL_BASE_URL";

const accessToken = "mockAccessToken";

describe("Function: getPurchasedGames", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getPurchasedGames).toBeDefined();
  });

  it("retrieves purchased games for the user", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken
    };

    const mockResponse: PurchasedGamesResponse = {
      data: {
        purchasedTitlesRetrieve: {
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
              isDownloadable: true,
              isPreOrder: false,
              membership: "NONE",
              name: "Rocket League®",
              platform: "PS4",
              productId: "EP2002-CUSA01433_00-ROCKETLEAGUEEU01",
              titleId: "CUSA01433_00"
            }
          ]
        }
      }
    };

    nock(GRAPHQL_BASE_URL)
      .get("")
      .query((query) => {
        return query.operationName === "getPurchasedGameList";
      })
      .reply(200, mockResponse);

    // ACT
    const response = await getPurchasedGames(mockAuthorization);

    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("retrieves purchased games with custom options", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken
    };

    const mockResponse: PurchasedGamesResponse = {
      data: {
        purchasedTitlesRetrieve: {
          __typename: "GameList",
          games: []
        }
      }
    };

    nock(GRAPHQL_BASE_URL)
      .get("")
      .query((query) => {
        const variables = JSON.parse(query.variables as string);
        return (
          query.operationName === "getPurchasedGameList" &&
          variables.isActive === false &&
          variables.size === 50 &&
          variables.sortBy === "NAME"
        );
      })
      .reply(200, mockResponse);

    // ACT
    const response = await getPurchasedGames(mockAuthorization, {
      isActive: false,
      size: 50,
      sortBy: "NAME"
    });

    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("throws an error if response data is null", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken
    };

    const mockErrorResponse = {
      data: null
    };

    nock(GRAPHQL_BASE_URL)
      .get("")
      .query((query) => {
        return query.operationName === "getPurchasedGameList";
      })
      .reply(200, mockErrorResponse);

    // ASSERT
    await expect(getPurchasedGames(mockAuthorization)).rejects.toThrowError(
      JSON.stringify(mockErrorResponse)
    );
  });

  it("throws an error if purchasedTitlesRetrieve is null", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken
    };

    const mockErrorResponse = {
      data: {
        purchasedTitlesRetrieve: null
      }
    };

    nock(GRAPHQL_BASE_URL)
      .get("")
      .query((query) => {
        return query.operationName === "getPurchasedGameList";
      })
      .reply(200, mockErrorResponse);

    // ASSERT
    await expect(getPurchasedGames(mockAuthorization)).rejects.toThrowError(
      JSON.stringify(mockErrorResponse)
    );
  });
});
