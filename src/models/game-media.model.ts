export interface Media {
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
