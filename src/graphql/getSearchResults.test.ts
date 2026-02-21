import nock from "nock";

import type { SearchResultsResponse } from "../models";
import { getSearchResults } from "./getSearchResults";
import { GRAPHQL_BASE_URL } from "./GRAPHQL_BASE_URL";

describe("Function: getSearchResults", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getSearchResults).toBeDefined();
  });

  it("retrieves search results for a given search term", async () => {
    // ARRANGE
    const mockResponse: SearchResultsResponse = {
      data: {
        universalSearch: {
          __typename: "UniversalSearchResponse",
          next: "CDAaVQolYjg5ODE2ODk0Y2ZiNDU2ZGIzNTU5MjIwOWM5YTdjODQtNDAxNxIsc2VhcmNoLXJlbGV2YW5jeS1jb25jZXB0LWdhbWUtYWxsLXRvcGstYXN0cmEiHnNlYXJjaC5ub19leHBlcmltZW50Lm5vbi4wLm5vbioDNzUx",
          pageInfo: {
            __typename: "PageInfo",
            isLast: false,
            offset: 0,
            size: 2,
            totalCount: 87
          },
          results: [
            {
              __typename: "Product",
              id: "EP1018-CUSA00135_00-BAKPREORDER00001",
              localizedStoreDisplayClassification: "Volledige game",
              media: [
                {
                  __typename: "Media",
                  role: "MASTER",
                  type: "IMAGE",
                  url: "https://image.api.playstation.com/cdn/EP1018/CUSA00135_00/gIBLibuNu1I91g9FYzkqBJFLMd1X9OaD.png"
                }
              ],
              name: "Batman: Arkham Knight",
              npTitleId: "CUSA00135_00",
              personalizedMeta: {
                __typename: "PersonalizedMeta",
                hasMediaOverrides: false,
                media: [
                  {
                    __typename: "Media",
                    role: "MASTER",
                    type: "IMAGE",
                    url: "https://image.api.playstation.com/cdn/EP1018/CUSA00135_00/gIBLibuNu1I91g9FYzkqBJFLMd1X9OaD.png"
                  }
                ]
              },
              platforms: ["PS4"],
              price: {
                __typename: "SkuPrice",
                skuId: "EP1018-CUSA00135_00-BAKPREORDER00001-E005",
                basePrice: "€19.99",
                discountText: null,
                discountedPrice: null,
                includesBundleOffer: null,
                isExclusive: false,
                isFree: false,
                isTiedToSubscription: null,
                serviceBranding: null,
                upsellServiceBranding: [],
                upsellText: null
              },
              skus: [
                {
                  __typename: "Sku",
                  type: "STANDARD"
                }
              ],
              storeDisplayClassification: "FULL_GAME"
            },
            {
              __typename: "Product",
              id: "EP1018-CUSA00135_00-DLCTWOFACESTORY0",
              localizedStoreDisplayClassification: "Level",
              media: [
                {
                  __typename: "Media",
                  role: "MASTER",
                  type: "IMAGE",
                  url: "https://image.api.playstation.com/cdn/EP1018/CUSA00135_00/U2Yf57C14ovXI3zl3uXWoHSli3SywqEr.png"
                }
              ],
              name: "Batman™: Arkham Knight Kop of munt",
              npTitleId: "CUSA00135_00",
              personalizedMeta: {
                __typename: "PersonalizedMeta",
                hasMediaOverrides: false,
                media: [
                  {
                    __typename: "Media",
                    role: "MASTER",
                    type: "IMAGE",
                    url: "https://image.api.playstation.com/cdn/EP1018/CUSA00135_00/U2Yf57C14ovXI3zl3uXWoHSli3SywqEr.png"
                  }
                ]
              },
              platforms: ["PS4"],
              price: {
                __typename: "SkuPrice",
                skuId: "EP1018-CUSA00135_00-DLCTWOFACESTORY0-E001",
                basePrice: "€1.99",
                discountText: null,
                discountedPrice: null,
                includesBundleOffer: null,
                isExclusive: false,
                isFree: false,
                isTiedToSubscription: null,
                serviceBranding: null,
                upsellServiceBranding: [],
                upsellText: null
              },
              skus: [
                {
                  __typename: "Sku",
                  type: "STANDARD"
                }
              ],
              storeDisplayClassification: "LEVEL"
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
      countryCode: "NL",
      languageCode: "nl",
      pageSize: 2,
      pageOffset: 0,
      searchTerm: "batman"
    });
    const expectedExtensions = JSON.stringify({
      persistedQuery: {
        version: 1,
        sha256Hash:
          "6ef5e809c35a056a1150fdcf513d9c505484dd1a946b6208888435c3182f105a"
      }
    });

    const mockScope = nock(baseUrl)
      .get(basePath)
      .query((params) => {
        expect(params.operationName).toEqual("getSearchResults");
        expect(params.variables).toEqual(expectedVariables);
        expect(params.extensions).toEqual(expectedExtensions);
        return true;
      })
      .reply(200, mockResponse);

    // ACT
    const response = await getSearchResults("batman", {
      countryCode: "NL",
      languageCode: "nl",
      pageSize: 2
    });

    // ASSERT
    expect(response).toEqual(mockResponse);
    expect(mockScope.isDone()).toBeTruthy();
  });

  it("throws an error if we receive a malformed response", async () => {
    // ARRANGE
    const mockResponse = {
      // This response occurs if the query/hash is not what the server expected.
      message:
        "Query 6ef5e809c35a056a1150fdcf513d9c505484dd1a946b6208888435c3182f105a not whitelisted"
    };

    const baseUrlObj = new URL(GRAPHQL_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl).get(basePath).query(true).reply(200, mockResponse);

    // ASSERT
    await expect(
      getSearchResults("test", {
        countryCode: "US",
        languageCode: "en"
      })
    ).rejects.toThrow(
      "Query 6ef5e809c35a056a1150fdcf513d9c505484dd1a946b6208888435c3182f105a not whitelisted"
    );
  });
});
