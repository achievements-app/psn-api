---
sidebar_label: Users
sidebar_position: 3
---

# Users API

## getProfileFromUserName

A call to this function will retrieve the profile of the username being requested. If the user cannot be found (either due to non-existence or privacy settings), an error will be thrown.

:::caution
This is a legacy API endpoint function. If you are just trying to get a user's `accountId`, [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) is recommended instead. This endpoint is here because it can return interesting presence information when the user is playing on a legacy console such as a PS3.
:::

### Examples

#### Look up a user

```ts
import { getProfileFromUserName } from "psn-api";

const response = await getProfileFromUserName(authorization, "xelnia");
```

### Returns

The following properties are contained within a `profile` object that is returned.

| Name                                      | Type                                                                                                                      | Description                                                                                                                                                                                                                                |
| :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onlineId`                                | `string`                                                                                                                  | The account's online username.                                                                                                                                                                                                             |
| `accountId`                               | `string`                                                                                                                  | The account's internal ID value, which can be used for numerous calls to the PSN API.                                                                                                                                                      |
| `npId`                                    | `string`                                                                                                                  |                                                                                                                                                                                                                                            |
| `avatarUrls`                              | `Array<{ size: string; avatarUrl: string; }>`                                                                             |                                                                                                                                                                                                                                            |
| `plus`                                    | `0` or `1`                                                                                                                | Whether or not the account is a PlayStation Plus subscriber.                                                                                                                                                                               |
| `aboutMe`                                 | `string`                                                                                                                  |                                                                                                                                                                                                                                            |
| `languagesUsed`                           | `string[]`                                                                                                                |                                                                                                                                                                                                                                            |
| `trophySummary`                           | `{ level: number; progress: number; earnedTrophies: { bronze: number; silver: number; gold: number; platinum: number; }}` | The account's trophy level, progress towards the next level, and total number of torphies earned by type.                                                                                                                                  |
| `isOfficiallyVerified`                    | `boolean`                                                                                                                 |                                                                                                                                                                                                                                            |
| `personalDetail`                          | `{ firstName: string; lastName: string; profilePictureUrls: Array<{ size: string; profilePictureUrl: string; }>}          |                                                                                                                                                                                                                                            |
| `personalDetailSharing`                   | `string`                                                                                                                  |                                                                                                                                                                                                                                            |
| `personalDetailSharingRequestMessageFlag` | `boolean`                                                                                                                 |                                                                                                                                                                                                                                            |
| `primaryOnlineStatus`                     | `string`                                                                                                                  |                                                                                                                                                                                                                                            |
| `presences`                               | `Array<{ onlineStatus: string; hasBroadcastData: string; lastOnlineDate: string; }>`                                      |                                                                                                                                                                                                                                            |
| `friendRelation`                          | `string`                                                                                                                  |                                                                                                                                                                                                                                            |
| `requestMessageFlag`                      | `boolean`                                                                                                                 |                                                                                                                                                                                                                                            |
| `blocking`                                | `boolean`                                                                                                                 | Whether or not the account is blocked by the retrieving authentication context. For example, if you are using psn-api with _your_ account's access token, and your account has blocked the account you're looking up, this will be `true`. |
| `following`                               | `boolean`                                                                                                                 |                                                                                                                                                                                                                                            |
| `consoleAvailability`                     | `{ availabilityStatus: string; }`                                                                                         |                                                                                                                                                                                                                                            |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                |
| :-------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one. |
| `userName`      | `string`                                                              | The username for the user you wish to retrieve a profile for.                                                              |

### Source

[user/getProfileFromUserName.ts](https://github.com/achievements-app/psn-api/blob/main/src/user/getProfileFromUserName.ts)

---

## getProfileFromAccountId

A call to this function will retrieve some of the profile information of the account ID being requested. If the account's profile cannot be found (either due to non-existence or privacy settings), an error will be thrown.

### Examples

#### Look up a user

```ts
import { getProfileFromAccountId } from "psn-api";

const response = await getProfileFromAccountId(
  authorization,
  "962157895908076652"
);
```

### Returns

The following properties are contained within a `profile` object that is returned.

| Name                   | Type                                    | Description                                                        |
| :--------------------- | :-------------------------------------- | :----------------------------------------------------------------- |
| `onlineId`             | `string`                                | The account's online username.                                     |
| `aboutMe`              | `string`                                |                                                                    |
| `avatars`              | `Array<{ size: string; url: string; }>` |                                                                    |
| `languages`            | `string[]`                              |                                                                    |
| `isPlus`               | `boolean`                               | Whether or not the account is a PlayStation Plus subscriber.       |
| `isOfficiallyVerified` | `boolean`                               |                                                                    |
| `isMe`                 | `boolean`                               | Whether or not the profile is the one linked to the current Npsso. |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                |
| :-------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one. |
| `accountId`     | `string`                                                              | The `accountId` for the user you wish to retrieve a profile for.                                                           |

### Source

[user/getProfileFromAccountId.ts](https://github.com/achievements-app/psn-api/blob/main/src/user/getProfileFromAccountId.ts)

---

## getUserFriendsAccountIds

A call to this function will retrieve the list of friended `accountId` values associated with the given `accountId` parameter. If the friends list cannot be retrieved (either due to the given `accountId` not existing or due to the user's privacy settings), an error will be thrown.

To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used.

### Examples

#### Look up the accounts on your friends list

```ts
import { getUserFriendsAccountIds } from "psn-api";

const response = await getUserFriendsAccountIds(authorization, "me");
```

#### Look up the accounts on another user's friends list

```ts
import { getUserFriendsAccountIds, makeUniversalSearch } from "psn-api";

const searchResponse = await makeUniversalSearch(
  authorization,
  "NeutraLiTe",
  "SocialAllAccounts"
);

const foundAccountId =
  searchResponse.domainResponses[0].results[0].socialMetadata.accountId;

// If this user's friends list is private, this call will throw an error.
const userFriendsAccountIds = await getUserFriendsAccountIds(
  authorization,
  foundAccountId
);
```

### Returns

| Name             | Type       | Description                                                            |
| :--------------- | :--------- | :--------------------------------------------------------------------- |
| `friends`        | `string[]` | The `accountId` values of the users on the target user's friends list. |
| `totalItemCount` | `number`   | The total number of friends on the target user's friends list.         |
| `nextOffset`     | `number`   |                                                                        |
| `previousOffset` | `number`   |                                                                        |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                                                                                                                    |
| :-------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one.                                                                                                     |
| `accountId`     | `string`                                                              | The account whose trophy list is being retrieved. Use `"me"` for the authenticating account. To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used. |

### Options

These are the possible values that can be in the `options` object (the third parameter of the function).

| Name     | Type     | Description                                  |
| :------- | :------- | :------------------------------------------- |
| `limit`  | `number` | Limit the number of trophies returned.       |
| `offset` | `number` | Return trophy data from this result onwards. |

### Source

[user/getUserFriendsAccountIds.ts](https://github.com/achievements-app/psn-api/blob/main/src/user/getUserFriendsAccountIds.ts)

---

## getBasicPresence

A call to this function will retrieve the presence of the accountId being requested. If the user cannot be found (either
due to non-existence or privacy settings), an error will be thrown.

### Examples

#### Get a user's presence

```ts
import { getBasicPresence } from "psn-api";

const response = await getBasicPresence(authorization, "xelnia");
```

### Returns

The following properties are contained within a `basicPresence` object that is returned.

| Name                  | Type                                                                                                                                                     | Description                                                                                                                                     |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `availability`        | `"unavailable" or "availableToPlay"`                                                                                                                     | The account's current availability.                                                                                                             |
| `lastAvailableDate`   | `string`                                                                                                                                                 | The last date the account was available, if it's currently unavailable                                                                          |
| `primaryPlatformInfo` | `{ onlineStatus: "online" or "offline"; platform: "ps4" or "PS5"; lastOnlineDate: string;}`                                                              | Details of the accpunt's primary platform, current status (online or offline), platform type (ps4 or PS5) and date the platform was last online |
| `lastOnlineDate`      | `string`                                                                                                                                                 | Last online date if the account is currently offline                                                                                            |
| `onlineStatus`        | `"offline" or "online"`                                                                                                                                  | Account's current online status                                                                                                                 |
| `platform`            | `string`                                                                                                                                                 | If the account is online, it's current platform                                                                                                 |
| `gameTitleInfoList`   | `{ npTitleId: string; titleName: string; format: "ps4" or "PS5"; launchPlatform: "ps4" or "PS5"; npTitleIconUrl?: string; conceptIconUrl?: string; }[];` | Details about the game the account is currently playing, if applicable                                                                          |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                                                                                                                 |
| :-------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one.                                                                                                  |
| `accountId`     | `string`                                                              | The account whose presence is being retrieved. Use `"me"` for the authenticating account. To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used. |

### Source

[user/getBasicPresence.ts](https://github.com/achievements-app/psn-api/blob/main/src/user/getBasicPresence.ts)

---

## getRecentlyPlayedGames

A call to this function will retrieve a list of recently played games for the user associated with the `accessToken` in
the provided [AuthorizationPayload](/api-docs/data-models/authorization-payload).

### Examples

```ts
import { getRecentlyPlayedGames } from "psn-api";

const recentlyPlayedGames = await getRecentlyPlayedGames(authorization, {
  limit: 10,
  categories: ["ps4_game", "ps5_native_game"]
});
```

### Returns

| Name                                   | Type                                                               | Description                    |
| :------------------------------------- | :----------------------------------------------------------------- | :----------------------------- |
| `data.gameLibraryTitlesRetrieve.games` | [RecentlyPlayedGame](/api-docs/data-models/recently-played-game)[] | List of recently played games. |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                |
| :-------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one. |

### Options

These are the possible values that can be in the `options` object (the second parameter of the function).

| Name         | Type       | Description                                                                                 |
| :----------- | :--------- | :------------------------------------------------------------------------------------------ |
| `limit`      | `number`   | Limit the number of games returned. Defaults to 50.                                         |
| `categories` | `string[]` | Limit the categories of games returned. Valid entries are `ps4_game` and `ps5_native_game`. |

### Source

[graphql/getRecentlyPlayedGames.ts](https://github.com/achievements-app/psn-api/blob/main/src/graphql/getRecentlyPlayedGames.ts)

---

## getUserPlayedGames

A call to this function will retrieve a list of games (ordered by recently played) for a user associated with the `accountId` provided.  
This is similar to [`getRecentlyPlayedGames()`](https://psn-api.achievements.app/api-docs/users#getrecentlyplayedgames),
but allows querying other user's games (if their privacy settings allow it) and returns detailed user playtime info.

### Examples

```ts
import { getUserPlayedGames } from "psn-api";

// May fail if user privacy settings prohibit listing
const userPlayedGames = await getUserPlayedGames(
  authorization,
  "2984038888603282554"
);

// Retrieves list of games from user associated with `authorization.accessToken`.
const myPlayedGames = await getUserPlayedGames(authorization, "me");
```

### Returns

| Name                                 | Type                                                              | Description                                                                                                                                                |
| :----------------------------------- | :---------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `titles`                             | `object[]`                                                        | Individual object for each title returned.                                                                                                                 |
| `titles.titleId`                     | `string`                                                          | Id for the specific version of the game played by the user. <br /> **Example:** `"CUSA01433_00"`                                                           |
| `titles.name`                        | `string`                                                          | Name of the game. <br /> **Example:** `"Rocket League®"`                                                                                                   |
| `titles.localizedName`               | `string`                                                          | Name of the game (localized). <br /> **Example:** `"Rocket League®"`                                                                                       |
| `titles.imageUrl`                    | `string`                                                          | URL for the game icon. <br /> **Example:** `"https://image..."`                                                                                            |
| `titles.localizedImageUrl`           | `string`                                                          | URL for the game icon (localized). <br /> **Example:** `"https://image..."`                                                                                |
| `titles.category`                    | `"ps4_game" \| "ps5_native_game" \| "pspc_game" \| "unknown"`     | Type of game. <br /> **Example:** `"ps4_game"`                                                                                                             |
| `titles.service`                     | `"none" \| "none_purchased" \| "ps_plus"`                         | Is the game owned outright, or via a service entitlement. <br /> **Example:** `"none"`                                                                     |
| `titles.playCount`                   | `number`                                                          | Number of times the game has been played. <br /> **Example:** `100`                                                                                        |
| `titles.concept`                     | `object`                                                          | The concept is a single identifier for the various versions of a game.                                                                                     |
| `titles.concept.id`                  | `number`                                                          | Identifier for the concept. <br /> **Example:** `10009763`                                                                                                 |
| `titles.concept.titleIds`            | `string[]`                                                        | Various Title Ids for this game. <br /> **Example:** `["PPSA20599_00", "PPSA20549_00"]`                                                                    |
| `titles.concept.name`                | `string`                                                          | Name of the game concept. <br /> **Example:** `"Zenless Zone Zero"`                                                                                        |
| `titles.concept.media`               | `{ audios: any[]; videos: any[]; images: Image[] }`               | Media related to the game concept, including images, videos, and audios.                                                                                   |
| `titles.concept.media.images`        | `{ url: string; format: string; type: string }[]`                 | Array of images associated with the game concept.                                                                                                          |
| `titles.concept.media.images.url`    | `string`                                                          | URL of the image. <br /> **Example:** `"https://image.api.playstation.com/vulcan/ap/rnd/202405/2210/4126b58375cb32a51dfdbfde8637daae8b971c3b10c3bc80.jpg"` |
| `titles.concept.media.images.format` | `string`                                                          | Format of the image. <br /> **Example:** `"UNKNOWN"`                                                                                                       |
| `titles.concept.media.images.type`   | `string`                                                          | Type of the image. <br /> **Example:** `"FOUR_BY_THREE_BANNER"`                                                                                            |
| `titles.media`                       | `{ screenshotUrl?: string; [key: string]: string \| undefined; }` | This object contains various URLs for screenshots and other media associated with the game. <br /> **Example:** `{ screenshotUrl: "https://image..." }`    |
| `titles.media.screenshotUrl`         | `string`                                                          | Screenshot URL. <br /> **Example:** `"https://image..."`                                                                                                   |
| `titles.firstPlayedDateTime`         | `string`                                                          | Date the game was first played. <br /> **Example:** `"2015-07-10T19:40:19Z"`                                                                               |
| `titles.lastPlayedDateTime`          | `string`                                                          | Date the game was most recently played. <br /> **Example:** `"2024-08-03T19:28:27.12Z"`                                                                    |
| `titles.playDuration`                | `string`                                                          | Time played accurate to 1 second. <br /> **Example:** `"PT228H56M33S"`                                                                                     |
| `totalItemCount`                     | `number`                                                          | The total number of game titles for this account. <br /> **Example:** `300`                                                                                |
| `nextOffset`                         | `number`                                                          | Pagination info. <br /> **Example:** `20`                                                                                                                  |
| `previousOffset`                     | `number`                                                          | Pagination info. <br /> **Example:** `299`                                                                                                                 |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                                                                                                                  |
| :-------------- | :-------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one.                                                                                                   |
| `accountId`     | `string`                                                              | The account whose game list is being retrieved. Use `"me"` for the authenticating account. To find a user's `accountId`, the [`makeUniversalSearch()`](/api-docs/universal-search#makeuniversalsearch) function can be used. |

### Options

These are the possible values that can be in the `options` object (the third parameter of the function).

| Name         | Type     | Description                                                                                          |
| :----------- | :------- | :--------------------------------------------------------------------------------------------------- |
| `categories` | `string` | Comma separed list of platforms. <br /> **Example:** "ps4_game, ps5_native_game, pspc_game, unknown" |
| `limit`      | `number` | Limit the number of games returned.                                                                  |
| `offset`     | `number` | Return game list data from this result onwards.                                                      |

### Source

[user/getUserPlayedGames.ts](https://github.com/achievements-app/psn-api/blob/main/src/user/getUserPlayedGames.ts)
