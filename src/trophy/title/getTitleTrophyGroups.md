# getTitleTrophyGroups

```ts
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
): Promise<TitleTrophyGroupsResponse> => { ... }
```

```ts
interface TitleTrophyGroupsResponse {
  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  /** The title name that this trophy belongs to. */
  trophyTitleName: string;

  /** URL of the icon for the trophy title. */
  trophyTitleIconUrl: string;

  /**
   * The platform this title belongs to. Some games have trophy sets which
   * are shared between multiple platforms (ie. PS4,PSVITA).
   * The platforms in these instances will be comma separated.
   */
  trophyTitlePlatform: string;

  /** Total number of trophies for the title by type. */
  definedTrophies: TrophyCounts;

  /** Individual object for each trophy group returned. */
  trophyGroups: TrophyGroup[];

  /**
   * The title description that this trophy belongs to.
   * This applies to PS3, PS4, and PS Vita titles only.
   */
  trophyTitleDetail?: string;
}
```

```ts
// Usage Example

// Returns all the trophy groups for Astro's Playroom (NPWR20188_00).
const response = await getTitleTrophyGroups(authorization, "NPWR20188_00", {
  npServiceName: "trophy2"
});
```
