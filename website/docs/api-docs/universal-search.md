---
sidebar_label: Universal Search
sidebar_position: 2
---

# Universal Search API

## makeUniversalSearch

A call to this function will make a universal search across the PlayStation Network for your search query. Each search query requires a domain, such as `"SocialAllAccounts"`.

### Examples

#### Find a user's `accountId` by their username

```ts
import { makeUniversalSearch } from "psn-api";

const response = await makeUniversalSearch(
  authorization,
  "xelnia",
  "SocialAllAccounts"
);
```

### Returns

| Name              | Type       | Description |
| :---------------- | :--------- | :---------- |
| `prefix`          | `string`   |             |
| `suggestions`     | `string[]` |             |
| `fallbackQueried` | `boolean`  |             |
| `domainResponses` | `any[]`    |             |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                |
| :-------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one. |
| `searchTerm`    | `string`                                                              | The value being searched for.                                                                                              |
| `domain`        | `string`                                                              | What kind of value is being searched for, such as `SocialAllAccounts`.                                                     |

### Source

[search/makeUniversalSearch.ts](https://github.com/achievements-app/psn-api/blob/main/src/search/makeUniversalSearch.ts)
