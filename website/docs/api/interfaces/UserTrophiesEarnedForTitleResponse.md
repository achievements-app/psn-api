---
id: "UserTrophiesEarnedForTitleResponse"
title: "Interface: UserTrophiesEarnedForTitleResponse"
sidebar_label: "UserTrophiesEarnedForTitleResponse"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### hasTrophyGroups

• **hasTrophyGroups**: `boolean`

`true` if this title has additional trophy groups.

#### Defined in

[models/user-trophies-earned-for-title-response.model.ts:8](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophies-earned-for-title-response.model.ts#L8)

---

### lastUpdatedDateTime

• **lastUpdatedDateTime**: `string`

Date of the user's most recent trophy earned for the title.

#### Defined in

[models/user-trophies-earned-for-title-response.model.ts:11](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophies-earned-for-title-response.model.ts#L11)

---

### nextOffset

• `Optional` **nextOffset**: `number`

#### Defined in

[models/user-trophies-earned-for-title-response.model.ts:26](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophies-earned-for-title-response.model.ts#L26)

---

### previousOffset

• `Optional` **previousOffset**: `number`

#### Defined in

[models/user-trophies-earned-for-title-response.model.ts:27](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophies-earned-for-title-response.model.ts#L27)

---

### rarestTrophies

• `Optional` **rarestTrophies**: [`Trophy`](Trophy)[]

Individual object for each trophy.
Returns the trophy where earned is `true` with the lowest `trophyEarnedRate`.
Returns nothing if no trophies are earned.

#### Defined in

[models/user-trophies-earned-for-title-response.model.ts:24](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophies-earned-for-title-response.model.ts#L24)

---

### totalItemCount

• **totalItemCount**: `number`

Total trophies in the group (or total trophies for the title if `"all"` is specified).

#### Defined in

[models/user-trophies-earned-for-title-response.model.ts:17](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophies-earned-for-title-response.model.ts#L17)

---

### trophies

• **trophies**: [`Trophy`](Trophy)[]

Individual object for each trophy.

#### Defined in

[models/user-trophies-earned-for-title-response.model.ts:14](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophies-earned-for-title-response.model.ts#L14)

---

### trophySetVersion

• **trophySetVersion**: `string`

The current version of the trophy set. Some trophy sets receive updates.

#### Defined in

[models/user-trophies-earned-for-title-response.model.ts:5](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophies-earned-for-title-response.model.ts#L5)
