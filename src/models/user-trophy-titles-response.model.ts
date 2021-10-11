import type { TrophyTitle } from "./trophy-title.model";

export interface UserTrophyTitlesResponse {
  trophyTitles: TrophyTitle[];
  totalItemCount: number;
}
