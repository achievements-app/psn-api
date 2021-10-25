---
id: "TitleTrophiesResponse"
title: "Interface: TitleTrophiesResponse"
sidebar_label: "TitleTrophiesResponse"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### hasTrophyGroups

• **hasTrophyGroups**: `boolean`

`true` if this title has additional trophy groups.

#### Defined in

[models/title-trophies-response.model.ts:8](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophies-response.model.ts#L8)

---

### nextOffset

• `Optional` **nextOffset**: `number`

#### Defined in

[models/title-trophies-response.model.ts:16](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophies-response.model.ts#L16)

---

### previousOffset

• `Optional` **previousOffset**: `number`

#### Defined in

[models/title-trophies-response.model.ts:17](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophies-response.model.ts#L17)

---

### totalItemCount

• **totalItemCount**: `number`

Total trophies in the group (or total trophies for the title if `"all"` specified)

#### Defined in

[models/title-trophies-response.model.ts:14](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophies-response.model.ts#L14)

---

### trophies

• **trophies**: [`Trophy`](Trophy)[]

Individual object for each trophy.

#### Defined in

[models/title-trophies-response.model.ts:11](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophies-response.model.ts#L11)

---

### trophySetVersion

• **trophySetVersion**: `string`

The current version of the trophy set. Some trophy sets receive updates.

#### Defined in

[models/title-trophies-response.model.ts:5](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophies-response.model.ts#L5)
