import type { TrophyCounts } from "./trophy-counts.model";

export interface TrophyGroup {
  /**
   * ID of the trophy group.
   *
   * A game's standard set of trophies will have a value of `"default"`,
   * whereas additional groups (such as those added from DLC) will
   * increment in values such as `"001"` and `"002"`.
   * @example "default"
   * @example "001"
   */
  trophyGroupId: string;

  /**
   * Name of the trophy group.
   * @example "ASTRO's PLAYROOM"
   */
  trophyGroupName: string;

  /** URL of the icon for the trophy group. */
  trophyGroupIconUrl: string;

  /** Number of trophies for the trophy group by grade. */
  definedTrophies: TrophyCounts;

  /** Description of the trophy group. This is a legacy property, only applying to PS3, PS4, and PS Vita titles. */
  trophyGroupDetail?: string;
}
