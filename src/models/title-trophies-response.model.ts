import type { Trophy } from "./trophy.model";

export interface TitleTrophiesResponse {
  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  /** `true` if this title has additional trophy groups. */
  hasTrophyGroups: boolean;

  /** Individual object for each trophy. */
  trophies: Trophy[];

  /** Total trophies in the group (or total trophies for the title if `"all"` specified) */
  totalItemCount: number;

  nextOffset?: number;
  previousOffset?: number;
}
