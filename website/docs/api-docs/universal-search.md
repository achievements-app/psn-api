---
sidebar_label: Universal Search
sidebar_position: 2
---

# Universal Search API

## makeUniversalSearch

A call to this function will make a universal search across the PlayStation Network for your search query. Each search
query requires a domain, such as `"SocialAllAccounts"`.

:::note
If you search for your own username, it will not be in the list of results. This is a quirk of the universal search API.
In cases where you want to use the `accountId` of the account that's currently logged in, use `"me"` instead of the
standard account ID value.
:::

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
|:------------------|:-----------|:------------|
| `prefix`          | `string`   |             |
| `suggestions`     | `string[]` |             |
| `fallbackQueried` | `boolean`  |             |
| `domainResponses` | `any[]`    |             |

### Parameters

| Name            | Type                                                                  | Description                                                                                                                |
|:----------------|:----------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------|
| `authorization` | [`AuthorizationPayload`](/api-docs/data-models/authorization-payload) | An object that must contain an `accessToken`. See [this page](/authentication/authenticating-manually) for how to get one. |
| `searchTerm`    | `string`                                                              | The value being searched for.                                                                                              |
| `domain`        | `string`                                                              | What kind of value is being searched for, such as `SocialAllAccounts`.                                                     |

### Source

[search/makeUniversalSearch.ts](https://github.com/achievements-app/psn-api/blob/main/src/search/makeUniversalSearch.ts)

## getSearchResults

A call to this function will retrieve search results from the PlayStation Store based on the provided search term. This
function searches for games, DLC, and other PlayStation Store products.

:::warning
This endpoint should be called **WITHOUT** authorization to receive price information. When called with authorization,
price data may be filtered or unavailable.
:::

### Examples

#### Search for games in the PlayStation Store

```ts
import { getSearchResults } from "psn-api";

const response = await getSearchResults("batman", {
  countryCode: "US",
  languageCode: "en",
  pageSize: 24,
  pageOffset: 0
});
```

### Returns

[`SearchResultsResponse`](/api-docs/data-models/search-results-response)

The response contains:

| Name                            | Type                    | Description                                       |
|:--------------------------------|:------------------------|:--------------------------------------------------|
| `data.universalSearch`          | `object`                | The main search results container                 |
| `data.universalSearch.next`     | `string \| null`        | Pagination cursor for the next page of results    |
| `data.universalSearch.pageInfo` | `SearchResultPageInfo`  | Pagination information (offset, size, totalCount) |
| `data.universalSearch.results`  | `SearchResultProduct[]` | Array of product results with details and pricing |

Each product result includes:

- `id` - Product ID
- `name` - Product name
- `npTitleId` - PlayStation Network title ID
- `platforms` - Array of platforms (e.g., ["PS4", "PS5"])
- `media` - Array of images and videos
- `price` - Pricing information including base price, discounts, etc.
- `storeDisplayClassification` - Product type (e.g., "FULL_GAME", "LEVEL")

### Parameters

| Name                   | Type     | Description                                                                       |
|:-----------------------|:---------|:----------------------------------------------------------------------------------|
| `searchTerm`           | `string` | The search term to query for (e.g., game name, publisher).                        |
| `options`              | `object` | Search options including country, language, and pagination settings.              |
| `options.countryCode`  | `string` | Two-letter country code (e.g., "US", "GB", "NL") to determine region and pricing. |
| `options.languageCode` | `string` | Two-letter language code (e.g., "en", "es", "nl") for localized content.          |
| `options.pageSize`     | `number` | _(Optional)_ Number of results per page.                                          |
| `options.pageOffset`   | `number` | _(Optional)_ Offset for pagination (0 for first page).                            |
| `options.nextCursor`   | `string` | _(Optional)_ Pagination cursor.                                                   |

### Source

[graphql/getSearchResults.ts](https://github.com/achievements-app/psn-api/blob/main/src/graphql/getSearchResults.ts)
