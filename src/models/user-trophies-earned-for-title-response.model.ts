import type { Trophy } from "./trophy.model";

export interface UserTrophiesEarnedForTitleResponse {
  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  /** `true` if this title has additional trophy groups. */
  hasTrophyGroups: boolean;

  /** Date of the user's most recent trophy earned for the title. */
  lastUpdatedDateTime: string;

  /** Individual object for each trophy. */
  trophies: Trophy[];

  /** Total trophies in the group (or total trophies for the title if `"all"` is specified). */
  totalItemCount: number;

  /**
   * Individual object for each trophy.
   * Returns the trophy where earned is `true` with the lowest `trophyEarnedRate`.
   * Returns nothing if no trophies are earned.
   */
  rarestTrophies?: Trophy[];

  nextOffset?: number;
  previousOffset?: number;
}
