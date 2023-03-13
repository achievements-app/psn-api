import { TitlePlatform } from "./title-platform.model";

export interface RecentlyPlayedGame {
  /** GrahpQL object type/schema */
  __typename: "GameLibraryTitle";

  /** Contains a url to a game icon file. */
  image: {
    __typename: "Media";
    url: string;
  };

  /**
   * Unclear what this represents, but if this is set to true then
   * the productId property is not null.
   */
  isActive: boolean | null;

  /**
   * An ISO date representing the last play date and time
   * of the given title, e.g 2023-03-10T01:01:01.390000Z
   */
  lastPlayedDateTime: string;

  /** The name of the game */
  name: string;

  /**
   * The platform this game was last played on. This can be reported as
   * "UNKNOWN". It appears that "UNKNOWN" is shown in certain scenarios
   * when a user that isn't associated with the access token is sharing
   * the same console as the user that is identified by the access token.
   */
  platform: TitlePlatform | "UNKNOWN";

  /**
   * ID of the product. Used in the PlayStation Store URL. Appears to only be
   * set for certain PS4 games along with the entitlementId.
   */
  productId: string | null;

  /**
   * Similar to productId. Used in URLs for the PlayStation Store, i.e
   * store.playstation.com/en-ae/product/:entitlementId. Appears to only
   * be set for certain entries on the PS4 platform along with productId.
   */
  entitlementId: string | null;

  /**
   * ID of the product. Forms part of a PlayStation Store URL, e.g
   * https://store.playstation.com/en-us/product/UP9000-$titleId-RATCHETCLANKRIFT
   */
  titleId: string;

  /**
   * An ID for titles on the PlayStation store. It's used in the
   * URL, i.e store.playstation.com/ko-kr/concept/:conceptId
   */
  conceptId: string;

  /** Unsure what data this can hold. Perhaps it's PS Now related? */
  subscriptionService: "NONE" | string;
}

export interface RecentlyPlayedGamesResponse {
  data: {
    gameLibraryTitlesRetrieve: {
      __typename: "GameList";
      games: RecentlyPlayedGame[];
    };
  };
}
