import type { TitlePlatform } from "./title-platform.model";
import type { TrophyCounts } from "./trophy-counts.model";

export interface TrophyTitle {
  npServiceName: string;
  npCommunicationId: string;
  trophySetVersion: string;
  trophyTitleName: string;
  trophyTitleDetail: string;
  trophyTitleIconUrl: string;
  trophyTitlePlatform: TitlePlatform;
  hasTrophyGroups: boolean;
  definedTrophies: TrophyCounts;
  progress: number;
  earnedTrophies: TrophyCounts;
  hiddenFlag: boolean;
  lastUpdatedDateTime: string;
}
