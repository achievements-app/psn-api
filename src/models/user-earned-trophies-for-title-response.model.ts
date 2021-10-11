import type { Trophy } from "./trophy.model";

export interface UserEarnedTrophiesForTitleResponse {
  trophySetVersion: string;
  hasTrophyGroups: boolean;
  lastUpdatedDateTime: string;
  trophies: Trophy[];
  totalItemCount: number;
}
