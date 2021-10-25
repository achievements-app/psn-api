import type { TitleThinTrophy } from "./title-thin-trophy.model";

export interface TitleTrophiesResponse {
  /** The current version of the trophy set. Some trophy sets receive updates from the developer. */
  trophySetVersion: string;

  /** `true` if this title has additional trophy groups. This is commonly used for DLC, but some games add additional trophies as separate groups post-release (such as Astro's Playroom and Horizon Zero Dawn). */
  hasTrophyGroups: boolean;

  /** Individual object for each trophy. */
  trophies: TitleThinTrophy[];

  /** Total trophies in the group (or total trophies for the title if `"all"` specified) */
  totalItemCount: number;

  nextOffset?: number;
  previousOffset?: number;
}
