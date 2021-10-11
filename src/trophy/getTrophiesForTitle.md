# getTrophiesForTitle

```ts
/**
 * A request to this URL will retrieve the individual trophy detail of a
 * single - or all - trophy groups for a title. A title can have multiple
 * groups of trophies (a `default` group which all titles have, and additional
 * groups named `"001"` incrementing for each additional group). To retrieve
 * trophies from all groups within a title (ie. the full trophy set) then
 * `trophyGroupId` should be set to all.
 *
 * When the title platform is PS3, PS4 or PS Vita you __must__ specify the
 * `npServiceName` parameter as `"trophy"`.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param npCommunicationId Unique ID of the title.
 * @param trophyGroupId `"all"` to return all trophies for the title, otherwise restrict results to a specific trophy group (such as a DLC).
 * @param options.npServiceName `"trophy"` for PS3, PS4, or PS Vita platforms. `"trophy2"` for the PS5 platform.
 * @param options.limit Limit the number of trophies returned.
 * @param options.offset Return trophy data from this result onwards.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getTrophiesForTitle = async (
  authorization: AuthorizationPayload,
  npCommunicationId: string,
  trophyGroupId: string,
  options?: Partial<GetTrophiesForTitleOptions>
): Promise<TitleTrophiesResponse> => { ... }
```

```ts
interface TitleTrophiesResponse {
  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  /** `true` if this title has additional trophy groups. */
  hasTrophyGroups: boolean;

  /** Individual object for each trophy. */
  trophies: Trophy[];

  /** Total trophies in the group (or total trophies for the title if `"all"` specified) */
  totalItemCount: number;

  nextOffset?: number;
  previousOffset?: number;
}
```

```ts
// Usage example

// Returns a list of all trophies for all groups of Astro's Playroom.
// This response contains extended metadata for each trophy.
const response = await getTrophiesForTitle(
  authorization,
  "NPWR20188_00",
  "all",
  { npServiceName: "trophy2" }
);
```
