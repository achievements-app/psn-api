import nock from "nock";

import type {
  AuthorizationPayload,
  SocialAccountResult,
  UniversalSearchResponse
} from "../models";
import { makeUniversalSearch } from "./makeUniversalSearch";
import { SEARCH_BASE_URL } from "./SEARCH_BASE_URL";

describe("Function: makeUniversalSearch", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(makeUniversalSearch).toBeDefined();
  });

  it("can make a call to Sony's universal search endpoint", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: UniversalSearchResponse<SocialAccountResult> = {
      prefix: "mockPrefix",
      suggestions: [],
      fallbackQueried: false,
      domainResponses: []
    };

    const baseUrlObj = new URL(SEARCH_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .post(`${basePath}/v1/universalSearch`)
      .reply(200, mockResponse);

    // ACT
    const response = await makeUniversalSearch(
      mockAuthorization,
      "xelnia",
      "SocialAllAccounts"
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
