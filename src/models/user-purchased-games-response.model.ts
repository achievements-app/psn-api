import { TitlePlatform } from "./title-platform.model";

export interface GetUserPurchasedGamesResponse {
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
      /**
       * The list of games in the library.
       */
      games: Array<PurchasedGame>;
    };
  };
}

export interface PurchasedGame {
  /**
   * The type of resource retrieved.
   *
   * @example
   * ```json
   * "__typename": "GameLibraryTitle"
   * ```
   */
  __typename: string;

  /**
   * The ID of the concept.
   * Most probably it will be of value null.
   */
  conceptId: null | unknown;

  /**
   * The ID of the entitlement.
   *
   * @example
   * ```json
   * "entitlementId": "UP4433-CUSA18779_00-DUNGEONSPS400000"
   * ```
   */
  entitlementId: string | null;

  /**
   * The image of the game.
   *
   * @example
   * ```
   * image: {
   *   type: "Media",
   *   url: "https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA10410_00/2/i_b0afbd729d451429a45edf10e597d7b5af1a5f2a333fde963615e7a62d4d8174/i/icon0.png"
   * }
   * ```
   */
  image: GameImage;

  /**
   * Whether the game is active or not.
   */
  isActive: boolean | null;

  /**
   * Whether the game is downloadable or not.
   */
  isDownloadable: boolean;

  /**
   * Whether the game is available for pre-order or not.
   */
  isPreOrder: boolean;

  /**
   * The name of the game.
   *
   * @example
   * ```
   * name: "The Last of Us Part II"
   * ```
   */
  name: string;

  /**
   * The platform on which the game is available.
   *
   * @example
   * ```
   * platform: "PS4"
   * ```
   */
  platform: TitlePlatform | "UNKNOWN";

  /**
   * The ID of the product.
   *
   * @example
   * ```
   * productId: "UP4433-CUSA18779_00"
   * ```
   */
  productId: string | null;

  /**
   * The subscription service associated with the game.
   *
   * @example
   * ```
   * subscriptionService: "PS_PLUS"
   * ```
   */
  subscriptionService: "NONE" | string;

  /**
   * The ID of the title.
   *
   * @example
   * ```
   * titleId: "CUSA18779"
   * ```
   */
  titleId: string;
}

export interface GameImage {
  __typename: string;
  url: string;
}
