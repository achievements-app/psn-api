import type { GameConcept } from "./title-concept.model";
import type { Media } from "./game-media.model";

export interface GetUserPlayedTimeResponse {
  /** The title ID of this game 
      @example CUSA26431_00
      */
  titleId: string;

  /** Default name for the title */
  name: string;

  /** Localized name for the title */
  localizedName: string;

  /** URL to game's console launch screen, from image.api.playstation.com */
  imageUrl: string;

  /** URL to localized game's console launch screen. Will default to imageUrl if not unique */
  localizedImageUrl: string;

  /** Type of game being played. Can be ps5_native_game, ps4_game or none */
  category: string;

  /** Service where this game was acquired from: EA Access, none(purchased/none_purchased, ps_plus, other, */
  service: string;

  /** Metadata about this game, including titleIds and localization for other regions, genres, name and id */
  concept: GameConcept;

  /** An object with audio, video, images properties that will contain arrays of objects with URL, format and type properties */
  media: Media;

  /** A Date object in ISO format */
  firstPlayedDateTime: Date;

  /** A Date object in ISO format */
  lastPlayedDateTime: Date;

  /**
   * @example `"PT11H16M43S"`
   */
  playDuration: string;
}
