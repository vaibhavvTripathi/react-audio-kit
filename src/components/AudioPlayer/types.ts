export type Audio = {
  src: string; // address for the audio file
  img?: string; // img src(if any) for the respective image of the song
  heading?: string; // title of the audio file
  subheading?: string; // subtitle of the audio file
};
export type CurrentPlaybackStateType = {
  progress: number;
  isPlaying: boolean;
  volume: number;
  activeIndex: number;
  loading: boolean;
  isError: boolean;
  looped: boolean;
};
