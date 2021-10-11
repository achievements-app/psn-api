import type { TitlePlatform } from "./title-platform.model";
import type { TrophyCounts } from "./trophy-counts.model";

export interface TrophyTitle {
  /**
   * `"trophy"` for PS3, PS4, or PS Vita platforms.
   * `"trophy2"` for the PS5 platform.
   */
  npServiceName: string;

  /**
   * Unique ID of the title. This is later required for requesting detailed
   * trophy information for this title.
   */
  npCommunicationId: string;

  /** The current version of the trophy set. Some trophy sets receive updates. */
  trophySetVersion: string;

  trophyTitleName: string;

  /** URL of the icon for the given title. */
  trophyTitleIconUrl: string;

  /**
   * The platform this title belongs to. Some games have trophy sets which are
   * shared between multiple platforms (ie. PS4,PSVITA). The platforms will be
   * comma separated.
   */
  trophyTitlePlatform: TitlePlatform | string;

  /**
   * True if the title has multiple groups of trophies
   * (eg. DLC trophies which are separate from the main trophy list)
   */
  hasTrophyGroups: boolean;

  /** Number of trophies for the title by type */
  definedTrophies: TrophyCounts;

  /** Percentage of trophies earned for the title */
  progress: number;

  /** Number of trophies for the title which have been earned by type */
  earnedTrophies: TrophyCounts;

  /**
   * Title has been hidden on the accounts trophy list.
   * This applies to the authenticating account only.
   * The title will not be returned if it has been hidden on another account.
   */
  hiddenFlag: boolean;

  /** Date most recent trophy earned for the title. */
  lastUpdatedDateTime: string;

  /** The title description. This applies to PS3, PS4, and PS Vita titles only. */
  trophyTitleDetail?: string;
}
