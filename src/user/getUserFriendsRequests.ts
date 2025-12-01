import type {
  AllCallOptions,
  AuthorizationPayload,
  GetUserFriendsRequestsResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_BASE_URL } from "./USER_BASE_URL";

type GetUserFriendsRequestsOptions = Pick<AllCallOptions, "limit" | "offset">;

/**
 * A call to this function will retrieve the list of received friend requests `accountId` values
 * for the account the client is logged into.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeAccessCodeForAuthTokens()`.
 * @param options Optional parameters for pagination (limit and offset).
 */
export const getUserFriendsRequests = async (
  authorization: AuthorizationPayload,
  options?: Partial<GetUserFriendsRequestsOptions>
): Promise<GetUserFriendsRequestsResponse> => {
  const url = buildRequestUrl(
    USER_BASE_URL,
    "/:accountId/friends/receivedRequests",
    options,
    {
      accountId: "me" // 'me' is used to refer to the authenticated user's account
    }
  );

  const response = await call<GetUserFriendsRequestsResponse>(
    { url },
    authorization
  );

  // If you are unable to access the user's friend requests, an error will be thrown.
  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
