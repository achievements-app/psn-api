import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  SocialAccountResult,
  UniversalSearchResponse
} from "../models";
import { makeUniversalSearch } from "./makeUniversalSearch";
import { SEARCH_BASE_URL } from "./SEARCH_BASE_URL";

const server = setupServer();

describe("Function: makeUniversalSearch", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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

    server.use(
      rest.post(`${SEARCH_BASE_URL}/v1/universalSearch`, (_, res, ctx) => {
        return res(ctx.json(mockResponse));
      })
    );

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
