---
id: "UserTrophyProfileSummaryResponse"
title: "Interface: UserTrophyProfileSummaryResponse"
sidebar_label: "UserTrophyProfileSummaryResponse"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### accountId

• **accountId**: `string`

The ID of the account being accessed.

#### Defined in

[models/user-trophy-profile-summary-response.model.ts:5](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophy-profile-summary-response.model.ts#L5)

---

### earnedTrophies

• **earnedTrophies**: [`TrophyCounts`](TrophyCounts)

The account's number of earned trophies by type.

#### Defined in

[models/user-trophy-profile-summary-response.model.ts:32](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophy-profile-summary-response.model.ts#L32)

---

### progress

• **progress**: `number`

The account's percentage process towards the next trophy level.

#### Defined in

[models/user-trophy-profile-summary-response.model.ts:11](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophy-profile-summary-response.model.ts#L11)

---

### tier

• **tier**: `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10`

The tier this trophy level is in.

| Tier | Grade    | `trophyLevel` Ranges |
| ---- | -------- | -------------------: |
| 1    | Bronze   |               1 - 99 |
| 2    | Bronze   |            100 - 199 |
| 3    | Bronze   |            200 - 299 |
| 4    | Silver   |            300 - 399 |
| 5    | Silver   |            400 - 499 |
| 6    | Silver   |            500 - 599 |
| 7    | Gold     |            600 - 699 |
| 8    | Gold     |            700 - 799 |
| 9    | Gold     |            800 - 998 |
| 10   | Platinum |                  999 |

#### Defined in

[models/user-trophy-profile-summary-response.model.ts:29](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophy-profile-summary-response.model.ts#L29)

---

### trophyLevel

• **trophyLevel**: `string`

The account's overall trophy level.

#### Defined in

[models/user-trophy-profile-summary-response.model.ts:8](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/user-trophy-profile-summary-response.model.ts#L8)
