import type { TrophyRarity } from "./trophy-rarity.model";
import type { TrophyType } from "./trophy-type.model";

export interface Trophy {
  trophyId: number;
  trophyHidden: boolean;
  trophyType: TrophyType;

  earned?: boolean;
  earnedDateTime?: string;
  trophyDetail?: string;
  trophyEarnedRate?: string;
  trophyGroupId?: string;
  trophyIconUrl?: string;
  trophyName?: string;
  trophyProgressTargetValue?: string;
  trophyRare?: TrophyRarity;
  trophyRewardImageUrl?: string;
  trophyRewardName?: string;
}
