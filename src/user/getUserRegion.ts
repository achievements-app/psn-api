import type {
  AuthorizationPayload,
  RegionCode,
  UserRegionInfo
} from "../models";
import { extractRegionFromNpId } from "../utils/extractRegionFromNpId";
import { getProfileFromUserName } from "./getProfileFromUserName";

/**
 * Retrieves the region of a PlayStation Network user based on their username.
 *
 * This function uses the npId from the user's profile to determine their region.
 * The region is extracted from the base64-encoded npId and returned as an object
 * containing both the two-letter country code (ISO 3166-1 alpha-2) and the full
 * country name.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeAccessCodeForAuthTokens()`.
 * @param userName The username for the user whose region you want to determine.
 * @param locales Optional. A string with a BCP 47 language tag, or an array of such strings.
 *                Defaults to ['en'] (English) if not specified.
 * @returns A promise that resolves to a RegionInfo object with the country code and name, or null if the region cannot be determined.
 *
 * @throws Will throw an error if the user cannot be found or if there are any issues accessing the profile.
 */
export const getUserRegion = async (
  authorization: AuthorizationPayload,
  userName: string,
  locales: Intl.LocalesArgument = ["en"]
): Promise<UserRegionInfo | null> => {
  const profileData = await getProfileFromUserName(authorization, userName);

  const npId = profileData?.profile?.npId;
  if (!npId) {
    // User profile not found, or npId is missing
    return null;
  }

  const regionCode: RegionCode | null = extractRegionFromNpId(npId);

  if (!regionCode) {
    // Region could not be determined from the npId
    return null;
  }
  try {
    // Use Intl.DisplayNames to get the region name in the specified locale
    const regionNames = new Intl.DisplayNames(locales, { type: "region" });
    const regionName = regionNames.of(regionCode); // `of` expects a string region code

    return {
      code: regionCode,
      name: regionName
    };
  } catch {
    // If Intl.DisplayNames fails, return just the code with an unknown name
    return {
      code: regionCode,
      name: "Unknown"
    };
  }
};
