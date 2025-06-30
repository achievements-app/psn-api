import type {
  AllCallOptions,
  AuthorizationPayload,
  AccountDevicesResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_DMS_BASE_URL } from "./USER_BASE_URL";

type GetAccountDevicesOptions = Pick<AllCallOptions, "headerOverrides">;

/**
 * A call to this function will retrieve the list of devices the client is logged into.
 * This includes information about PlayStation consoles (PS5, PS4, PS3) and handheld
 * devices (PSVita) that are associated with the account.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeAccessCodeForAuthTokens()`.
 * @param options Optional - Additional headerOverride options to provide for the request
 */
export const getAccountDevices = async (
  authorization: AuthorizationPayload,
  options?: GetAccountDevicesOptions
): Promise<AccountDevicesResponse> => {
  const queryParams = {
    includeFields: "device,systemData",
    platform: "PS5,PS4,PS3,PSVita"
  };

  const url = buildRequestUrl(
    USER_DMS_BASE_URL,
    "/v1/devices/accounts/:accountId",
    { ...options, ...queryParams },
    {
      accountId: "me" // 'me' is used to refer to the authenticated user's account
    }
  );

  const response = await call<AccountDevicesResponse>({ url }, authorization);

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
