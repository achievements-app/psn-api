import type { Trophy } from "./trophy.model";

export type TitleThinTrophy = Pick<
  Trophy,
  | "trophyId"
  | "trophyHidden"
  | "trophyType"
  | "trophyName"
  | "trophyDetail"
  | "trophyIconUrl"
  | "trophyGroupId"
>;
