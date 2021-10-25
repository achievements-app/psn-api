import type { RarestThinTrophy } from "./rarest-thin-trophy.model";
import type { UserThinTrophy } from "./user-thin-trophy.model";

export interface UserTrophiesEarnedForTitleResponse {
  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  /** `true` if this title has additional trophy groups. */
  hasTrophyGroups: boolean;

  /** Date of the user's most recent trophy earned for the title. */
  lastUpdatedDateTime: string;

  /** Individual object for each trophy. */
  trophies: UserThinTrophy[];

  /** Total trophies in the group (or total trophies for the title if `"all"` is specified). */
  totalItemCount: number;

  /**
   * Individual object for each trophy.
   * Returns the trophy where earned is `true` with the lowest `trophyEarnedRate`.
   * If multiple trophies have the same `trophyEarnedRate`, it returns those trophies instead of just an array containing a single trophy.
   * Returns nothing if no trophies are earned.
   */
  rarestTrophies?: RarestThinTrophy[];

  nextOffset?: number;
  previousOffset?: number;
}
