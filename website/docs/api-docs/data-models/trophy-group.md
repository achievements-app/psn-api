# TrophyGroup

Each PlayStation title with trophies has these trophies contained in a trophy group. All games have a `"default"` group, which is generally the list of trophies that the game ships with on launch day.

Additional trophy groups are commonly added with DLC releases, which do not count towards the game's platinum (if it has one). It is also possible for developers to opt to add trophy groups in subsequent game updates, such as an update released for Astro's Playroom.

Trophy groups added after the `"default"` group start with the string name `"001"`, and then increment by one. eg: `"002"`, `"003"`, and so on.

| Name                 | Type                                                  | Description                                                                                                                                                             |
| :------------------- | :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trophyGroupId`      | `string`                                              | ID of the trophy group. A game's standard set of trophies will have a value of `"default"`, whereas additional groups will be named values such as `"001"` and `"002"`. |
| `trophyGroupName`    | `string`                                              | Name of the trophy group.                                                                                                                                               |
| `trophyGroupIconUrl` | `string`                                              | URL of the icon for the trophy group.                                                                                                                                   |
| `definedTrophies`    | [`TrophyCounts`](/api-docs/data-models/trophy-counts) | Number of trophies for the trophy group by grade.                                                                                                                       |
| `trophyGroupDetail`  | `string`                                              | Description of the trophy group. This is a legacy property, only applying to PS3, PS4, and PS Vita titles.                                                              |
