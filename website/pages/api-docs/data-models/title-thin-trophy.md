# TitleThinTrophy

The `TitleThinTrophy` entity is a thin subset of the [`Trophy`](/api-docs/data-models/trophy) model. These entities are generally returned when using the [`getTitleTrophies()`](/api-docs/title-trophies#getTitleTrophies) function.

| Name            | Type                                                 | Description                                                                                                                                                                      |
| :-------------- | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trophyId`      | `number`                                             | Unique ID for this trophy (unique within the title and not just the group).                                                                                                      |
| `trophyHidden`  | `boolean`                                            | `true` if this is a secret trophy (ie. further details are not displayed by default unless earned).                                                                              |
| `trophyType`    | `"bronze"` \| `"silver"` \| `"gold"` \| `"platinum"` | The trophy grade.                                                                                                                                                                |
| `trophyName`    | `string`                                             | Name of the trophy.                                                                                                                                                              |
| `trophyDetail`  | `string`                                             | Description of the trophy.                                                                                                                                                       |
| `trophyIconUrl` | `string`                                             | URL for the graphic associated with the trophy.                                                                                                                                  |
| `trophyGroupId` | `string`                                             | ID of the trophy group this trophy belongs to. A game's standard set of trophies will have a value of `"default"`, whereas DLC increments in values such as `"001"` and `"002"`. |
