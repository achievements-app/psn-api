export interface GameMedia {
  audios: any[];
  videos: any[];
  images: [
    {
      url: string;
      format: string;
      type: string;
    }
  ];
}
