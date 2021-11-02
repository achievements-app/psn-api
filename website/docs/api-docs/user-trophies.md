---
sidebar_label: User Trophies
sidebar_position: 4
---

# User Trophies API

## getUserTrophyGroupEarningsForTitle

A call to this function will retrieve a summary of the trophies earned for a user broken down by trophy group within a title. A title can have multiple groups of trophies (a `"default"` group which all titles have, and additional groups beginning with the name `"001"` and incrementing for each additional group).

The numeric `accountId` can be that of any PSN account for which your authentication context has permissions to view.

When querying the titles associated with yourself (the authentication context), the numeric `accountId` can be substituted with `"me"`. To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used.

Only the earned status of the trophy is returned. No additional descriptive metadata (ie. trophy name, trophy description) is given. Use [`getTitleTrophies()`](/api-docs/title-trophies#gettitletrophies) to obtain this information.

**When the title platform is PS3, PS4, or PS Vita you _must_ specify the `npServiceName` option as `"trophy"`.**

If you attempt to query a title which the user does not have associated with their account (ie. the title has not been launched and allowed to sync at least once), then a Resource Not Found error will be thrown.

### Examples

#### Get your trophy group earnings for a PS3 game

```ts
import { getUserTrophyGroupEarningsForTitle } from "psn-api";

const response = await getUserTrophyGroupEarningsForTitle(
  authorization,
  "me",
  "NPWR00867_00", // Red Dead Redemption
  { npServiceName: "trophy" }
);
```

#### Get your trophy group earnings for a PS5 game

```ts
import { getUserTrophyGroupEarningsForTitle } from "psn-api";

const response = await getUserTrophyGroupEarningsForTitle(
  authorization,
  "me",
  "NPWR20188_00" // Astro's Playroom
);
```

### Returns

| Name                  | Type                                                                   | Description                                                                                                                                                                                         |
| :-------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trophySetVersion`    | `string`                                                               | The current version of the trophy set. Some trophy sets receive updates from the developer.                                                                                                         |
| `hiddenFlag`          | `boolean`                                                              | `true` is the title has been hidden on the account's trophy list. This applies only to the current authentication context. The title will not be returned if it has been hidden on another account. |
| `progress`            | `number`                                                               | The account's percentage of trophies earned for the title.                                                                                                                                          |
| `earnedTrophies`      | [`TrophyCounts`](/api-docs/data-models/trophy-counts)                  | The account's number of earned trophies for the title by grade.                                                                                                                                     |
| `trophyGroups`        | [`TrophyGroupEarnings[]`](/api-docs/data-models/trophy-group-earnings) | The trophy group entities for the individual trophy groups earned.                                                                                                                                  |
| `lastUpdatedDateTime` | `string`                                                               | An ISO 8601 string representing the date the title progress was updated (such as when a trophy was earned for a group). ex- `"2021-08-15T21:22:08Z"`                                                |

### Parameters

| Name                | Type                                                                  | Description                                                                                                                                                                                                                    |
| :------------------ | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one.                                                                                                     |
| `accountId`         | `string`                                                              | The account whose trophy list is being retrieved. Use `"me"` for the authenticating account. To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used. |
| `npCommunicationId` | `string`                                                              | The unique ID of the game title you wish to retrieve the user trophy group earnings for.                                                                                                                                       |
| `options`           | `GetUserTrophyGroupEarningsForTitleOptions`                           | Most often used to specify an `npServiceName` if you're retrieving entities belonging to a non-PS5 title. Can also be used for pagination and/or localization options (see Options section below).                             |

### Options

| Name              | Type                                                           | Description                                                                                                                                       |
| :---------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npServiceName`   | `"trophy"` \| `"trophy2"`                                      | **`"trophy"` is required for titles belonging to the PS3, PS4, or PS Vita platforms.** `"trophy2"` is used for the PS5 platform, but is optional. |
| `headerOverrides` | [`CallValidHeaders`](/api-docs/data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language.                                                               |

### Source

[trophy/title/getUserTrophyGroupEarningsForTitle.ts](https://github.com/achievements-app/psn-api/blob/main/src/trophy/user/getUserTrophyGroupEarningsForTitle.ts)

---

## getUserTitles

A call to this function will retrieve the earned status of trophies for a user from either a single - or all - trophy groups in a title. A title can have multiple groups of trophies (a `"default"` group which all titles have, and additional groups starting with a name of `"001"` and incrementing for each additional group). To retrieve trophies from all groups within a title (ie. the full trophy set), `trophyGroupId` should be set to `"all"`.

The numeric `accountId` can be that of any PSN account for which the authenticating account has permissions to view the trophy list. When querying the titles associated with the authenticating account, the numeric `accountId` can be substituted with `"me"`. To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used.

Included in the information returned is the titles' unique `npCommunicationId`. This is required to make use of subsequent functions for requesting more specific detail about a title's trophies.

The results are presented in order of the `lastUpdatedDateTime` for the title, so the first result will be the title for which a trophy was most recently earned (or synced for the first time in the case of a game with 0% progress).

### Examples

#### Get your complete game list from PSN

```ts
import { getUserTitles } from "psn-api";

const response = await getUserTitles(authorization, "me");
```

### Returns

| Name             | Type                                                  | Description                                                     |
| :--------------- | :---------------------------------------------------- | :-------------------------------------------------------------- |
| `trophyTitles`   | [`TrophyTitle[]`](/api-docs/data-models/trophy-title) | The list of games played by the user.                           |
| `totalItemCount` | `number`                                              | The number of `TrophyTitle` entities returned from the PSN API. |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                                                                                                                   |
| :-------------- | :-------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one.                                                                                                    |
| `accountId`     | `string`                                                              | The account whose title list is being retrieved. Use `"me"` for the authenticating account. To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used. |
| `options`       | `GetUserTitlesOptions`                                                | Used for pagination and/or localization options (see Options section below).                                                                                                                                                  |

### Options

| Name              | Type                                                           | Description                                                                         |
| :---------------- | :------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `headerOverrides` | [`CallValidHeaders`](/api-docs/data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language. |
| `limit`           | `number`                                                       | Limit the number of trophies returned.                                              |
| `offset`          | `number`                                                       | Return trophy data from this result onwards.                                        |

### Source

[trophy/user/getUserTitles.ts](https://github.com/achievements-app/psn-api/blob/main/src/trophy/user/getUserTitles.ts)

---

## getUserTrophiesEarnedForTitle

A call to this function will retrieve the earned status of trophies for a user from either a single - or all - trophy groups in a title. A title can have multiple groups of trphies (a `"default"` group which all titles have, and additional groups starting with a name of `"001"` and incrementing for each additional group). To retrieve trophies from all groups within a title (ie. the full trophy set), then `trophyGroupId` should be set to `"all"`.

The numeric `accountId` can be that of any PSN account for which the authenticating account has permissions to view the trophy list. When querying the titles associated with the authenticating account, the numeric `accountId` can be substituted with `"me"`. To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used.

This function returns the earned status of the trophy only and no additional descriptive metadata (ie. trophy name, trophy description). Use [`getTitleTrophies()`](/api-docs/title-trophies#gettitletrophies) to obtain this information.

**When the title platform is PS3, PS4, or PS Vita, you _must_ specify the `npServiceName` option as `"trophy"`.**

If you attempt to query a title which the user does not have associated with their account (ie. the title has not been launched and allowed to sync at least once), then a Resource Not Found error will be thrown.

### Examples

#### Get your list of earned trophies for a PS3 game

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

#### Get your list of earned trophies for a PS5 game

```ts
import { getUserTrophiesEarnedForTitle } from "psn-api";

const response = getUserTrophiesEarnedForTitle(
  authorization,
  "me",
  "NPWR20188_00", // Astro's Playroom
  "all"
);
```

### Returns

| Name                  | Type                                                             | Description                                                                                                                                                                                                                                                              |
| :-------------------- | :--------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trophySetVersion`    | `string`                                                         | The current version of the trophy set. Some trophy sets receive updates from the developer.                                                                                                                                                                              |
| `hasTrophyGroups`     | `boolean`                                                        | `true` if this title has additional trophy groups beyond the required `"default"` group.                                                                                                                                                                                 |
| `lastUpdatedDateTime` | `string`                                                         | An ISO 8601 string representing the date of the user's most recent trophy earned for the title. ex- `"2021-08-15T21:22:08Z"`                                                                                                                                             |
| `trophies`            | [`UserThinTrophy[]`](/api-docs/data-models/user-thin-trophy)     | Individual object for each trophy.                                                                                                                                                                                                                                       |
| `totalItemCount`      | `number`                                                         | Total trophies in the group (or total trophies for the title if `"all"` is specified).                                                                                                                                                                                   |
| `rarestTrophies`      | [`RarestThinTrophy[]`](/api-docs/data-models/rarest-thin-trophy) | An array which contains the trophy where `earned` is `true` with the lowest `trophyEarnedRate`. If multiple trophies have the same `trophyEarnedRate`, the array contains those trophies instead of just a single trophy. It contains nothing if no trophies are earned. |
| `nextOffset`          | `number`                                                         |                                                                                                                                                                                                                                                                          |
| `previousOffset`      | `number`                                                         |                                                                                                                                                                                                                                                                          |

### Parameters

| Name                | Type                                                                  | Description                                                                                                                                                                                        |
| :------------------ | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one.                                                                         |
| `accountId`         | `string`                                                              | The account whose title list is being retrieved. Use `"me"` for the authenticating account.                                                                                                        |
| `npCommunicationId` | `string`                                                              | The unique ID of the game title you wish to retrieve the user trophy group earnings for.                                                                                                           |
| `options`           | `GetUserTrophiesEarnedForTitleOptions`                                | Most often used to specify an `npServiceName` if you're retrieving entities belonging to a non-PS5 title. Can also be used for pagination and/or localization options (see Options section below). |

### Options

| Name              | Type                                                           | Description                                                                                                                                       |
| :---------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npServiceName`   | `"trophy"` \| `"trophy2"`                                      | **`"trophy"` is required for titles belonging to the PS3, PS4, or PS Vita platforms.** `"trophy2"` is used for the PS5 platform, but is optional. |
| `headerOverrides` | [`CallValidHeaders`](/api-docs/data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language.                                                               |
| `limit`           | `number`                                                       | Limit the number of trophies returned.                                                                                                            |
| `offset`          | `number`                                                       | Return trophy data from this result onwards.                                                                                                      |

### Source

[trophy/user/getUserTrophiesEarnedForTitle.ts](https://github.com/achievements-app/psn-api/blob/main/src/trophy/user/getUserTrophiesEarnedForTitle.ts)

---

## getUserTrophyProfileSummary

A call to this function will retrieve an overall summary of the number of trophies earned for a user broken down by grade, as well as their current overall trophy level, progress towards the next level, and which tier their current level falls in to. The tiers are based on the [level changes introduced in 2020](https://andshrew.github.io/PlayStation-Trophies/images/psn-trophy-tiers.png).

The numeric `accountId` can be that of any PSN account for which the authenticating account has permissions to view the trophy list.

When querying the titles associated with the authenticating account, the numeric `accountId` can be substituted with `"me"`. To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used.

### Examples

#### Get your profile summary

```ts
import { getUserTrophyProfileSummary } from "psn-api";

const response = await getUserTrophyProfileSummary(authorization, "me");
```

### Returns

| Name             | Type                                                  | Description                                                      |
| :--------------- | :---------------------------------------------------- | :--------------------------------------------------------------- |
| `accountId`      | `string`                                              | The ID of the account being accessed.                            |
| `trophyLevel`    | `string`                                              | The account's overall trophy level.                              |
| `progress`       | `number`                                              | The account's percentage progress towards the next trophy level. |
| `tier`           | `number`                                              | The tier this user's trophy level is in, ranging from 1 to 10.   |
| `earnedTrophies` | [`TrophyCounts`](/api-docs/data-models/trophy-counts) | The account's number of earned trophies by grade.                |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                |
| :-------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one. |
| `accountId`     | `string`                                                              | The account whose title list is being retrieved. Use `"me"` for the authenticating account.                                |
| `options`       | `GetUserTrophyProfileSummaryOptions`                                  | Used for localization options (see Options section below).                                                                 |

### Options

| Name              | Type                                                           | Description                                                                         |
| :---------------- | :------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `headerOverrides` | [`CallValidHeaders`](/api-docs/data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language. |

### Source

[trophy/user/getUserTrophyProfileSummary](https://github.com/achievements-app/psn-api/blob/main/src/trophy/user/getUserTrophyProfileSummary.ts)
