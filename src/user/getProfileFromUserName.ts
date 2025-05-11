import type {
  AuthorizationPayload,
  ProfileFromUserNameResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_LEGACY_BASE_URL } from "./USER_BASE_URL";

/**
 * A call to this function will retrieve the profile of the username being requested.
 * If the user cannot be found (either due to non-existence or privacy settings),
 * an error will be thrown.
 *
 * This is a legacy API endpoint function. If you are just trying to get a user's
 * account ID, [`makeUniversalSearch()`](https://psn-api.achievements.app/api-docs/universal-search#makeuniversalsearch)
 * is recommended instead. This endpoint is here because it can return interesting
 * presence information when the user is playing on a legacy console such as a PS3.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeAccessCodeForAuthTokens()`.
 * @param userName The username for the user you wish to retrieve a profile for.
 */
export const getProfileFromUserName = async (
  authorization: AuthorizationPayload,
  userName: string
): Promise<ProfileFromUserNameResponse> => {
  const basicFields =
    "npId,onlineId,accountId,avatarUrls,plus,aboutMe,languagesUsed";
  const trophyFields = "trophySummary(@default,level,progress,earnedTrophies)";
  const profileFields =
    "isOfficiallyVerified,personalDetail(@default,profilePictureUrls),personalDetailSharing,personalDetailSharingRequestMessageFlag";
  const statusFields =
    "primaryOnlineStatus,presences(@default,@titleInfo,platform,lastOnlineDate,hasBroadcastData)";
  const socialFields =
    "requestMessageFlag,blocking,friendRelation,following,consoleAvailability";

  const fields = [
    basicFields,
    trophyFields,
    profileFields,
    statusFields,
    socialFields
  ].join(",");

  const url = buildRequestUrl(
    USER_LEGACY_BASE_URL,
    ":userName/profile2",
    {},
    {
      userName,
      fields
    }
  );

  const response = await call<ProfileFromUserNameResponse>(
    { url },
    authorization
  );

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
