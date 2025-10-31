import { Membership } from "./membership.model";
import { TitlePlatform } from "./title-platform.model";

export interface PurchasedGame {
  /** GraphQL object type/schema */
  __typename: "GameLibraryTitle";

  /** Unique concept identifier for the game */
  conceptId: string | null;

  /** Unique entitlement identifier */
  entitlementId: string;

  /** Contains a url to a game icon file */
  image: {
    __typename: "Media";
    url: string;
  };

  /** Whether the game is currently active */
  isActive: boolean;

  /** Whether the game is downloadable */
  isDownloadable: boolean;

  /** Whether the game is a pre-order */
  isPreOrder: boolean;

  /** The membership level associated with this game */
  membership: Membership;

  /** The name of the game */
  name: string;

  /** The platform this game is available on */
  platform: TitlePlatform;

  /** Unique product identifier */
  productId: string;

  /** Unique title identifier */
  titleId: string;
}

export interface PurchasedGamesResponse {
  data: {
    purchasedTitlesRetrieve: {
      __typename: "GameList";
      games: PurchasedGame[];
    };
  };
}
