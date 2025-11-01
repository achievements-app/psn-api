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

    const baseUrlObj = new URL(GRAPHQL_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    // ... we need to use a nock matcher to verify the query parameters ...
    const expectedVariables = JSON.stringify({
      isActive: true,
      platform: ["ps4", "ps5"],
      size: 24,
      start: 0,
      sortBy: "ACTIVE_DATE",
      sortDirection: "desc"
    });
    const expectedExtensions = JSON.stringify({
      persistedQuery: {
        version: 1,
        sha256Hash:
          "827a423f6a8ddca4107ac01395af2ec0eafd8396fc7fa204aaf9b7ed2eefa168"
      }
    });

    const mockScope = nock(baseUrl)
      .get(basePath)
      .query((params) => {
        expect(params.operationName).toEqual("getPurchasedGameList");
        expect(params.variables).toEqual(expectedVariables);
        expect(params.extensions).toEqual(expectedExtensions);
        return true;
      })
      .matchHeader("authorization", `Bearer ${accessToken}`)
      .reply(200, mockResponse);

    // ACT
    const response = await getPurchasedGames(mockAuthorization);

    // ASSERT
    expect(response).toEqual(mockResponse);
    expect(mockScope.isDone()).toBeTruthy();
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

    const baseUrlObj = new URL(GRAPHQL_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    const expectedVariables = JSON.stringify({
      isActive: false,
      platform: ["ps4", "ps5"],
      size: 50,
      start: 0,
      sortBy: "ACTIVE_DATE",
      sortDirection: "desc"
    });
    const expectedExtensions = JSON.stringify({
      persistedQuery: {
        version: 1,
        sha256Hash:
          "827a423f6a8ddca4107ac01395af2ec0eafd8396fc7fa204aaf9b7ed2eefa168"
      }
    });

    const mockScope = nock(baseUrl)
      .get(basePath)
      .query((params) => {
        expect(params.operationName).toEqual("getPurchasedGameList");
        expect(params.variables).toEqual(expectedVariables);
        expect(params.extensions).toEqual(expectedExtensions);
        return true;
      })
      .matchHeader("authorization", `Bearer ${accessToken}`)
      .reply(200, mockResponse);

    // ACT
    const response = await getPurchasedGames(mockAuthorization, {
      isActive: false,
      size: 50,
      sortBy: "ACTIVE_DATE"
    });

    // ASSERT
    expect(response).toEqual(mockResponse);
    expect(mockScope.isDone()).toBeTruthy();
  });

  it("throws an error if response data is null", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken
    };

    const mockErrorResponse = {
      data: null
    };

    const baseUrlObj = new URL(GRAPHQL_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(basePath)
      .query(true)
      .matchHeader("authorization", `Bearer ${accessToken}`)
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

    const baseUrlObj = new URL(GRAPHQL_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(basePath)
      .query(true)
      .matchHeader("authorization", `Bearer ${accessToken}`)
      .reply(200, mockErrorResponse);

    // ASSERT
    await expect(getPurchasedGames(mockAuthorization)).rejects.toThrowError(
      JSON.stringify(mockErrorResponse)
    );
  });
});
