export interface GamesLibraryForUserResponse {
  data: {
    purchasedTitlesRetrieve: {
      /**
       * The type of resource retrieved
       *
       * @example
       * ```json
       * "__typename": "GameList"
       * ```
       */
      __typename: string;
      games: Array<GameLibraryTitle>;
    };
  };
}

export interface GameLibraryTitle {
  /**
   * The type of resource retrieved
   *
   * @example
   * ```json
   * "__typename": "GameLibraryTitle"
   * ```
   */
  __typename: string;
  /** The ID of the concept. Most probably it will be of value null */
  conceptId: null | unknown;
  /**
   * The ID of the entitlement
   *
   * @example
   * ```json
   * "entitlementId": "UP4433-CUSA18779_00-DUNGEONSPS400000"
   * ```
   */
  // TODO: describe with examples the format for different fields
  entitlementId: string;
  image: GameLibraryImage;
  isActive: boolean;
  isDownloadable: boolean;
  isPreOrder: boolean;
  name: string;
  platform: string;
  productId: string;
  subscriptionService: string;
  titleId: string;
}

export interface GameLibraryImage {
  __typename: string;
  url: string;
}
