# RarestThinTrophy

The `RarestThinTrophy` entity is a thin subset of the [`Trophy`](/api-docs/data-models/trophy) model. These entities are generally returned when using the [`getUserTrophiesEarnedForTitle()`](/api-docs/trophy/user/getUserTrophiesEarnedForTitle) function.

| Name               | Type                                                  | Description                                                                                         |
| :----------------- | :---------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| `trophyId`         | `number`                                              | Unique ID for this trophy (unique within the title and not just the group).                         |
| `trophyHidden`     | `boolean`                                             | `true` if this is a secret trophy (ie. further details are not displayed by default unless earned). |
| `earned`           | `boolean`                                             | `true` if this trophy has been earned.                                                              |
| `trophyType`       | `"bronze"` \| `"silver"` \| `"gold"` \| `"platinum"`  | The trophy grade.                                                                                   |
| `trophyRare`       | [`TrophyRarity`](/api-docs/data-models/trophy-rarity) | Rarity of the trophy.                                                                               |
| `trophyEarnedRate` | `string`                                              | Percentage of all users who have earned the trophy.                                                 |
