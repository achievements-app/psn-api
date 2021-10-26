# getUserTitles

A call to this function will retrieve the earned status of trophies for a user from either a single - or all - trophy groups in a title. A title can have multiple groups of trophies (a `"default"` group which all titles have, and additional groups starting with a name of `"001"` and incrementing for each additional group). To retrieve trophies from all groups within a title (ie. the full trophy set), `trophyGroupId` should be set to `"all"`.

The numeric `accountId` can be that of any PSN account for which the authenticating account has permissions to view the trophy list. When querying the titles associated with the authenticating account, the numeric `accountId` can be substituted with `"me"`.

Included in the information returned is the titles' unique `npCommunicationId`. This is required to make use of subsequent functions for requesting more specific detail about a title's trophies.

The results are presented in order of the `lastUpdatedDateTime` for the title, so the first result will be the title for which a trophy was most recently earned (or synced for the first time in the case of a game with 0% progress).

## Examples

### Get your complete game list from PSN

```ts
import { getUserTitles } from "psn-api";

const response = await getUserTitles(authorization, "me");
```

## Returns

| Name             | Type                                              | Description                                                     |
| :--------------- | :------------------------------------------------ | :-------------------------------------------------------------- |
| `trophyTitles`   | [`TrophyTitle[]`](../../data-models/trophy-title) | The list of games played by the user.                           |
| `totalItemCount` | `number`                                          | The number of `TrophyTitle` entities returned from the PSN API. |

## Parameters

| Name            | Type                                                              | Description                                                                                                                        |
| :-------------- | :---------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](../../data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](../../../authentication/authenticating-manually) for how to get one. |
| `accountId`     | `string`                                                          | The account whose title list is being retrieved. Use `"me"` for the authenticating account.                                        |
| `options`       | `GetUserTitlesOptions`                                            | Used for pagination and/or localization options (see Options section below).                                                       |

## Options

| Name              | Type                                                       | Description                                                                         |
| :---------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `headerOverrides` | [`CallValidHeaders`](../../data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language. |
| `limit`           | `number`                                                   | Limit the number of trophies returned.                                              |
| `offset`          | `number`                                                   | Return trophy data from this result onwards.                                        |

## Source

[trophy/user/getUserTitles.ts](https://github.com/achievements-app/psn-api/blob/main/src/trophy/user/getUserTitles.ts)
