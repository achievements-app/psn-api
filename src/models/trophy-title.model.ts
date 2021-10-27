import type { TitlePlatform } from "./title-platform.model";
import type { TrophyCounts } from "./trophy-counts.model";

export interface TrophyTitle {
  /**
   * `"trophy"` for PS3, PS4, or PS Vita platforms.
   * `"trophy2"` for the PS5 platform.
   */
  npServiceName: "trophy" | "trophy2";

  /**
   * Unique ID of the title. This is later required for requesting detailed
   * trophy information for this title.
   */
  npCommunicationId: string;

  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  /** The game name. */
  trophyTitleName: string;

  /** URL of the icon for the given title. */
  trophyTitleIconUrl: string;

  /**
   * The platform this title belongs to. Some games have trophy sets which are
   * shared between multiple platforms (ie. PS4,PSVITA). The platforms will be
   * comma-separated.
   */
  trophyTitlePlatform: TitlePlatform | string;

  /**
   * `true` if the title has multiple groups of trophies beyond the `"default"` group.
   */
  hasTrophyGroups: boolean;

  /** Number of trophies for the title by type. */
  definedTrophies: TrophyCounts;

  /**
   * Percentage of trophies earned for the title by the user.
   * @example 100
   * @example 25
   */
  progress: number;

  /** Number of trophies for the title which have been earned by grade. */
  earnedTrophies: TrophyCounts;

  /**
   * `true` if the title has been hidden on the account's trophy list.
   * This applies to the authenticating account only.
   * The title will not be returned if it has been hidden on another account.
   */
  hiddenFlag: boolean;

  /**
   * An ISO 8601 string representing the date the most
   * recent trophy was earned for the title.
   * @example `"2021-08-15T21:22:08Z"`
   */
  lastUpdatedDateTime: string;

  /**
   * The title description.
   * This is a legacy property that applies to
   * PS3, PS4, and PS Vita titles only.
   */
  trophyTitleDetail?: string;
}
