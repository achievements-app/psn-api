---
id: "Trophy"
title: "Interface: Trophy"
sidebar_label: "Trophy"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### earned

• `Optional` **earned**: `boolean`

`true` if this trophy has been earned.

#### Defined in

[models/trophy.model.ts:15](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L15)

---

### earnedDateTime

• `Optional` **earnedDateTime**: `string`

Date trophy was earned. Only returned if `earned` is `true`.

#### Defined in

[models/trophy.model.ts:18](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L18)

---

### trophyDetail

• `Optional` **trophyDetail**: `string`

Description of the trophy.

#### Defined in

[models/trophy.model.ts:21](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L21)

---

### trophyEarnedRate

• `Optional` **trophyEarnedRate**: `string`

Percentage of all users who have earned the trophy.

#### Defined in

[models/trophy.model.ts:24](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L24)

---

### trophyGroupId

• `Optional` **trophyGroupId**: `string`

ID of the trophy group this trophy belongs to.

A game's standard set of trophies will have a value of `"default"`,
whereas DLC increments in values such as `"001"` and `"002"`.

#### Defined in

[models/trophy.model.ts:32](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L32)

---

### trophyHidden

• **trophyHidden**: `boolean`

`true` if this is a secret trophy (ie. further details are not displayed by default unless earned).

#### Defined in

[models/trophy.model.ts:9](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L9)

---

### trophyIconUrl

• `Optional` **trophyIconUrl**: `string`

URL for the graphic associated with the trophy.

#### Defined in

[models/trophy.model.ts:35](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L35)

---

### trophyId

• **trophyId**: `number`

Unique ID for this trophy (unique within the title and not just the group).

#### Defined in

[models/trophy.model.ts:6](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L6)

---

### trophyName

• `Optional` **trophyName**: `string`

Name of the trophy.

#### Defined in

[models/trophy.model.ts:38](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L38)

---

### trophyProgressTargetValue

• `Optional` **trophyProgressTargetValue**: `string`

If the trophy tracks progress towards unlock, this is the total required to achieve the unlock.
This is included on PS5 titles only, and only if the trophy itself tracks progress.

#### Defined in

[models/trophy.model.ts:44](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L44)

---

### trophyRare

• `Optional` **trophyRare**: [`TrophyRarity`](../enums/TrophyRarity)

Rarity of the trophy.

#### Defined in

[models/trophy.model.ts:47](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L47)

---

### trophyRewardImageUrl

• `Optional` **trophyRewardImageUrl**: `string`

URL for the graphic associated with the reward.

This is included on PS5 titles only, and is only returned if the
trophy has a reward associated with it.

#### Defined in

[models/trophy.model.ts:55](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L55)

---

### trophyRewardName

• `Optional` **trophyRewardName**: `string`

Name of the reward that earning the trophy grants.

This is included on PS5 titles only, and only if the trophy itself has
a reward associated with it.

#### Defined in

[models/trophy.model.ts:63](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L63)

---

### trophyType

• **trophyType**: `TrophyType`

Whether the trophy is bronze, silver, gold, or platinum.

#### Defined in

[models/trophy.model.ts:12](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/trophy.model.ts#L12)
