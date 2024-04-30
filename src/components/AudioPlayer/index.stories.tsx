import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import AudioPlayer, { AudioPlayerProps } from "../AudioPlayer/index"; // adjust the path based on your project structure
import ncs from "../../ncs.mp3";
export default {
  title: "Components/AudioPlayer",
  component: AudioPlayer,
} as Meta;

const Template: StoryFn<AudioPlayerProps> = (args) => <AudioPlayer {...args} />;

const audioData = [
  {
    src: "https://previews.customer.envatousercontent.com/files/247158961/preview.mp3",
    img: undefined,
    heading: "Audio 2",
    subheading: "Subtitle 2",
  },
  {
    src: "https://ucarecdn.com/92025d67-677-4148-8284-2d7e03306d4c/detroitkeys.mp3",
    img: "https://sm.mashable.com/t/mashable_in/photo/default/arijit-singh-copy_ddzh.1248.jpg",
    heading: "Audio 1",
    subheading: "Subtitle 1",
  },
  {
    src: ncs,
    img: "https://i.ndtvimg.com/i/2015-07/aa_640x480_81435810676.jpg",
    heading: "Audio 3",
    subheading: "Subtitle 3",
  },
  {
    src: ncs,
    img: "https://static.toiimg.com/thumb/msid-53685247,width-400,resizemode-4/53685247.jpg",
    heading: "Audio 4",
    subheading: "Subtitle 4",
  },
  {
    src: ncs,
    img: "https://m.media-amazon.com/images/M/MV5BMTNmMTQ2YzMtYzU0MS00NTI2LTk3MTgtOTI5MDgyNDc3ZDFkXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
    heading: "Audio 5",
    subheading: "Subtitle 5",
  },
];

export const Default = Template.bind({});
Default.args = {
  audios: audioData,
  activeAudioIndex: 0, // Index of the initially active audio
};
