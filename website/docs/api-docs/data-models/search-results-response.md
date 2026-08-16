# SearchResultsResponse

## SearchResultsResponse

| Name                            | Type                                            | Description                                     |
| :------------------------------ | :---------------------------------------------- | :---------------------------------------------- |
| `data.universalSearch`          | `object`                                        | The main search results container.              |
| `data.universalSearch.next`     | `string \| null`                                | Pagination cursor for the next page of results. |
| `data.universalSearch.pageInfo` | [`SearchResultPageInfo`](#searchresultpageinfo) | Pagination information.                         |
| `data.universalSearch.results`  | [`SearchResultProduct[]`](#searchresultproduct) | Array of product results.                       |

## SearchResultPageInfo

| Name         | Type      | Description                               |
| :----------- | :-------- | :---------------------------------------- |
| `isLast`     | `boolean` | Whether this is the last page of results. |
| `offset`     | `number`  | Current offset in the result set.         |
| `size`       | `number`  | Number of results in the current page.    |
| `totalCount` | `number`  | Total number of results available.        |

## SearchResultProduct

| Name                                  | Type                                                            | Description                                              |
| :------------------------------------ | :-------------------------------------------------------------- | :------------------------------------------------------- |
| `id`                                  | `string`                                                        | Unique product identifier.                               |
| `name`                                | `string`                                                        | Product name.                                            |
| `npTitleId`                           | `string`                                                        | PlayStation Network title ID.                            |
| `platforms`                           | `string[]`                                                      | Array of platforms (e.g., `["PS4"]`, `["PS5"]`).         |
| `localizedStoreDisplayClassification` | `string`                                                        | Localized product type (e.g., `"Full Game"`, `"Level"`). |
| `storeDisplayClassification`          | `string`                                                        | Product classification (e.g., `"FULL_GAME"`, `"LEVEL"`). |
| `media`                               | [`SearchResultMedia[]`](#searchresultmedia)                     | Array of images and videos.                              |
| `personalizedMeta`                    | [`SearchResultPersonalizedMeta`](#searchresultpersonalizedmeta) | Personalized media content.                              |
| `price`                               | [`SearchResultSkuPrice`](#searchresultskuprice)                 | Pricing information.                                     |
| `skus`                                | [`SearchResultSku[]`](#searchresultsku)                         | Available SKUs for the product.                          |

## SearchResultMedia

| Name   | Type                 | Description                    |
| :----- | :------------------- | :----------------------------- |
| `role` | `string`             | Media role (e.g., `"MASTER"`). |
| `type` | `"IMAGE" \| "VIDEO"` | Type of media content.         |
| `url`  | `string`             | URL to the media file.         |

## SearchResultPersonalizedMeta

| Name                | Type                                        | Description                                 |
| :------------------ | :------------------------------------------ | :------------------------------------------ |
| `hasMediaOverrides` | `boolean`                                   | Whether personalized media overrides exist. |
| `media`             | [`SearchResultMedia[]`](#searchresultmedia) | Array of personalized media items.          |

## SearchResultSkuPrice

| Name                    | Type              | Description                                                                |
| :---------------------- |:------------------| :------------------------------------------------------------------------- |
| `skuId`                 | `string`          | SKU identifier.                                                            |
| `basePrice`             | `string \| null`  | Base price with currency symbol (e.g. `"€19.99"` or `"Free"`).             |
| `discountText`          | `string \| null`  | Discount description text. (e.g. `"-50%"`)                                 |
| `discountedPrice`       | `string \| null`  | Discounted price with currency symbol. (e.g. `"€19.99"` or `"Free"`)       |
| `includesBundleOffer`   | `boolean \| null` | Whether a bundle offer is included.                                        |
| `isExclusive`           | `boolean`         | Whether this is an exclusive product.                                      |
| `isFree`                | `boolean`         | Whether the product is free.                                               |
| `isTiedToSubscription`  | `boolean \| null` | Whether tied to a subscription service.                                    |
| `serviceBranding`       | `string[]`        | Service branding information.                                              |
| `upsellServiceBranding` | `string[]`        | Array of upsell service branding options. (e.g. `["NONE"]`, `["PS_PLUS"]`) |
| `upsellText`            | `string \| null`  | Upsell promotional text. (e.g. `"EXTRA"`)                                  |

## SearchResultSku

| Name   | Type     | Description                    |
| :----- | :------- | :----------------------------- |
| `type` | `string` | SKU type (e.g., `"STANDARD"`). |
