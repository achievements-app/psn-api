# getUserTitles

```ts
/**
 * Calls to this function will retrieve a list of the titles associated with an account,
 * and a summary of trophies earned from them.
 *
 * The numeric `accountId` can be that of any PSN account for which the authenticating
 * account has permissions to view the trophy list. When querying the titles
 * associated with the authenticating account, the numeric `accountId` can be
 * substituted with `"me"`.
 *
 * Included in the information returned is the titles' unique `npCommunicationId`.
 * This is required to make use of subsequent URLs for requesting more specific
 * detail about a titles trophies.
 *
 * The results are presented in order of the `lastUpdatedDateTime` for the title,
 * so the first result will be the title for which a trophy was recently earned
 * (or synced for the first time in the case of a game with 0% progress).
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param options.limit Limit the number of titles returned.
 * @param options.offset Return title data from this result onwards.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getUserTitles = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: Partial<GetUserTitlesOptions>
): Promise<UserTitlesResponse> => { ... }
```

```ts
interface UserTitlesResponse {
  trophyTitles: TrophyTitle[];
  totalItemCount: number;
}

interface TrophyTitle {
  /**
   * `"trophy"` for PS3, PS4, or PS Vita platforms.
   * `"trophy2"` for the PS5 platform.
   */
  npServiceName: string;

  /**
   * Unique ID of the title. This is later required for requesting detailed
   * trophy information for this title.
   */
  npCommunicationId: string;

  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  trophyTitleName: string;

  /** URL of the icon for the given title. */
  trophyTitleIconUrl: string;

  /**
   * The platform this title belongs to. Some games have trophy sets which are
   * shared between multiple platforms (ie. PS4,PSVITA). The platforms will be
   * comma separated.
   */
  trophyTitlePlatform: TitlePlatform | string;

  /**
   * True if the title has multiple groups of trophies
   * (eg. DLC trophies which are separate from the main trophy list)
   */
  hasTrophyGroups: boolean;

  /** Number of trophies for the title by type */
  definedTrophies: TrophyCounts;

  /** Percentage of trophies earned for the title */
  progress: number;

  /** Number of trophies for the title which have been earned by type */
  earnedTrophies: TrophyCounts;

  /**
   * Title has been hidden on the accounts trophy list.
   * This applies to the authenticating account only.
   * The title will not be returned if it has been hidden on another account.
   */
  hiddenFlag: boolean;

  /** Date most recent trophy earned for the title. */
  lastUpdatedDateTime: string;

  /** The title description. This applies to PS3, PS4, and PS Vita titles only. */
  trophyTitleDetail?: string;
}
```

```ts
// Usage example

// Returns a list of all titles you've earned trophies for.
const response = await getUserTitles(authorization, "me");
```
