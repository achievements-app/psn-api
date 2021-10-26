import type { TrophyCounts } from "./trophy-counts.model";

export interface UserTrophyProfileSummaryResponse {
  /** The ID of the account being accessed. */
  accountId: string;

  /** The account's overall trophy level. */
  trophyLevel: string;

  /** The account's percentage progress towards the next trophy level. */
  progress: number;

  /**
   * The tier this trophy level is in.
   *
   * | Tier | Grade | trophyLevel Ranges |
   * | --- | --- | ---: |
   * | 1 | Bronze | 1 - 99 |
   * | 2 | Bronze | 100 - 199 |
   * | 3 | Bronze | 200 - 299 |
   * | 4 | Silver | 300 - 399 |
   * | 5 | Silver | 400 - 499 |
   * | 6 | Silver | 500 - 599 |
   * | 7 | Gold | 600 - 699 |
   * | 8 | Gold | 700 - 799 |
   * | 9 | Gold | 800 - 998 |
   * | 10 | Platinum | 999 |
   */
  tier: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  /** The account's number of earned trophies by grade. */
  earnedTrophies: TrophyCounts;
}
