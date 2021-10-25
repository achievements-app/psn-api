import type { Trophy } from "./trophy.model";

export type RarestThinTrophy = Pick<
  Trophy,
  | "trophyId"
  | "trophyHidden"
  | "earned"
  | "trophyType"
  | "trophyRare"
  | "trophyEarnedRate"
>;
