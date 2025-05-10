import nock from "nock";

import type {
  AuthorizationPayload,
  TitleTrophyGroupsResponse
} from "../../models";
import { generateTrophyCounts } from "../../test/generators";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getTitleTrophyGroups } from "./getTitleTrophyGroups";

describe("Function: getTitleTrophyGroups", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getTitleTrophyGroups).toBeDefined();
  });

  it("retrieves trophy groups metadata for a given title", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockNpCommunicationId = "mockNpCommunicationId";

    const mockResponse: TitleTrophyGroupsResponse = {
      trophySetVersion: "1.00",
      trophyTitleName: "mockTrophyTitleName",
      trophyTitleIconUrl: "mockTrophyTitleIconUrl",
      trophyTitlePlatform: "PS3",
      definedTrophies: generateTrophyCounts(),
      trophyGroups: []
    };

    const baseUrlObj = new URL(TROPHY_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(
        `${basePath}/v1/npCommunicationIds/${mockNpCommunicationId}/trophyGroups`
      )
      .query(true)
      .reply(200, mockResponse);

    // ACT
    const response = await getTitleTrophyGroups(
      mockAuthorization,
      mockNpCommunicationId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
