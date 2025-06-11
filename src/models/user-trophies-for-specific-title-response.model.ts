import { TrophyTitle } from "./trophy-title.model";

export interface UserTrophiesBySpecificTitleResponse {
  /** Individual object for each title returned */
  titles: {
    /** npTitleId of the title */
    npTitleId: string;
    /**
     * Trophy set associated with the title
     * This will only be returned if the queried account has played the title (and allowed their trophies to sync) at least once
     */
    trophyTitles: TrophyTitle[];
  }[];
}
