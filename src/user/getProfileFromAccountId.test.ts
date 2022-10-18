import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  ProfileFromAccountIdResponse
} from "../models";
import { getProfileFromAccountId } from "./getProfileFromAccountId";
import { USER_BASE_URL } from "./USER_BASE_URL";

const server = setupServer();

describe("Function: getProfileFromUserName", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getProfileFromAccountId).toBeDefined();
  });

  it("retrieves the profile for a given username", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: ProfileFromAccountIdResponse = {
      onlineId: "xelnia",
      isPlus: true,
      aboutMe: "",
      languages: ["en"],
      isOfficiallyVerified: false,
      isMe: false,
      avatars: [
        {
          size: "s",
          url: "asdf"
        }
      ]
    };

    server.use(
      rest.get(
        "https://m.np.playstation.com/api/userProfile/v1/internal/users/111222333444/profiles",
        (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getProfileFromAccountId(
      mockAuthorization,
      "111222333444"
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("throws an error if we receive a response containing an `error` object", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse = {
      error: { code: 2_105_356, message: "User not found (user: 'xeln12ia')" }
    };

    server.use(
      rest.get(`${USER_BASE_URL}/111222333444/profiles`, (_, res, ctx) => {
        return res(ctx.json(mockResponse));
      })
    );

    // ASSERT
    await expect(
      getProfileFromAccountId(mockAuthorization, "111222333444")
    ).rejects.toThrow();
  });
});
