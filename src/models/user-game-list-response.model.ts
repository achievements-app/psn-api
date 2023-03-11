
export interface GameListResponseGame {
  __typename: "GameLibraryTitle";
  conceptId: string;
  entitlementId: string|null;
  image: {
    __typename: "Media";
    url: string
  };
  isActive: boolean|null;
  lastPlayedDateTime: string;
  name: string;
  platform: "PS4"|"PS5";
  productId: string|null;
  subscriptionService: string;
  titleId: string
}

export interface UserGameListResponse {
  data: {
    gameLibraryTitlesRetrieve: {
      __typename: "GameList",
      games: GameListResponseGame[]
    }
  }
}