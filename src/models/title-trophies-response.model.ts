import type { Trophy } from "./trophy.model";

export interface TitleTrophiesResponse {
  trophySetVersion: string;
  hasTrophyGropus: boolean;
  trophies: Trophy[];
  totalItemCount: number;
}
