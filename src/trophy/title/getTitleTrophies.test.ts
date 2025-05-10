import nock from "nock";

import type { AuthorizationPayload, TitleTrophiesResponse } from "../../models";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getTitleTrophies } from "./getTitleTrophies";

describe("Function: getTitleTrophies", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(getTitleTrophies).toBeDefined();
  });

  it("retrieves trophies for a given title", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockNpCommunicationId = "mockNpCommunicationId";
    const mockTrophyGroupId = "mockTrophyGroupId";

    const mockResponse: TitleTrophiesResponse = {
      trophySetVersion: "1.00",
      hasTrophyGroups: false,
      trophies: [],
      totalItemCount: 0
    };

    nock(TROPHY_BASE_URL)
      .get(
        `/v1/npCommunicationIds/${mockNpCommunicationId}/trophyGroups/${mockTrophyGroupId}/trophies`
      )
      .reply(200, mockResponse);

    // ACT
    const response = await getTitleTrophies(
      mockAuthorization,
      mockNpCommunicationId,
      mockTrophyGroupId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
