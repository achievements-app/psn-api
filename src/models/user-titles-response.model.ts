import type { TrophyTitle } from "./trophy-title.model";

export interface UserTitlesResponse {
  trophyTitles: TrophyTitle[];
  totalItemCount: number;
}
