# getUserTrophiesEarnedForTitle

A call to this function will retrieve the earned status of trophies for a user from either a single - or all - trophy groups in a title. A title can have multiple groups of trphies (a `"default"` group which all titles have, and additional groups starting with a name of `"001"` and incrementing for each additional group). To retrieve trophies from all groups within a title (ie. the full trophy set), then `trophyGroupId` should be set to `"all"`.

The numeric `accountId` can be that of any PSN account for which the authenticating account has permissions to view the trophy list. When querying the titles associated with the authenticating account, the numeric `accountId` can be substituted with `"me"`.

This function returns the earned status of the trophy only and no additional descriptive metadata (ie. trophy name, trophy description). Use [`getTitleTrophies()`](../title/getTitleTrophies) to obtain this information.

**When the title platform is PS3, PS4, or PS Vita, you _must_ specify the `npServiceName` option as `"trophy"`.**

If you attempt to query a title which the user does not have associated with their account (ie. the title has not been launched and allowed to sync at least once), then a Resource Not Found error will be thrown.

## Examples

### Get your list of earned trophies for a PS3 game

```ts
import { getUserTrophiesEarnedForTitle } from "psn-api";

const response = getUserTrophiesEarnedForTitle(
  authorization,
  "me",
  "NPWR00867_00", // Red Dead Redemption
  "all",
  { npServiceName: "trophy" }
);
```

### Get your list of earned trophies for a PS5 game

```ts
import { getUserTrophiesEarnedForTitle } from "psn-api";

const response = getUserTrophiesEarnedForTitle(
  authorization,
  "me",
  "NPWR20188_00", // Astro's Playroom
  "all"
);
```

## Returns

| Name                  | Type                                                         | Description                                                                                                                                                                                                                                                              |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trophySetVersion`    | `string`                                                     | The current version of the trophy set. Some trophy sets receive updates from the developer.                                                                                                                                                                              |
| `hasTrophyGroups`     | `boolean`                                                    | `true` if this title has additional trophy groups beyond the required `"default"` group.                                                                                                                                                                                 |
| `lastUpdatedDateTime` | `string`                                                     | An ISO 8601 string representing the date of the user's most recent trophy earned for the title. ex- `"2021-08-15T21:22:08Z"`                                                                                                                                             |
| `trophies`            | [`UserThinTrophy[]`](../../data-models/user-thin-trophy)     | Individual object for each trophy.                                                                                                                                                                                                                                       |
| `totalItemCount`      | `number`                                                     | Total trophies in the group (or total trophies for the title if `"all"` is specified).                                                                                                                                                                                   |
| `rarestTrophies`      | [`RarestThinTrophy[]`](../../data-models/rarest-thin-trophy) | An array which contains the trophy where `earned` is `true` with the lowest `trophyEarnedRate`. If multiple trophies have the same `trophyEarnedRate`, the array contains those trophies instead of just a single trophy. It contains nothing if no trophies are earned. |
| `nextOffset`          | `number`                                                     |                                                                                                                                                                                                                                                                          |
| `previousOffset`      | `number`                                                     |                                                                                                                                                                                                                                                                          |

## Parameters

| Name                | Type                                                              | Description                                                                                                                                                                                        |
| :------------------ | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](../../data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](../../../authentication/authenticating-manually) for how to get one.                                                                 |
| `accountId`         | `string`                                                          | The account whose title list is being retrieved. Use `"me"` for the authenticating account.                                                                                                        |
| `npCommunicationId` | `string`                                                          | The unique ID of the game title you wish to retrieve the summarized user trophy group earnings for.                                                                                                |
| `options`           | `GetUserTrophiesEarnedForTitleOptions`                            | Most often used to specify an `npServiceName` if you're retrieving entities belonging to a non-PS5 title. Can also be used for pagination and/or localization options (see Options section below). |

## Options

| Name              | Type                                                       | Description                                                                                                                                       |
| :---------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npServiceName`   | `"trophy"` \| `"trophy2"`                                  | **`"trophy"` is required for titles belonging to the PS3, PS4, or PS Vita platforms.** `"trophy2"` is used for the PS5 platform, but is optional. |
| `headerOverrides` | [`CallValidHeaders`](../../data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language.                                                               |
| `limit`           | `number`                                                   | Limit the number of trophies returned.                                                                                                            |
| `offset`          | `number`                                                   | Return trophy data from this result onwards.                                                                                                      |

## Source

[trophy/user/getUserTrophiesEarnedForTitle.ts](https://github.com/achievements-app/psn-api/blob/main/src/trophy/user/getUserTrophiesEarnedForTitle.ts)
