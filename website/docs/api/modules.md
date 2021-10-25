---
id: "modules"
title: "psn-api"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [TrophyRarity](enums/TrophyRarity)

## Interfaces

- [AccessTokenResponse](interfaces/AccessTokenResponse)
- [AllCallOptions](interfaces/AllCallOptions)
- [AuthorizationPayload](interfaces/AuthorizationPayload)
- [CallValidHeaders](interfaces/CallValidHeaders)
- [TitleTrophiesResponse](interfaces/TitleTrophiesResponse)
- [TitleTrophyGroupsResponse](interfaces/TitleTrophyGroupsResponse)
- [Trophy](interfaces/Trophy)
- [TrophyCounts](interfaces/TrophyCounts)
- [TrophyTitle](interfaces/TrophyTitle)
- [UserSummarizedTrophiesByTrophyGroupResponse](interfaces/UserSummarizedTrophiesByTrophyGroupResponse)
- [UserTitlesResponse](interfaces/UserTitlesResponse)
- [UserTrophiesEarnedForTitleResponse](interfaces/UserTrophiesEarnedForTitleResponse)
- [UserTrophyProfileSummaryResponse](interfaces/UserTrophyProfileSummaryResponse)

## Type aliases

### TitlePlatform

Ƭ **TitlePlatform**: `"PS5"` \| `"PS4"` \| `"PS3"` \| `"Vita"`

#### Defined in

[models/title-platform.model.ts:1](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-platform.model.ts#L1)

## Functions

### call

▸ `Const` **call**<`T`\>(`config`, `authorization`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name              | Type                                                      |
| :---------------- | :-------------------------------------------------------- |
| `config`          | `Object`                                                  |
| `config.headers?` | [`CallValidHeaders`](interfaces/CallValidHeaders)         |
| `config.method?`  | `"GET"` \| `"POST"`                                       |
| `config.url`      | `string`                                                  |
| `authorization`   | [`AuthorizationPayload`](interfaces/AuthorizationPayload) |

#### Returns

`Promise`<`T`\>

#### Defined in

[call.ts:5](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/call.ts#L5)

---

### exchangeCodeForAccessToken

▸ `Const` **exchangeCodeForAccessToken**(`accessCode`): `Promise`<[`AccessTokenResponse`](interfaces/AccessTokenResponse)\>

#### Parameters

| Name         | Type     | Description                                                              |
| :----------- | :------- | :----------------------------------------------------------------------- |
| `accessCode` | `string` | Your access code, typically retrieved by using `exchangeNpssoForCode()`. |

#### Returns

`Promise`<[`AccessTokenResponse`](interfaces/AccessTokenResponse)\>

An object containing an access token, refresh token, and expiry times for both.

#### Defined in

[authenticate/exchangeCodeForAccessToken.ts:11](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/authenticate/exchangeCodeForAccessToken.ts#L11)

---

### exchangeNpssoForCode

▸ `Const` **exchangeNpssoForCode**(`npssoToken`): `Promise`<`string`\>

**`example`**

```ts
const code = await exchangeNpssoForCode("myNpssoToken");

console.log(code); // --> "v3.XXXXXX"
```

#### Parameters

| Name         | Type     | Description                                                                   |
| :----------- | :------- | :---------------------------------------------------------------------------- |
| `npssoToken` | `string` | Your NPSSO token, retrieved from https://ca.account.sony.com/api/v1/ssocookie |

#### Returns

`Promise`<`string`\>

An access code, which can be exchanged for an access token using `exchangeCodeForAccessToken`.

#### Defined in

[authenticate/exchangeNpssoForCode.ts:17](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/authenticate/exchangeNpssoForCode.ts#L17)

---

### getTitleTrophies

▸ `Const` **getTitleTrophies**(`authorization`, `npCommunicationId`, `trophyGroupId`, `options?`): `Promise`<[`TitleTrophiesResponse`](interfaces/TitleTrophiesResponse)\>

A call to this function will retrieve the individual trophy detail of a
single - or all - trophy groups for a title. A title can have multiple
groups of trophies (a `default` group which all titles have, and additional
groups named `"001"` incrementing for each additional group). To retrieve
trophies from all groups within a title (ie. the full trophy set) then
`trophyGroupId` should be set to all.

When the title platform is PS3, PS4 or PS Vita you **must** specify the
`npServiceName` parameter as `"trophy"`.

#### Parameters

| Name                | Type                                                      | Description                                                                                                          |
| :------------------ | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](interfaces/AuthorizationPayload) | An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.                     |
| `npCommunicationId` | `string`                                                  | Unique ID of the title.                                                                                              |
| `trophyGroupId`     | `string`                                                  | `"all"` to return all trophies for the title, otherwise restrict results to a specific trophy group (such as a DLC). |
| `options?`          | `Partial`<`GetTitleTrophiesOptions`\>                     | -                                                                                                                    |

#### Returns

`Promise`<[`TitleTrophiesResponse`](interfaces/TitleTrophiesResponse)\>

#### Defined in

[trophy/title/getTitleTrophies.ts:34](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/trophy/title/getTitleTrophies.ts#L34)

---

### getTitleTrophyGroups

▸ `Const` **getTitleTrophyGroups**(`authorization`, `npCommunicationId`, `options?`): `Promise`<[`TitleTrophyGroupsResponse`](interfaces/TitleTrophyGroupsResponse)\>

A title may have additional groups of trophies. This is most commonly
seen in games which have expansions where additional trophies are added.

You can make a request to this URL for a specific title - using the
unique `npCommunicationId` for the title - and in response will receive a
summary of all of the trophy groups associated with the title.
This also includes a summary of the number of trophies for the
title broken down by group and type (gold, silver etc.).

#### Parameters

| Name                | Type                                                      | Description                                                                                      |
| :------------------ | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](interfaces/AuthorizationPayload) | An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`. |
| `npCommunicationId` | `string`                                                  | Unique ID of the title.                                                                          |
| `options?`          | `Partial`<`GetTitleTrophyGroupsOptions`\>                 | -                                                                                                |

#### Returns

`Promise`<[`TitleTrophyGroupsResponse`](interfaces/TitleTrophyGroupsResponse)\>

#### Defined in

[trophy/title/getTitleTrophyGroups.ts:30](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/trophy/title/getTitleTrophyGroups.ts#L30)

---

### getUserSummarizedTrophiesByTrophyGroup

▸ `Const` **getUserSummarizedTrophiesByTrophyGroup**(`authorization`, `accountId`, `npCommunicationId`, `options?`): `Promise`<[`UserSummarizedTrophiesByTrophyGroupResponse`](interfaces/UserSummarizedTrophiesByTrophyGroupResponse)\>

A request to this endpoint function will retrieve a summary of the trophies earned for
a user broken down by trophy group within a title. A title can have
multiple groups of trophies (a `"default"` group which all titles have,
and additional groups beginning with the name `"001"` and incrementing for
each additional group).

The numeric `accountId` can be that of any PSN account for which the
authenticating account has permissions to view the trophy list.
When querying the titles associated with the authenticating account, the
numeric `accountId` can be substituted with `"me"`.

This function calls an endpoint that returns the earned status of the
trophy only and no additional descriptive metadata (ie. trophy name,
trophy description). Use `getTrophiesForTitle()` to obtain this information.

When the title platform is PS3, PS4 or PS Vita you **must** specify the
`npServiceName` parameter as `"trophy"`.

If you attempt to query a title which the user does not have associated
with their account (ie. the title has not been launched and allowed to
sync at least once) then a Resource Not Found error will be returned.

#### Parameters

| Name                | Type                                                        | Description                                                                                      |
| :------------------ | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](interfaces/AuthorizationPayload)   | An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`. |
| `accountId`         | `string`                                                    | The account whose trophy list is being accessed. Use `"me"` for the authenticating account.      |
| `npCommunicationId` | `string`                                                    | Unique ID of the title.                                                                          |
| `options?`          | `Partial`<`GetUserSummarizedTrophiesByTrophyGroupOptions`\> | -                                                                                                |

#### Returns

`Promise`<[`UserSummarizedTrophiesByTrophyGroupResponse`](interfaces/UserSummarizedTrophiesByTrophyGroupResponse)\>

#### Defined in

[trophy/user/getUserSummarizedTrophiesByTrophyGroup.ts:56](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/trophy/user/getUserSummarizedTrophiesByTrophyGroup.ts#L56)

---

### getUserTitles

▸ `Const` **getUserTitles**(`authorization`, `accountId`, `options?`): `Promise`<[`UserTitlesResponse`](interfaces/UserTitlesResponse)\>

A call to this function will retrieve the earned status of trophies for a user
from either a single - or all - trophy groups in a title. A title can have
multiple groups of trophies (a `"default"` group which all titles have, and
additional groups starting with a name of `"001"` and incrementing for each
additional group). To retrieve trophies from all groups within a title
(ie. the full trophy set) then `trophyGroupId` should be set to `"all"`.

The numeric `accountId` can be that of any PSN account for which the authenticating
account has permissions to view the trophy list. When querying the titles
associated with the authenticating account, the numeric `accountId` can be
substituted with `"me"`.

Included in the information returned is the titles' unique `npCommunicationId`.
This is required to make use of subsequent URLs for requesting more specific
detail about a titles trophies.

The results are presented in order of the `lastUpdatedDateTime` for the title,
so the first result will be the title for which a trophy was recently earned
(or synced for the first time in the case of a game with 0% progress).

#### Parameters

| Name            | Type                                                      | Description                                                                                      |
| :-------------- | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](interfaces/AuthorizationPayload) | An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`. |
| `accountId`     | `string`                                                  | The account whose trophy list is being accessed. Use `"me"` for the authenticating account.      |
| `options?`      | `Partial`<`GetUserTitlesOptions`\>                        | -                                                                                                |

#### Returns

`Promise`<[`UserTitlesResponse`](interfaces/UserTitlesResponse)\>

#### Defined in

[trophy/user/getUserTitles.ts:42](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/trophy/user/getUserTitles.ts#L42)

---

### getUserTrophiesEarnedForTitle

▸ `Const` **getUserTrophiesEarnedForTitle**(`authorization`, `accountId`, `npCommunicationId`, `trophyGroupId`, `options?`): `Promise`<[`UserTrophiesEarnedForTitleResponse`](interfaces/UserTrophiesEarnedForTitleResponse)\>

A request to this URL will retrieve the earned status of trophies for a user
from either a single - or all - trophy groups in a title. A title can have
multiple groups of trophies (a `"default"` group which all titles have, and
additional groups starting with a name of `"001"` and incrementing for each
additional group). To retrieve trophies from all groups within a title
(ie. the full trophy set) then `trophyGroupId` should be set to `"all"`.

The numeric `accountId` can be that of any PSN account for which the
authenticating account has permissions to view the trophy list.
When querying the titles associated with the authenticating account the
numeric `accountId` can be substituted with `"me"`.

This function calls an endpoint that returns the earned status of the
trophy only and no additional descriptive metadata (ie. trophy name,
trophy description). Use `getTrophiesForTitle()` to obtain this information.

When the title platform is PS3, PS4 or PS Vita you **must** specify the
`npServiceName` parameter as `"trophy"`.

If you attempt to query a title which the user does not have associated
with their account (ie. the title has not been launched and allowed to
sync at least once) then a Resource Not Found error will be returned.

#### Parameters

| Name                | Type                                                      | Description                                                                                                          |
| :------------------ | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `authorization`     | [`AuthorizationPayload`](interfaces/AuthorizationPayload) | An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.                     |
| `accountId`         | `string`                                                  | The account whose trophy list is being accessed. Use `"me"` for the authenticating account.                          |
| `npCommunicationId` | `string`                                                  | Unique ID of the title.                                                                                              |
| `trophyGroupId`     | `string`                                                  | `"all"` to return all trophies for the title, otherwise restrict results to a specific trophy group (such as a DLC). |
| `options?`          | `Partial`<`GetUserTrophiesEarnedForTitleOptions`\>        | -                                                                                                                    |

#### Returns

`Promise`<[`UserTrophiesEarnedForTitleResponse`](interfaces/UserTrophiesEarnedForTitleResponse)\>

#### Defined in

[trophy/user/getUserTrophiesEarnedForTitle.ts:48](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/trophy/user/getUserTrophiesEarnedForTitle.ts#L48)

---

### getUserTrophyProfileSummary

▸ `Const` **getUserTrophyProfileSummary**(`authorization`, `accountId`, `options?`): `Promise`<[`UserTrophyProfileSummaryResponse`](interfaces/UserTrophyProfileSummaryResponse)\>

A call to this function will retrieve an overall summary of the number of
trophies earned for a user broken down by type, as well as their current
overall trophy level, progress towards the next level and which tier their
current level falls in to. The tiers are based on the [level changes introduced in 2020](https://andshrew.github.io/PlayStation-Trophies/images/psn-trophy-tiers.png).

The numeric `accountId` can be that of any PSN account for which the
authenticating account has permissions to view the trophy list.
When querying the titles associated with the authenticating account, the
numeric `accountId` can be substituted with `"me"`.

#### Parameters

| Name            | Type                                                      | Description                                                                                      |
| :-------------- | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](interfaces/AuthorizationPayload) | An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`. |
| `accountId`     | `string`                                                  | The account whose trophy list is being accessed. Use `"me"` for the authenticating account.      |
| `options?`      | `Partial`<`GetUserTrophyProfileSummaryOptions`\>          | -                                                                                                |

#### Returns

`Promise`<[`UserTrophyProfileSummaryResponse`](interfaces/UserTrophyProfileSummaryResponse)\>

#### Defined in

[trophy/user/getUserTrophyProfileSummary.ts:30](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/trophy/user/getUserTrophyProfileSummary.ts#L30)
