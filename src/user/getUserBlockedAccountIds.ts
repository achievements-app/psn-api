import type {
  AllCallOptions,
  AuthorizationPayload,
  GetUserBlockedAccountIdsResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_BASE_URL } from "./USER_BASE_URL";

type GetUserBlockedAccountIdsOptions = Pick<AllCallOptions, "limit" | "offset">;

/**
 * A call to this function will retrieve the list of blocked `accountId` values
 * for the account the client is logged into.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeAccessCodeForAuthTokens()`.
 * @param options Optional parameters for pagination (limit and offset).
 */
export const getUserBlockedAccountIds = async (
  authorization: AuthorizationPayload,
  options?: Partial<GetUserBlockedAccountIdsOptions>
): Promise<GetUserBlockedAccountIdsResponse> => {
  const url = buildRequestUrl(USER_BASE_URL, "/:accountId/blocks", options, {
    accountId: "me" // 'me' is used to refer to the authenticated user's account
  });

  const response = await call<GetUserBlockedAccountIdsResponse>(
    { url },
    authorization
  );

  // If you are unable to access the user's blocked list, an error will be thrown.
  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};