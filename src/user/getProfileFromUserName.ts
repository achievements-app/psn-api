import type {
  AuthorizationPayload,
  ProfileFromUserNameResponse
} from "../models";
import { call } from "../utils/call";

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
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param userName The username for the user you wish to retrieve a profile for.
 */
export const getProfileFromUserName = async (
  authorization: AuthorizationPayload,
  userName: string
): Promise<ProfileFromUserNameResponse> => {
  const url = `https://us-prof.np.community.playstation.net/userProfile/v1/users/${userName}/profile2?fields=npId,onlineId,accountId,avatarUrls,plus,aboutMe,languagesUsed,trophySummary(@default,level,progress,earnedTrophies),isOfficiallyVerified,personalDetail(@default,profilePictureUrls),personalDetailSharing,personalDetailSharingRequestMessageFlag,primaryOnlineStatus,presences(@default,@titleInfo,platform,lastOnlineDate,hasBroadcastData),requestMessageFlag,blocking,friendRelation,following,consoleAvailability`;

  const response = await call<ProfileFromUserNameResponse>(
    { url },
    authorization
  );

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
