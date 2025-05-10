import nock from "nock";

import type { AuthorizationPayload, UserTitlesResponse } from "../../models";
import { generateTrophyTitle } from "../../test/generators";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getUserTitles } from "./getUserTitles";

describe("Function: getUserTitles", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserTitles).toBeDefined();
  });

  it("makes a call to get the list of trophy titles for a given user", async () => {
    // ARRANGE
    const mockAccountId = "mockAccountId";

    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: UserTitlesResponse = {
      trophyTitles: [generateTrophyTitle()],
      totalItemCount: 1
    };

    const baseUrlObj = new URL(TROPHY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/users/${mockAccountId}/trophyTitles`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getUserTitles(mockAuthorization, mockAccountId);

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
