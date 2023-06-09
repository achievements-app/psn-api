export interface BasicPresenceResponse {
  /**
   * The account's basic presence.
   *
   * @example
   * ```json
   *   basicPresence: {
   *   availability: 'availableToPlay',
   *   primaryPlatformInfo: {
   *     onlineStatus: 'online',
   *     platform: 'PS5',
   *     lastOnlineDate: '2023-06-03T21:25:28.987Z'
   *   },
   *   gameTitleInfoList: [
   *     {
   *       npTitleId: 'PPSA01521_00',
   *       titleName: 'Horizon Forbidden West',
   *       format: 'PS5',
   *       launchPlatform: 'PS5',
   *       conceptIconUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202010/2915/kifM3lnke5lExwRd96mIDojQ.png'
   *     }
   *   ]
   * }

   * ```
   */
  basicPresence: {
    availability: "unavailable" | "availableToPlay";
    lastAvailableDate?: string;
    primaryPlatformInfo: {
      onlineStatus: "online" | "offline";
      platform: "ps4" | "PS5";
      lastOnlineDate: string;
    };
    lastOnlineDate?: string;
    onlineStatus?: "offline" | "online";
    platform?: "ps4" | "PS5";
    gameTitleInfoList: {
      npTitleId: string;
      titleName: string;
      format: "ps4" | "PS5";
      launchPlatform: "ps4" | "PS5";
      npTitleIconUrl?: string;
      conceptIconUrl?: string;
    }[];
  };
}
