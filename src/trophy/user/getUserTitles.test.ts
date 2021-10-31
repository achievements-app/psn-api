import { rest } from "msw";
import { setupServer } from "msw/node";

import type { AuthorizationPayload, UserTitlesResponse } from "../../models";
import { generateTrophyTitle } from "../../test/generators";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";
import { getUserTitles } from "./getUserTitles";

const server = setupServer();

describe("Function: getUserTitles", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/users/${mockAccountId}/trophyTitles`,
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getUserTitles(mockAuthorization, mockAccountId);

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
