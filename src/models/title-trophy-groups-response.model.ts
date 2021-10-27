import type { TrophyCounts } from "./trophy-counts.model";
import type { TrophyGroup } from "./trophy-group.model";

export interface TitleTrophyGroupsResponse {
  /** The current version of the trophy set. Some trophy sets receive updates from the developer. */
  trophySetVersion: string;

  /** The title name that this trophy belongs to. */
  trophyTitleName: string;

  /** URL of the icon for the trophy title. */
  trophyTitleIconUrl: string;

  /**
   * The platform this title belongs to. Some games have trophy sets which
   * are shared between multiple platforms (eg. PS4,PSVITA).
   * The platforms in these instances will be comma-separated.
   */
  trophyTitlePlatform: string;

  /** Total number of trophies for the title by type. */
  definedTrophies: TrophyCounts;

  /** Individual entities for each trophy group associated with the given title. */
  trophyGroups: TrophyGroup[];

  /**
   * The title description that this trophy belongs to.
   * This is a legacy property that applies to PS3, PS4, and PS Vita titles only.
   */
  trophyTitleDetail?: string;
}
