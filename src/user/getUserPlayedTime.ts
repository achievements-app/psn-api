import type {
  AllCallOptions,
  AuthorizationPayload,
  GetUserPlayedTimeResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_TIME_PLAYED_URL } from "./USER_TIME_PLAYED_URL";

type GetUserFriendsAccountIdsOptions = Pick<AllCallOptions, "limit" | "offset">;

/**
 * A call to this function will retrieve the list of playtime of various
 * PS4 and PS5 titles. If the user cannot be found (either due to
 * non-existence or privacy settings), an error will be thrown.
 *
 * To find a user's `accountId`, the `makeUniversalSearch()` function can be used.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 */
export const getUserPlayedTime = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: Partial<GetUserFriendsAccountIdsOptions>
): Promise<GetUserPlayedTimeResponse> => {
  const url = buildRequestUrl(
    USER_TIME_PLAYED_URL,
    "/:accountId/titles",
    options,
    { accountId }
  );

  const response = await call<GetUserPlayedTimeResponse>(
    { url },
    authorization
  );

  // If you are unable to access the user's time played
  // data, an error will be thrown.
  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
