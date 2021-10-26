# getUserTrophyProfileSummary

A call to this function will retrieve an overall summary of the number of trophies earned for a user broken down by grade, as well as their current overall trophy level, progress towards the next level, and which tier their current level falls in to. The tiers are based on the [level changes introduced in 2020](https://andshrew.github.io/PlayStation-Trophies/images/psn-trophy-tiers.png).

The numeric `accountId` can be that of any PSN account for which the authenticating account has permissions to view the trophy list.

When querying the titles associated with the authenticating account, the numeric `accountId` can be substituted with `"me"`.

## Examples

### Get your profile summary

```ts
import { getUserTrophyProfileSummary } from "psn-api";

const response = await getUserTrophyProfileSummary(authorization, "me");
```

## Returns

| Name             | Type                                              | Description                                                      |
| :--------------- | :------------------------------------------------ | :--------------------------------------------------------------- |
| `accountId`      | `string`                                          | The ID of the account being accessed.                            |
| `trophyLevel`    | `string`                                          | The account's overall trophy level.                              |
| `progress`       | `number`                                          | The account's percentage progress towards the next trophy level. |
| `tier`           | `number`                                          | The tier this user's trophy level is in, ranging from 1 to 10.   |
| `earnedTrophies` | [`TrophyCounts`](../../data-models/trophy-counts) | The account's number of earned trophies by grade.                |

## Parameters

| Name            | Type                                                              | Description                                                                                                                        |
| :-------------- | :---------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](../../data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](../../../authentication/authenticating-manually) for how to get one. |
| `accountId`     | `string`                                                          | The account whose title list is being retrieved. Use `"me"` for the authenticating account.                                        |
| `options`       | `GetUserTrophyProfileSummaryOptions`                              | Used for localization options (see Options section below).                                                                         |

## Options

| Name              | Type                                                       | Description                                                                         |
| :---------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `headerOverrides` | [`CallValidHeaders`](../../data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language. |

## Source

[trophy/user/getUserTrophyProfileSummary](https://github.com/achievements-app/psn-api/blob/main/src/trophy/user/getUserTrophyProfileSummary.ts)
