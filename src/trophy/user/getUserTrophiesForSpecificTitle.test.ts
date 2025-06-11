import nock from "nock";

import type { AuthorizationPayload, UserTrophiesBySpecificTitleResponse } from "../../models";
import { generateTrophyTitle } from "../../test/generators";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getUserTrophiesForSpecificTitle } from "./getUserTrophiesForSpecificTitle";

describe("Function: getUserTrophiesForSpecificTitle", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserTrophiesForSpecificTitle).toBeDefined();
  });

  it("makes a call to get the summary of the trophies earned by a user for specific titles", async () => {
    // ARRANGE
    const mockAccountId = "mockAccountId";

    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };
    const mockOptions = {
      npTitleIds: 'PPSA13195_00,PPSA27366_00',
      includeNotEarnedTrophyIds: true
    }

    const mockResponse: UserTrophiesBySpecificTitleResponse = {
      titles: [
        {
          npTitleId: 'PPSA13195_00',
          trophyTitles: [generateTrophyTitle()]
        },
        {
          npTitleId: 'PPSA27366_00',
          trophyTitles: [generateTrophyTitle()]
        }
      ],
    };

    const baseUrlObj = new URL(TROPHY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/users/${mockAccountId}/titles/trophyTitles`)
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getUserTrophiesForSpecificTitle(mockAuthorization, mockAccountId, mockOptions);

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
