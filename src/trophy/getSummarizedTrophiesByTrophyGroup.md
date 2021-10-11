# getSummarizedTrophiesByTrophyGroup

```ts
/**
 * A request to this URL will retrieve a summary of the trophies earned for
 * a user broken down by trophy group within a title. A title can have
 * multiple groups of trophies (a `"default"` group which all titles have,
 * and additional groups beginning with the name `"001"` and incrementing for
 * each additional group).
 *
 * The numeric `accountId` can be that of any PSN account for which the
 * authenticating account has permissions to view the trophy list.
 * When querying the titles associated with the authenticating account, the
 * numeric `accountId` can be substituted with `"me"`.
 *
 * This function calls an endpoint that returns the earned status of the
 * trophy only and no additional descriptive metadata (ie. trophy name,
 * trophy description). Use `getTrophiesForTitle()` to obtain this information.
 *
 *  When the title platform is PS3, PS4 or PS Vita you __must__ specify the
 * `npServiceName` parameter as `"trophy"`.
 *
 * If you attempt to query a title which the user does not have associated
 * with their account (ie. the title has not been launched and allowed to
 * sync at least once) then a Resource Not Found error will be returned.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param npCommunicationId Unique ID of the title.
 * @param options.npServiceName `"trophy"` for PS3, PS4, or PS Vita platforms. `"trophy2"` for the PS5 platform.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getSummarizedTrophiesByTrophyGroup = async (
  authorization: AuthorizationPayload,
  accountId: string,
  npCommunicationId: string,
  options?: Partial<GetSummarizedTrophiesByTrophyGroupOptions>
): Promise<SummarizedTrophiesByTrophyGroupResponse> => { ... }
```

```ts
interface SummarizedTrophiesByTrophyGroupResponse {
  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  /**
   * Title has been hidden on the accounts trophy list.
   * This applies to the authenticating account only.
   * The title will not be returned if it has been hidden on another account.
   */
  hiddenFlag: boolean;

  /** The account's percentage process towards the next trophy level. */
  progress: number;

  /** The account's number of earned trophies by type. */
  earnedTrophies: TrophyCounts;

  /** Individual object for each trophy group returned. */
  trophyGroups: TrophyGroup[];

  /** Date of the user's most recent trophy earned for the title. */
  lastUpdatedDateTime: string;
}
```

```ts
// Usage example

// Returns a summary of your trophies earned for Astro's Playroom (NPWR20188_00).
const response = await getSummarizedTrophiesByTrophyGroup(
  authorization,
  "me",
  "NPWR20188_00",
  { npServiceName: "trophy2" }
);
```
