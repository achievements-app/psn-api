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
| `options`       | `GetProfileFromAccountIdOptions`                                      | Can be used to specify `headerOverrides`.                                                                                  |

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
