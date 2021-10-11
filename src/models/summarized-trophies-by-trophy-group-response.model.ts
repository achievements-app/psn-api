import type { TrophyCounts } from "./trophy-counts.model";
import type { TrophyGroup } from "./trophy-group.model";

export interface SummarizedTrophiesByTrophyGroupResponse {
  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  /**
   * Title has been hidden on the accounts trophy list.
   * This applies to the authenticating account only.
   * The title will not be returned if it has been hidden on another account.
   */
  hiddenFlag: boolean;

  /** The account's percentage process towards the next trophy level. */
  progress: number;

  /** The account's number of earned trophies by type. */
  earnedTrophies: TrophyCounts;

  /** Individual object for each trophy group returned. */
  trophyGroups: TrophyGroup[];

  /** Date of the user's most recent trophy earned for the title. */
  lastUpdatedDateTime: string;
}
