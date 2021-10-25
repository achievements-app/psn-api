---
id: "UserSummarizedTrophiesByTrophyGroupResponse"
title: "Interface: UserSummarizedTrophiesByTrophyGroupResponse"
sidebar_label: "UserSummarizedTrophiesByTrophyGroupResponse"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### earnedTrophies

• **earnedTrophies**: [`TrophyCounts`](TrophyCounts)

The account's number of earned trophies by type.

#### Defined in

[models/user-summarized-trophies-by-trophy-group-response.model.ts:19](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-summarized-trophies-by-trophy-group-response.model.ts#L19)

---

### hiddenFlag

• **hiddenFlag**: `boolean`

Title has been hidden on the accounts trophy list.
This applies to the authenticating account only.
The title will not be returned if it has been hidden on another account.

#### Defined in

[models/user-summarized-trophies-by-trophy-group-response.model.ts:13](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-summarized-trophies-by-trophy-group-response.model.ts#L13)

---

### lastUpdatedDateTime

• **lastUpdatedDateTime**: `string`

Date of the user's most recent trophy earned for the title.

#### Defined in

[models/user-summarized-trophies-by-trophy-group-response.model.ts:25](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-summarized-trophies-by-trophy-group-response.model.ts#L25)

---

### progress

• **progress**: `number`

The account's percentage process towards the next trophy level.

#### Defined in

[models/user-summarized-trophies-by-trophy-group-response.model.ts:16](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-summarized-trophies-by-trophy-group-response.model.ts#L16)

---

### trophyGroups

• **trophyGroups**: `TrophyGroup`[]

Individual object for each trophy group returned.

#### Defined in

[models/user-summarized-trophies-by-trophy-group-response.model.ts:22](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-summarized-trophies-by-trophy-group-response.model.ts#L22)

---

### trophySetVersion

• **trophySetVersion**: `string`

The current version of the trophy set. Some trophy sets receive updates.

#### Defined in

[models/user-summarized-trophies-by-trophy-group-response.model.ts:6](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-summarized-trophies-by-trophy-group-response.model.ts#L6)
