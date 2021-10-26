# TrophyGroupEarnings

| Name                  | Type                              | Description                                                                                                                                                                                           |
| :-------------------- | :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trophyGroupId`       | `string`                          | ID of the trophy group. A game's standard set of trophies will have a value of `"default"`, whereas additional groups (such as those added from DLC) increment in values such as `"001"` and `"002"`. |
| `progress`            | `number`                          | The percentage completion of the trophy group by the user. ex- `100`, `20`.                                                                                                                           |
| `earnedTrophies`      | [`TrophyCounts`](./trophy-counts) | The account's number of earned trophies for the trophy group by grade.                                                                                                                                |
| `lastUpdatedDateTime` | `string`                          | An ISO 8601 string representing the date the group progress was updated (such as when a trophy was earned). ex- `"2021-08-15T21:22:08Z"`                                                              |
