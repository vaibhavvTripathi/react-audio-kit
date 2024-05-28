import type { Meta, StoryObj } from "@storybook/react";
import { PlaylistManager } from ".";
// import ncs from "../../ncs.mp3";

const meta: Meta<typeof PlaylistManager> = {
  title: "Components/AudioPlayer",
  component: PlaylistManager,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

const audioData = [
  {
    src: "https://previews.customer.envatousercontent.com/files/247158961/preview.mp3",
    img: undefined,
    subheading: "Subtitle 2",
  },
  {
    src: "https://ucarecdn.com/92025d67-677-4148-8284-2d7e03306d4c/detroitkeys.mp3",
    img: "https://sm.mashable.com/t/mashable_in/photo/default/arijit-singh-copy_ddzh.1248.jpg",
    subheading: "Subtitle 1",
  },
  // {
  //   src: ncs,
  //   img: "https://i.ndtvimg.com/i/2015-07/aa_640x480_81435810676.jpg",

  //   subheading: "Subtitle 3",
  // },
  // {
  //   src: ncs,
  //   img: "https://static.toiimg.com/thumb/msid-53685247,width-400,resizemode-4/53685247.jpg",

  //   subheading: "Subtitle 4",
  // },
  // {
  //   src: ncs,
  //   img: "https://m.media-amazon.com/images/M/MV5BMTNmMTQ2YzMtYzU0MS00NTI2LTk3MTgtOTI5MDgyNDc3ZDFkXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
  // },
];

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    audios: audioData,
    getCurrentPlayback: (cpb) => {
      console.log(cpb);
    },
    theme: {
      baseMediaButtonColor: "#FF69B4",
      hoveredMediaButtonColor: "#FF1493",
      mediaIconColor: "white",
      text: "black",
      loaderColor: "pink",
      shadow: true,
    },
  },
};

export default meta;
