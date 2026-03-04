export interface GetUserBlockedAccountIdsResponse {
  /** A list of `accountId` values corresponding to accounts that have been blocked by the user. */
  blockList: string[];

  nextOffset?: number;
  previousOffset?: number;
}
