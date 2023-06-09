import type {
  AllCallOptions,
  AuthorizationPayload,
  BasicPresenceResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_BASE_URL } from "./USER_BASE_URL";

type GetBasicPresenceOptions = Pick<AllCallOptions, "headerOverrides">;

/**
 * A call to this function will retrieve the basic presence information of the accountId being requested.
 * If the account's profile cannot be found (either due to non-existence or privacy settings),
 * an error will be thrown.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The accountId for the user you wish to retrieve a profile for.
 * @param options Optional - Additional headerOverride options to provide for the request
 */
export const getBasicPresence = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: GetBasicPresenceOptions
): Promise<BasicPresenceResponse> => {
  const url = buildRequestUrl(
    USER_BASE_URL,
    "/:accountId/basicPresences?type=primary",
    options,
    {
      accountId
    }
  );

  const response = await call<BasicPresenceResponse>({ url }, authorization);

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
