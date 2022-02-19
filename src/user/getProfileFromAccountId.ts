import type {
  AllCallOptions,
  AuthorizationPayload,
  ProfileFromAccountIdResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_BASE_URL } from "./USER_BASE_URL";

type GetProfileFromAccountIdOptions = Pick<AllCallOptions, "headerOverrides">;

/**
 * A call to this function will retrieve some profile information of the accountId being requested.
 * If the account's profile cannot be found (either due to non-existence or privacy settings),
 * an error will be thrown.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The accountId for the user you wish to retrieve a profile for.
 */
export const getProfileFromAccountId = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: GetProfileFromAccountIdOptions
): Promise<ProfileFromAccountIdResponse> => {
  const url = buildRequestUrl(USER_BASE_URL, "/:accountId/profiles", options, {
    accountId
  });
  const response = await call<ProfileFromAccountIdResponse>(
    { url },
    authorization
  );

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
