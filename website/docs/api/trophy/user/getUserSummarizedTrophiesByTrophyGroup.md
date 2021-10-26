# getUserSummarizedTrophiesByTrophyGroup

A call to this function will retrieve a summary of the trophies earned for a user broken down by trophy group within a title. A title can have multiple groups of trophies (a `"default"` group which all titles have, and additional groups beginning with the name `"001"` and incrementing for each additional group).

The numeric `accountId` can be that of any PSN account for which your authentication context has permissions to view.

When querying the titles associated with yourself (the authentication context), the numeric `accountId` can be substituted with `"me"`.

Only the earned status of the trophy is returned. No additional descriptive metadata (ie. trophy name, trophy description) is given. Use [`getTitleTrophies()`](../title/getTitleTrophies) to obtain this information.

**When the title platform is PS3, PS4, or PS Vita you _must_ specify the `npServiceName` option as `"trophy"`.**

If you attempt to query a title which the user does not have associated with their account (ie. the title has not been launched and allowed to sync at least once), then a Resource Not Found error will be thrown.

## Examples

### Get your summarized trophies for a PS3 game

```ts
import { getUserSummarizedTophiesByTrophyGroup } from "psn-api";

const response = await getUserSummarizedTrophiesByTrophyGroup(
  authorization,
  "me",
  "NPWR00867_00", // Red Dead Redemption
  { npServiceName: "trophy" }
);
```

### Get your summarized trophies for a PS5 game

```ts
import { getUserSummarizedTophiesByTrophyGroup } from "psn-api";

const response = await getUserSummarizedTrophiesByTrophyGroup(
  authorization,
  "me",
  "NPWR20188_00" // Astro's Playroom
);
```

## Returns

| Name                  | Type                                                               | Description                                                                                                                                                                                         |
| :-------------------- | :----------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trophySetVersion`    | `string`                                                           | The current version of the trophy set. Some trophy sets receive updates from the developer.                                                                                                         |
| `hiddenFlag`          | `boolean`                                                          | `true` is the title has been hidden on the account's trophy list. This applies only to the current authentication context. The title will not be returned if it has been hidden on another account. |
| `progress`            | `number`                                                           | The account's percentage of trophies earned for the title.                                                                                                                                          |
| `earnedTrophies`      | [`TrophyCounts`](../../data-models/trophy-counts)                  | The account's number of earned trophies for the title by grade.                                                                                                                                     |
| `trophyGroups`        | [`TrophyGroupEarnings[]`](../../data-models/trophy-group-earnings) | The trophy group entities for the                                                                                                                                                                   |
| `lastUpdatedDateTime` | `string`                                                           | An ISO 8601 string representing the date the title progress was updated (such as when a trophy was earned for a group). ex- `"2021-08-15T21:22:08Z"`                                                |

## Parameters

| Name                | Type                                                              | Description                                                                                                                                                                                        |
| :------------------ | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](../../data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](../../../authentication/authenticating-manually) for how to get one.                                                                 |
| `accountId`         | `string`                                                          | The account whose trophy list is being retrieved. Use `"me"` for the authenticating account.                                                                                                       |
| `npCommunicationId` | `string`                                                          | The unique ID of the game title you wish to retrieve the summarized user trophy group earnings for.                                                                                                |
| `options`           | `GetUserSummarizedTrophiesByTrophyGroupOptions`                   | Most often used to specify an `npServiceName` if you're retrieving entities belonging to a non-PS5 title. Can also be used for pagination and/or localization options (see Options section below). |

## Options

| Name              | Type                                                       | Description                                                                                                                                       |
| :---------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npServiceName`   | `"trophy"` \| `"trophy2"`                                  | **`"trophy"` is required for titles belonging to the PS3, PS4, or PS Vita platforms.** `"trophy2"` is used for the PS5 platform, but is optional. |
| `headerOverrides` | [`CallValidHeaders`](../../data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language.                                                               |

## Source

[trophy/title/getUserSummarizedTrophiesByTrophyGroup.ts](https://github.com/achievements-app/psn-api/blob/main/src/trophy/title/getUserSummarizedTrophiesByTrophyGroup.ts)
