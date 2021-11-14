export interface ProfileFromUserNameResponse {
  profile: {
    /**
     * The account's online username.
     *
     * @example
     * ```json
     * "onlineId": "Hakoom"
     * ```
     */
    onlineId: string;

    /**
     * The account's internal ID value, which can be used for numerous
     * calls to the PSN API.
     *
     * @example
     * ```json
     * "accountId": "962157895908076652"
     * ```
     */
    accountId: string;

    npId: string;
    avatarUrls: Array<{ size: string; avatarUrl: string }>;

    /** Whether or not the account is a PlayStation Plus subscriber. */
    plus: 0 | 1;
    aboutMe: string;
    languagesUsed: string[];

    /**
     * The account's trophy level, progress towards the next level,
     * and total number of trophies earned by type.
     */
    trophySummary: {
      level: number;
      progress: number;
      earnedTrophies: {
        bronze: number;
        silver: number;
        gold: number;
        platinum: number;
      };
    };

    isOfficiallyVerified: boolean;

    personalDetail: {
      firstName: string;
      lastName: string;
      profilePictureUrls: Array<{ size: string; profilePictureUrl: string }>;
    };

    personalDetailSharing: string;
    personalDetailSharingRequestMessageFlag: boolean;
    primaryOnlineStatus: string;

    presences: Array<{
      onlineStatus: string;
      hasBroadcastData: boolean;
      lastOnlineDate: string;
    }>;

    friendRelation: string;
    requestMessageFlag: boolean;

    /**
     * Whether or not the account is blocked by the retrieving authentication context.
     * For example, if you are using psn-api with _your_ account's access token, and
     * your account has blocked the account you're looking up, this will be `true`.
     */
    blocking: boolean;

    following: boolean;
    consoleAvailability: { availabilityStatus: string };
  };
}
