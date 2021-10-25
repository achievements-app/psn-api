export interface TrophyCounts {
  /** Total count of bronze trophies. */
  bronze: number;

  /** Total count of silver trophies. */
  silver: number;

  /** Total count of gold trophies. */
  gold: number;

  /** 1 if the group contains a platinum trophy. */
  platinum: 0 | 1;
}
