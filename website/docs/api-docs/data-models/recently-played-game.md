# Recently Played Game

| Name              | Type     | Description                                           |
| :---------------- | :------- | :---------------------------------------------------- |
| `name` | `string` | The name of the game.
| `lastPlayedDateTime` | `string` | An ISO date representing the last play date and time of the given title, e.g 2023-03-10T01:01:01.390000Z.
| `conceptId` | `string` | An ID for titles on the PlayStation store. It's used in the URL, like so `store.playstation.com/en-is/concept/:conceptId`.
| `titleId` | `string` | ID of the product. Forms part of a PlayStation Store URL, e.g `https://store.playstation.com/en-us/product/UP9000-$titleId-RATCHETCLANKRIFT`
| `platform` | `TitlePlatform`\|`"UNKNOWN"` | The platform this game was last played on. This can be reported as "UNKNOWN". It appears that "UNKNOWN" is shown in certain scenarios, such as when a user that **isn't** associated with the access token is sharing the same console as the user that **is** identified by the access token. 
| `entitlementId` | `string`\|`null` | Similar to productId. Used in URLs for the PlayStation Store, like so `store.playstation.com/en-ae/product/:entitlementId`. Appears to only be set for certain entries on the PS4 platform along with `productId`.
| `productId` | `string`\|`null` | ID of the product. Used in the PlayStation Store URL. Appears to only be set for certain PS4 games along with the entitlementId.
| `image.url` | `string` | Contains a URL to a game icon file.
