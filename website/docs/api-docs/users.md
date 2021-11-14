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
