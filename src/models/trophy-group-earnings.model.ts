import type { TrophyCounts } from "./trophy-counts.model";
import type { TrophyGroup } from "./trophy-group.model";

type FromTrophyGroup = Pick<TrophyGroup, "trophyGroupId">;

export interface TrophyGroupEarnings extends FromTrophyGroup {
  /**
   * The percentage completion of the trophy group by the user.
   * @example `100`
   * @example `20`
   */
  progress: number;

  /** The account's number of earned trophies for the trophy group by grade. */
  earnedTrophies: TrophyCounts;

  /**
   * An ISO 8601 string representing the date the
   * group progress was updated (such as when a
   * trophy was earned).
   * @example `"2021-08-15T21:22:08Z"`
   */
  lastUpdatedDateTime: string;
}
