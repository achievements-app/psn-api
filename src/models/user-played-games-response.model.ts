export interface UserPlayedGamesResponse {
  /**
   * Individual object for each title returned.
   * Example: { titleId: "CUSA01433_00", name: "Rocket League®", ... }
   */
  titles: Array<{
    /**
     * ID for the specific version of the game played by the user.
     * @example "CUSA01433_00"
     */
    titleId: string;

    /**
     * Name of the game.
     * @example "Rocket League®"
     */
    name: string;

    /**
     * Name of the game (localized).
     * @example "Rocket League®"
     */
    localizedName: string;

    /**
     * URL for the game icon.
     * @example "https://image..."
     */
    imageUrl: string;

    /**
     * URL for the game icon (localized).
     * @example "https://image..."
     */
    localizedImageUrl: string;

    /**
     * Type of game.
     * @example "ps4_game" | "ps5_native_game" | "pspc_game" | "unknown"
     */
    category: string;

    /**
     * Is the game owned outright, or via a service entitlement.
     * @example "none" | "none_purchased" | "ps_plus"
     */
    service: string;

    /**
     * Number of times the game has been played.
     * @example 100
     */
    playCount: number;

    /**
     * The concept is a single identifier for the various versions of a game.
     * This object contains metadata including the conceptId and the various Title IDs for this game.
     */
    concept: {
      /**
       * Identifier for the concept.
       *
       * @example 10009763
       */
      id: number;

      /**
       * Various Title IDs for this game.
       *
       * @example ["PPSA20599_00", "PPSA20549_00"]
       */
      titleIds: string[];

      /**
       * Name of the game concept.
       *
       * @example "Zenless Zone Zero"
       */
      name: string;

      /**
       * Media related to the game concept, including images, videos, and audios.
       */
      media: {
        audios: unknown[];
        videos: unknown[];
        images: {
          /**
           * URL of the image.
           *
           * @example "https://image.api.playstation.com/vulcan/ap/rnd/202405/2210/4126b58375cb32a51dfdbfde8637daae8b971c3b10c3bc80.jpg"
           */
          url: string;

          /**
           * Format of the image.
           *
           * @example "UNKNOWN"
           */
          format: string;

          /**
           * Type of the image.
           *
           * @example "FOUR_BY_THREE_BANNER"
           */
          type: string;
        }[];
      };
    };

    /**
     * This object contains various URLs for screenshots and other media associated with the game.
     */
    media: {
      /**
       * Screenshot URL.
       * @example "https://image..."
       */
      screenshotUrl?: string;

      /**
       * Additional media URLs can be included here as needed.
       * @example { ... }
       */
      [key: string]: string | undefined;
    };

    /**
     * Date the game was first played.
     * @example "2015-07-10T19:40:19Z"
     */
    firstPlayedDateTime: string;

    /**
     * Date the game was most recently played.
     * @example "2024-08-03T19:28:27.12Z"
     */
    lastPlayedDateTime: string;

    /**
     * Time played accurate to 1 second.
     * Example: "PT228H56M33S"
     */
    playDuration: string;
  }>;

  /**
   * The total number of trophy titles for this account.
   * @example 300
   */
  totalItemCount: number;

  /**
   * See Support for Pagination.
   * @example 20
   */
  nextOffset: number;

  /**
   * See Support for Pagination.
   * @example 299
   */
  previousOffset: number;
}
