export interface GetUserFriendsAccountIdsResponse {
  /** A list of `accountId` values corresponding to accounts on the target user's friend list. */
  friends: string[];

  /** The total number of friends the target user has on their friends list. */
  totalItemCount: number;

  nextOffset?: number;
  previousOffset?: number;
}
