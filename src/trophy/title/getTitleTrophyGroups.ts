import urlcat from "urlcat";

import { call } from "../../call";
import type {
  AuthorizationPayload,
  CallValidHeaders,
  TitleTrophyGroupsResponse
} from "../../models";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";

interface GetTitleTrophyGroupsOptions {
  /**
   * Not required unless the platform is PS3, PS4, or PS Vita.
   * If one of these platforms, the value __must__ be `"trophy"`.
   *
   * `"trophy"` for PS3, PS4, or PS Vita platforms.
   * `"trophy2"` for the PS5 platform.
   */
  npServiceName: "trophy" | "trophy2";

  /*
   * Override the headers in the request to the PSN API,
   * such as to change the language.
   */
  headerOverrides: CallValidHeaders;
}

/**
 * A title may have additional groups of trophies. This is most commonly
 * seen in games which have expansions where additional trophies are added.
 *
 * You can make a request to this URL for a specific title - using the
 * unique `npCommunicationId` for the title - and in response will receive a
 * summary of all of the trophy groups associated with the title.
 * This also includes a summary of the number of trophies for the
 * title broken down by group and type (gold, silver etc.).
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param npCommunicationId Unique ID of the title.
 * @param options.npServiceName `"trophy"` for PS3, PS4, or PS Vita platforms. `"trophy2"` for the PS5 platform.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getTitleTrophyGroups = async (
  authorization: AuthorizationPayload,
  npCommunicationId: string,
  options?: Partial<GetTitleTrophyGroupsOptions>
): Promise<TitleTrophyGroupsResponse> => {
  const url = buildRequestUrl(npCommunicationId, options);

  return await call<TitleTrophyGroupsResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );
};

const buildRequestUrl = (
  npCommunicationId: string,
  options: Partial<GetTitleTrophyGroupsOptions> = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- This is an intentional pick.
  const { headerOverrides, ...pickedOptions } = options;

  return urlcat(
    TROPHY_BASE_URL,
    "/v1/npCommunicationIds/:npCommunicationId/trophyGroups",
    { npCommunicationId, ...pickedOptions }
  );
};
