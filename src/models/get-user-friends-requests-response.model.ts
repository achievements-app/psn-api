export interface GetUserFriendsRequestsResponse {
  /** A list of `accountId` values corresponding to accounts that have sent friend requests to the user. */
  receivedRequests: string[];

  /** The total number of friend requests the user has received. */
  totalItemCount: number;
}
