import type { TrophyRarity } from "./trophy-rarity.model";
import type { TrophyType } from "./trophy-type.model";

export interface Trophy {
  /** Unique ID for this trophy (unique within the title and not just the group). */
  trophyId: number;

  /** `true` if this is a secret trophy (ie. further details are not displayed by default unless earned). */
  trophyHidden: boolean;

  /** Whether the trophy is bronze, silver, gold, or platinum. */
  trophyType: TrophyType;

  /** `true` if this trophy has been earned. */
  earned?: boolean;

  /**
   * An ISO 8601 string representing the date the
   * trophy was earned. Only truthy if `earned` is `true`.
   * @example `"2021-08-15T21:22:08Z"`
   */
  earnedDateTime?: string;

  /** Description of the trophy. */
  trophyDetail?: string;

  /** Percentage of all users who have earned the trophy. */
  trophyEarnedRate?: string;

  /**
   * ID of the trophy group this trophy belongs to.
   *
   * A game's standard set of trophies will have a value of `"default"`,
   * whereas DLC increments in values such as `"001"` and `"002"`.
   */
  trophyGroupId?: string;

  /** URL for the graphic associated with the trophy. */
  trophyIconUrl?: string;

  /** Name of the trophy. */
  trophyName?: string;

  /**
   * If the trophy tracks progress towards unlock, this is the total required to achieve the unlock.
   * This is included on PS5 titles only, and only if the trophy itself tracks progress.
   */
  trophyProgressTargetValue?: string;

  /** Rarity of the trophy. */
  trophyRare?: TrophyRarity;

  /**
   * URL for the graphic associated with the reward.
   *
   * This is included on PS5 titles only, and is only returned if the
   * trophy has a reward associated with it.
   */
  trophyRewardImageUrl?: string;

  /**
   * Name of the reward that earning the trophy grants.
   *
   * This is included on PS5 titles only, and only if the trophy itself has
   * a reward associated with it.
   */
  trophyRewardName?: string;
}
