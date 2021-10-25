---
id: "TrophyTitle"
title: "Interface: TrophyTitle"
sidebar_label: "TrophyTitle"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### definedTrophies

• **definedTrophies**: [`TrophyCounts`](TrophyCounts)

Number of trophies for the title by type

#### Defined in

[models/trophy-title.model.ts:39](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L39)

---

### earnedTrophies

• **earnedTrophies**: [`TrophyCounts`](TrophyCounts)

Number of trophies for the title which have been earned by type

#### Defined in

[models/trophy-title.model.ts:45](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L45)

---

### hasTrophyGroups

• **hasTrophyGroups**: `boolean`

True if the title has multiple groups of trophies
(eg. DLC trophies which are separate from the main trophy list)

#### Defined in

[models/trophy-title.model.ts:36](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L36)

---

### hiddenFlag

• **hiddenFlag**: `boolean`

Title has been hidden on the accounts trophy list.
This applies to the authenticating account only.
The title will not be returned if it has been hidden on another account.

#### Defined in

[models/trophy-title.model.ts:52](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L52)

---

### lastUpdatedDateTime

• **lastUpdatedDateTime**: `string`

Date most recent trophy earned for the title.

#### Defined in

[models/trophy-title.model.ts:55](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L55)

---

### npCommunicationId

• **npCommunicationId**: `string`

Unique ID of the title. This is later required for requesting detailed
trophy information for this title.

#### Defined in

[models/trophy-title.model.ts:15](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L15)

---

### npServiceName

• **npServiceName**: `string`

`"trophy"` for PS3, PS4, or PS Vita platforms.
`"trophy2"` for the PS5 platform.

#### Defined in

[models/trophy-title.model.ts:9](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L9)

---

### progress

• **progress**: `number`

Percentage of trophies earned for the title

#### Defined in

[models/trophy-title.model.ts:42](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L42)

---

### trophySetVersion

• **trophySetVersion**: `string`

The current version of the trophy set. Some trophy sets receive updates.

#### Defined in

[models/trophy-title.model.ts:18](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L18)

---

### trophyTitleDetail

• `Optional` **trophyTitleDetail**: `string`

The title description. This applies to PS3, PS4, and PS Vita titles only.

#### Defined in

[models/trophy-title.model.ts:58](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L58)

---

### trophyTitleIconUrl

• **trophyTitleIconUrl**: `string`

URL of the icon for the given title.

#### Defined in

[models/trophy-title.model.ts:23](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L23)

---

### trophyTitleName

• **trophyTitleName**: `string`

#### Defined in

[models/trophy-title.model.ts:20](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L20)

---

### trophyTitlePlatform

• **trophyTitlePlatform**: `string`

The platform this title belongs to. Some games have trophy sets which are
shared between multiple platforms (ie. PS4,PSVITA). The platforms will be
comma separated.

#### Defined in

[models/trophy-title.model.ts:30](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy-title.model.ts#L30)
