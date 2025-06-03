import type {
  AuthorizationPayload,
  ShareableProfileLinkResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_CPSS_BASE_URL } from "./USER_BASE_URL"

/**
 * A call to this function will retrieve a shareable link and QR code for a PlayStation Network user's profile.
 * The shareable link allows others to view the user's public profile information, and the QR code provides
 * a convenient way to share the profile via scanning.
 *
 * If the user's profile cannot be found or accessed,
 * an error will be thrown.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeAccessCodeForAuthTokens()`.
 * @param accountId The account ID for the user whose shareable profile link you want to retrieve.
 */
export const getProfileShareableLink = async (
  authorization: AuthorizationPayload,
  accountId: string
): Promise<ShareableProfileLinkResponse> => {
  const url = buildRequestUrl(USER_CPSS_BASE_URL, "/v1/share/profile/:accountId", {}, {
    accountId
  });

  const response = await call<ShareableProfileLinkResponse>(
    { url },
    authorization
  );

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
