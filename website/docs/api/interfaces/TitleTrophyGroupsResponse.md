---
id: "TitleTrophyGroupsResponse"
title: "Interface: TitleTrophyGroupsResponse"
sidebar_label: "TitleTrophyGroupsResponse"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### definedTrophies

• **definedTrophies**: [`TrophyCounts`](TrophyCounts)

Total number of trophies for the title by type.

#### Defined in

[models/title-trophy-groups-response.model.ts:22](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophy-groups-response.model.ts#L22)

---

### trophyGroups

• **trophyGroups**: `TrophyGroup`[]

Individual object for each trophy group returned.

#### Defined in

[models/title-trophy-groups-response.model.ts:25](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophy-groups-response.model.ts#L25)

---

### trophySetVersion

• **trophySetVersion**: `string`

The current version of the trophy set. Some trophy sets receive updates.

#### Defined in

[models/title-trophy-groups-response.model.ts:6](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophy-groups-response.model.ts#L6)

---

### trophyTitleDetail

• `Optional` **trophyTitleDetail**: `string`

The title description that this trophy belongs to.
This applies to PS3, PS4, and PS Vita titles only.

#### Defined in

[models/title-trophy-groups-response.model.ts:31](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophy-groups-response.model.ts#L31)

---

### trophyTitleIconUrl

• **trophyTitleIconUrl**: `string`

URL of the icon for the trophy title.

#### Defined in

[models/title-trophy-groups-response.model.ts:12](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophy-groups-response.model.ts#L12)

---

### trophyTitleName

• **trophyTitleName**: `string`

The title name that this trophy belongs to.

#### Defined in

[models/title-trophy-groups-response.model.ts:9](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophy-groups-response.model.ts#L9)

---

### trophyTitlePlatform

• **trophyTitlePlatform**: `string`

The platform this title belongs to. Some games have trophy sets which
are shared between multiple platforms (ie. PS4,PSVITA).
The platforms in these instances will be comma separated.

#### Defined in

[models/title-trophy-groups-response.model.ts:19](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/title-trophy-groups-response.model.ts#L19)
