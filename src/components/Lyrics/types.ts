export type Lyric = {
  value: string;
  duration: number;
};

export type LyricsPropType = {
  lyrics: Array<Lyric>;
  hasStarted: boolean;
  height: string;
};
