import type { TrophyCounts } from "./trophy-counts.model";

export interface TrophyGroup {
  /**
   * ID of the trophy group this trophy belongs to.
   *
   * A game's standard set of trophies will have a value of `"default"`,
   * whereas DLC increments in values such as `"001"` and `"002"`.
   */
  trophyGroupId: string;

  /** Name of the trophy group. */
  trophyGroupName: string;

  /** URL of the icon for the trophy group. */
  trophyGroupIconUrl: string;

  /** Number of trophies for the trophy group by type. */
  definedTrophies: TrophyCounts;

  /** Description of the trophy group. This applies to PS3, PS4, and PS Vita titles only. */
  trophyGroupDetail?: string;
}
