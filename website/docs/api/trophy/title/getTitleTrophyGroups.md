# getTitleTrophyGroups

A title may have multiple groups of trophies. This is most commonly seen in games which have DLC expansions where additional trophies are added.

You can call this function for a specific title - using the unique `npCommunicationId` for the title - and you will receive a summary of all the trophy groups associated with the title. This also includes a summary of the number of trophies for the title, broken down by group and grade (gold, silver, etc.).

## Examples

### Get all trophy groups for a PS3 game

```ts
import { getTitleTrophyGroups } from "psn-api";

// "NPWR00867_00" is the title ID for Red Dead Redemption.
const response = await getTitleTrophyGroups(authorization, "NPWR00867_00", {
  npServiceName: "trophy"
});
```

### Get all trophy groups for a PS5 game

```ts
import { getTitleTrophyGroups } from "psn-api";

// "NPWR20188_00" is the title ID for Astro's Playroom.
const response = await getTitleTrophyGroups(authorization, "NPWR20188_00");
```

## Returns

| Name                  | Type                                              | Description                                                                                                                                                                             |
| :-------------------- | :------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trophySetVersion`    | `string`                                          | The current version of the trophy set. Some trophy sets receive updates from the developer.                                                                                             |
| `trophyTitleName`     | `string`                                          | The title name that this trophy belongs to.                                                                                                                                             |
| `trophyTitlePlatform` | `string`                                          | The platform this title belongs to. Some games have trophy sets which are shared between multiple platforms (eg. PS4,PSVITA). The platforms in these instances will be comma-separated. |
| `trophyGroups`        | [`TrophyGroup[]`](../../data-models/trophy-group) | Individual entities for each trophy group associated with the given title.                                                                                                              |
| `trophyTitleDetail`   | `string`                                          | The title description that this trophy belongs to. This is a legacy property that applies to PS3, PS4, and PS Vita titles only.                                                         |

## Parameters

| Name                | Type                                                              | Description                                                                                                                                                                                   |
| :------------------ | :---------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](../../data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](../../../authentication/authenticating-manually) for how to get one.                                                            |
| `npCommunicationId` | `string`                                                          | The unique ID of the game title you wish to retrieve the trophy groups list for.                                                                                                              |
| `options`           | `GetTitleTrophyGroupsOptions`                                     | Most often used to specify an `npServiceName` if you're retrieving entites belonging to a non-PS5 title. Can also be used for pagination or localization options (see Options section below). |

## Options

These are the possible values that can be in the `options` object (the third parameter of the function that uses the `GetTitleTrophyGroupsOptions` type).

| Name              | Type                                                       | Description                                                                                                                                       |
| :---------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npServiceName`   | `"trophy"` \| `"trophy2"`                                  | **`"trophy"` is required for titles belonging to the PS3, PS4, or PS Vita platforms.** `"trophy2"` is used for the PS5 platform, but is optional. |
| `headerOverrides` | [`CallValidHeaders`](../../data-models/call-valid-headers) | Override the headers in the request to the PSN API, such as to change the language.                                                               |

## Source

[trophy/title/getTitleTrophyGroups.ts](https://github.com/achievements-app/psn-api/blob/main/src/trophy/title/getTitleTrophyGroups.ts)
