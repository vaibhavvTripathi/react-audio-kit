import type { Meta, StoryObj } from "@storybook/react";
import { Lyrics } from ".";

const meta: Meta<typeof Lyrics> = {
  title: "Components/Lyrics",
  component: Lyrics,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

const dummyLyrics = [
  { value: "It's a beautiful day", duration: 2 },
  { value: "Don't let it get away", duration: 2 },
  { value: "It's a beautiful day", duration: 2 },
  { value: "Touch me, take me to that other place", duration: 2 },
  { value: "Teach me, yeah, I know I'm not a hopeless case", duration: 2 },
  // Repeat the existing entries or add new ones to reach a total of at least 30 entries
  { value: "See the world in green and blue", duration: 2 },
  { value: "See China right in front of you", duration: 2 },
  { value: "See the canyons broken by cloud", duration: 2 },
  { value: "See the tuna fleets clearing the sea out", duration: 2 },
  { value: "See the Bedouin fires at night", duration: 2 },
  { value: "See the oil fields at first light", duration: 2 },
  { value: "See the bird with a leaf in her mouth", duration: 2 },
  { value: "After the flood, all the colors came out", duration: 2 },
  { value: "It was a beautiful day", duration: 2 },
  { value: "Don't let it get away", duration: 2 },
  { value: "Beautiful day", duration: 2 },
  { value: "Touch me, take me to that other place", duration: 2 },
  { value: "Reach me, I know I'm not a hopeless case", duration: 2 },
  { value: "What you don't have, you don't need it now", duration: 2 },
  { value: "What you don't know, you can feel it somehow", duration: 2 },
  { value: "What you don't have, you don't need it now", duration: 2 },
  { value: "Don't need it now", duration: 2 },
  { value: "Was a beautiful day", duration: 2 },
  { value: "It was a beautiful day", duration: 2 },
  { value: "Yeah, yeah, yeah", duration: 2 },
  { value: "Touch me, take me to that other place", duration: 2 },
  { value: "Reach me, I know I'm not a hopeless case", duration: 2 },
  { value: "What you don't have, you don't need it now", duration: 2 },
  { value: "Was a beautiful day", duration: 2 },
  { value: "Oh, oh", duration: 2 },
];

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lyrics: dummyLyrics,
    hasStarted:true,
    height:"5em"
  },
};

export default meta;
