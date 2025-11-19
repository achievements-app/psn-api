# PurchasedGame

| Name             | Type                                                    | Description                                                              |
| :--------------- | :------------------------------------------------------ | :----------------------------------------------------------------------- |
| `conceptId`      | `string \| null`                                        | Unique concept identifier for the game. Can be `null` for some entries.  |
| `entitlementId`  | `string`                                                | Unique entitlement identifier for the purchased game.                    |
| `image.url`      | `string`                                                | Contains a URL to a game icon file.                                      |
| `isActive`       | `boolean`                                               | Whether the game is currently active.                                    |
| `isDownloadable` | `boolean`                                               | Whether the game is downloadable.                                        |
| `isPreOrder`     | `boolean`                                               | Whether the game is a pre-order.                                         |
| `membership`     | [`Membership`](/api-docs/data-models/membership)        | The membership level associated with this game (e.g., PlayStation Plus). |
| `name`           | `string`                                                | The name of the game.                                                    |
| `platform`       | [`TitlePlatform`](/api-docs/data-models/title-platform) | The platform this game is available on (PS4, PS5, etc.).                 |
| `productId`      | `string`                                                | Unique product identifier for the game.                                  |
| `titleId`        | `string`                                                | Unique title identifier for the game.                                    |
