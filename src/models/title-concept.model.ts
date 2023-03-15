import type { Media } from "./game-media.model";

export interface TitleConcept {
  id: number;
  titleIds: string[];
  name: string;
  media: Media;
  genres: string[];
  localizedName: {
    defaultLanguage: string;
    metadata: {
      string: string;
    };
  };
  country: string;
  language: string;
}
