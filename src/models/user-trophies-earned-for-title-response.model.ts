import type { RarestThinTrophy } from "./rarest-thin-trophy.model";
import type { UserThinTrophy } from "./user-thin-trophy.model";

export interface UserTrophiesEarnedForTitleResponse {
  /** The current version of the trophy set. Some trophy sets receive updates from the developer. */
  trophySetVersion: string;

  /** `true` if this title has additional trophy groups beyond the required `"default"` group. */
  hasTrophyGroups: boolean;

  /**
   * An ISO 8601 string representing the date of the
   * user's most recent trophy earned for the title.
   * @example - `"2021-08-15T21:22:08Z"`
   */
  lastUpdatedDateTime: string;

  /** Individual object for each trophy. */
  trophies: UserThinTrophy[];

  /** Total trophies in the group (or total trophies for the title if `"all"` is specified). */
  totalItemCount: number;

  /**
   * An array which contains the trophy where `earned` is `true` with the lowest `trophyEarnedRate`.
   * If multiple trophies have the same `trophyEarnedRate`, the array contains those trophies instead of just a single trophy.
   * It contains nothing if no trophies are earned.
   */
  rarestTrophies?: RarestThinTrophy[];

  nextOffset?: number;
  previousOffset?: number;
}
