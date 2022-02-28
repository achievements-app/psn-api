import type { TrophyTitle } from "./trophy-title.model";

export interface UserTitlesResponse {
  /** The list of games played by the user. */
  trophyTitles: TrophyTitle[];

  /** The number of `TrophyTitle` entities returned from the PSN API. */
  totalItemCount: number;
  nextOffset?: number;
  previousOffset?: number;
}
