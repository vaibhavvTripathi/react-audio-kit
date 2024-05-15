import type { Meta, StoryObj } from "@storybook/react";
import AudioRecorder from ".";

const meta: Meta<typeof AudioRecorder> = {
  title: "Components/AudioRecorder",
  component: AudioRecorder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: {
      base: "#FF69B4",
      hover: "#FF1493",
      auora: "#FFC0CB",
      iconColor: "#FFFFFF",
      
    },
  },
};

export default meta;
