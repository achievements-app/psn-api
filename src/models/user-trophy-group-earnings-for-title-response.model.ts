import type { TrophyCounts } from "./trophy-counts.model";
import type { TrophyGroupEarnings } from "./trophy-group-earnings.model";

export interface UserTrophyGroupEarningsForTitleResponse {
  /** The current version of the trophy set. Some trophy sets receive updates from the developer. */
  trophySetVersion: string;

  /**
   * `true` if the title has been hidden on the account's trophy list.
   * This applies to the authenticating account only.
   * The title will not be returned if it has been hidden on another account.
   */
  hiddenFlag: boolean;

  /** The account's percentage of trophies earned for the title. */
  progress: number;

  /** The account's number of earned trophies for the title by grade. */
  earnedTrophies: TrophyCounts;

  /** Individual object for each trophy group returned. */
  trophyGroups: TrophyGroupEarnings[];

  /**
   * An ISO 8601 string representing the date the
   * title progress was updated (such as when a
   * trophy was earned for a group).
   * @example `"2021-08-15T21:22:08Z"`
   */
  lastUpdatedDateTime: string;
}
