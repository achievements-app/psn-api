import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  GetUserFriendsAccountIdsResponse
} from "../models";
import { getUserFriendsAccountIds } from "./getUserFriendsAccountIds";
import { USER_BASE_URL } from "./USER_BASE_URL";

const server = setupServer();

describe("Function: getUserFriendsAccountIds", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserFriendsAccountIds).toBeDefined();
  });

  it("retrieves the friends list for a given account id", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: GetUserFriendsAccountIdsResponse = {
      friends: ["2984038888603282554", "8403439712302084350"],
      totalItemCount: 2
    };

    server.use(
      rest.get(`${USER_BASE_URL}/me/friends`, (_, res, ctx) => {
        return res(ctx.json(mockResponse));
      })
    );

    // ACT
    const response = await getUserFriendsAccountIds(mockAuthorization, "me");

    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("throws an error if we receive a response containing an `error` object", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse = {
      error: {
        referenceId: "d71bd8ff-5f63-11ec-87da-d5dfd3bc6e67",
        code: 2_281_604,
        message: "Not Found"
      }
    };

    server.use(
      rest.get(
        "https://m.np.playstation.com/api/userProfile/v1/internal/users/111222333444/friends",
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ASSERT
    await expect(
      getUserFriendsAccountIds(mockAuthorization, "111222333444")
    ).rejects.toThrow();
  });
});
