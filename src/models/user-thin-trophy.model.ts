import type { Trophy } from "./trophy.model";

export type UserThinTrophy = Pick<
  Trophy,
  | "trophyId"
  | "trophyHidden"
  | "earned"
  | "earnedDateTime"
  | "trophyType"
  | "trophyRare"
  | "trophyEarnedRate"
  | "trophyProgressTargetValue"
  | "trophyRewardImageUrl"
  | "trophyRewardName"
>;
