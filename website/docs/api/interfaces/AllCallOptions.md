---
id: "AllCallOptions"
title: "Interface: AllCallOptions"
sidebar_label: "AllCallOptions"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### headerOverrides

• **headerOverrides**: [`CallValidHeaders`](CallValidHeaders)

#### Defined in

[models/all-call-options.model.ts:23](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/all-call-options.model.ts#L23)

---

### limit

• **limit**: `number`

Limit the number of titles returned.

#### Defined in

[models/all-call-options.model.ts:14](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/all-call-options.model.ts#L14)

---

### npServiceName

• **npServiceName**: `"trophy"` \| `"trophy2"`

Not required unless the platform is PS3, PS4, or PS Vita.
If one of these platforms, the value **must** be `"trophy"`.

`"trophy"` for PS3, PS4, or PS Vita platforms.
`"trophy2"` for the PS5 platform.

#### Defined in

[models/all-call-options.model.ts:11](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/all-call-options.model.ts#L11)

---

### offset

• **offset**: `number`

Return title data from this result onwards.

#### Defined in

[models/all-call-options.model.ts:17](https://github.com/wescopeland/psn-api/blob/e03f8b1/src/models/all-call-options.model.ts#L17)
