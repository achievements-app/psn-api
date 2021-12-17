import type {
  AllCallOptions,
  AuthorizationPayload,
  GetUserFriendsAccountIdsResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_BASE_URL } from "./USER_BASE_URL";

type GetUserFriendsAccountIdsOptions = Pick<AllCallOptions, "limit" | "offset">;

/**
 * A call to this function will retrieve the list of friended `accountId` values
 * associated with the given `accountId` parameter. If the user cannot be found
 * (either due to non-existence or privacy settings), an error will be thrown.
 *
 *  To find a user's `accountId`, the `makeUniversalSearch()` function can be used.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 */
export const getUserFriendsAccountIds = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: Partial<GetUserFriendsAccountIdsOptions>
): Promise<GetUserFriendsAccountIdsResponse> => {
  const url = buildRequestUrl(USER_BASE_URL, "/:accountId/friends", options, {
    accountId
  });

  const response = await call<GetUserFriendsAccountIdsResponse>(
    { url },
    authorization
  );

  // If you are unable to access the user's friends list, a
  // "Not permitted by access control" error will be thrown.
  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
