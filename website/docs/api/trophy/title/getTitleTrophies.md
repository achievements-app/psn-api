# getTitleTrophies

A call to this function will retrieve the trophy list of a single - or all - trophy groups for a title. A title can have multiple groups of trophies (a `"default"` group which all titles have, and additional groups starting with the name `"001"` and incrementing for each additional group). To retrieve trophies from all groups within a title (ie. the full trophy set), then `trophyGroupId` should be set to `"all"`.

When the title platform is PS3, PS4, or PS Vita you _must_ specify the `npServiceName` parameter as `"trophy"`.

## Examples

### Get all trophies for a PS3 game

```ts
import { getTitleTrophies } from "psn-api";

// "NPWR00867_00" is the title ID for Red Dead Redemption.
const response = await getTitleTrophies(authorization, "NPWR00867_00", "all", {
  npServiceName: "trophy"
});
```

### Get all trophies for a PS5 game

```ts
import { getTitleTrophies } from "psn-api";

// "NPWR20188_00" is the title ID for Astro's Playroom.
const response = await getTitleTrophies(authorization, "NPWR20188_00", "all");
```

## Returns

| Name               | Type                                                       | Description                                                                                                                                                                                                |
| :----------------- | :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trophySetVersion` | `string`                                                   | The current version of the trophy set. Some trophy sets receive updates from the developer.                                                                                                                |
| `hasTrophyGroups`  | `boolean`                                                  | `true` if this title has additional trophy groups. This is commonly used for DLC, but some games add additional trophies as separate groups post-release (such as Astro's Playroom and Horizon Zero Dawn). |
| `trophies`         | [`TitleThinTrophy[]`](../../data-models/title-thin-trophy) | Individual object for each trophy.                                                                                                                                                                         |
| `totalItemCount`   | `number`                                                   | Total trophies in the group (or total trophies for the title if `"all"` specified).                                                                                                                        |
| `nextOffset`       | `number`                                                   |                                                                                                                                                                                                            |
| `previousOffset`   | `number`                                                   |                                                                                                                                                                                                            |

## Parameters

| Name                | Type                                                              | Description                                                                                                                                                                                   |
| :------------------ | :---------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](../../data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](../../../authentication/authenticating-manually) for how to get one.                                                            |
| `npCommunicationId` | `string`                                                          | The unique ID of the game title you wish to retrieve the trophy list for.                                                                                                                     |
| `trophyGroupId`     | `string`                                                          | `"all"` to return all trophies for the title, otherwise restrict results to a specific trophy group (such as a DLC).                                                                          |
| `options`           | `GetTitleTrophiesOptions`                                         | Most often used to specify an `npServiceName` if you're retrieving entites belonging to a non-PS5 title. Can also be used for pagination or localization options (see Options section below). |

## Options

These are the possible values that can be in the `options` object (the fourth parameter of the function that uses the `GetTitleTrophiesOptions` type).

| Name              | Type                                                       | Description                                                                                                                                       |
| :---------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npServiceName`   | `"trophy"` \| `"trophy2"`                                  | **`"trophy"` is required for titles belonging to the PS3, PS4, or PS Vita platforms.** `"trophy2"` is used for the PS5 platform, but is optional. |
| `limit`           | `number`                                                   | Limit the number of trophies returned.                                                                                                            |
| `offset`          | `number`                                                   | Return trophy data from this result onwards.                                                                                                      |
| `headerOverrides` | [`CallValidHeaders`](../../data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language.                                                               |

## Source

[trophy/title/getTitleTrophies.ts](https://github.com/achievements-app/psn-api/blob/main/src/trophy/title/getTitleTrophies.ts)
