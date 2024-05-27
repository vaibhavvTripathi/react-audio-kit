# react-audio-kit

react-audio-kit is a react ui library that contains the web based audio components in a well abstracted form.

## Installation

Install my-project with npm

```bash
npm i react-audio-kit
```

In case, you are using typescript for development, make sure to do following change in your ts config file :

```bash
 {
  ...
  "compilerOptions": {
    ...
    "moduleResolution": "node",
    ...
  }
  ...
 }

```

## Components

react-audio-kit comes with the following components :

### Audio Player :

This component provides you a simplest way to handle your playlists and gives you various features like :

- Pause/ Play audio
- Seek buffered-audio
- Loop control
- Volume control
- Custom theming

#### Preview

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

#### Usage

By default, this queue-player takes the list of audios to play and internally manages the states of the queue.

```bash
import { AudioPlayer } from "react-audio-kit"; // import the component from library
import "react-audio-kit/style.css"; // don't forget to import the styles from the library

export default function Home() {
  return (
    <>
      <AudioPlayer audios={audios} />
    </>
  );
}
const audios = [
  {
    src: "https://previews.customer.envatousercontent.com/files/247158961/preview.mp3",
    img: undefined,
    subheading: "Subtitle 2",
  },
  {
    src: "https://previews.customer.envatousercontent.com/files/247158961/preview.mp3",
    img: undefined,
    subheading: "Subtitle 2",
  },
];

```

#### API

You can customize and use the AudioPlayer using following props :

| Prop                 | Type                                                                                            | Description                                                                                               | Default  |
| -------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------- |
| `audios`             | `Array<Audio>`                                                                                  | An array of audio objects to be played.                                                                   | -        |
| `getCurrentPlayback` | `(currentPlayback: CurrentPlaybackStateType & { bufferedProgressPercentage: number; }) => void` | A callback function that provides the current playback state, including the buffered progress percentage. | -        |
| `defaultPlayback`    | `CurrentPlaybackStateType`                                                                      | An object defining the default playback state.                                                            | -        |
| `preload`            | `"auto" \| "metadata" \| "none"`                                                                | Specifies if and how the audio should be preloaded.                                                       | `"auto"` |
| `theme`              | `Theme`                                                                                         | An object to customize the appearance of the audio player. See the `Theme` section below for details.     | -        |
| `hideImg`            | `boolean`                                                                                       | If true, hides the audio cover image.                                                                     | `false`  |
| `hideAudioName`      | `boolean`                                                                                       | If true, hides the audio name.                                                                            | `false`  |
| `hideLoopIcon`       | `boolean`                                                                                       | If true, hides the loop icon.                                                                             | `false`  |
| `onClickImage`       | `() => void`                                                                                    | A callback function triggered when the audio cover image is clicked.                                      | -        |
| `onClickTitle`       | `() => void`                                                                                    | A callback function triggered when the audio title is clicked.                                            | -        |
| `onClickSubtitle`    | `() => void`                                                                                    | A callback function triggered when the audio subtitle is clicked.                                         | -        |
| `borderRadius`       | `number`                                                                                        | Sets the border radius of the audio player.                                                               | -        |

### Theme

The `theme` object allows customization of the audio player's appearance:

| Property                    | Type      | Description                                           | Default |
| --------------------------- | --------- | ----------------------------------------------------- | ------- |
| `baseMediaButtonColor`      | `string`  | Color of the media buttons.                           | -       |
| `hoveredMediaButtonColor`   | `string`  | Color of the media buttons when hovered.              | -       |
| `mediaIconColor`            | `string`  | Color of the media icons.                             | -       |
| `background`                | `string`  | Background color of the audio player.                 | -       |
| `text`                      | `string`  | Text color.                                           | -       |
| `loaderColor`               | `string`  | Color of the loading spinner.                         | -       |
| `baseControlButtonColor`    | `string`  | Color of the control buttons.                         | -       |
| `hoveredControlButtonColor` | `string`  | Color of the control buttons when hovered.            | -       |
| `controlButtonIconColor`    | `string`  | Color of the control button icons.                    | -       |
| `shadow`                    | `boolean` | If true, applies a shadow effect to the audio player. | `false` |

### Audio

| Property     | Type     | Description                                                |
| ------------ | -------- | ---------------------------------------------------------- |
| `src`        | `string` | Address for the audio file                                 |
| `img`        | `string` | Image source (if any) for the respective image of the song |
| `heading`    | `string` | Title of the audio file                                    |
| `subheading` | `string` | Subtitle of the audio file                                 |

### CurrentPlaybackStateType

| Property      | Type      | Description                                             |
| ------------- | --------- | ------------------------------------------------------- |
| `progress`    | `number`  | The current progress of the audio file                  |
| `isPlaying`   | `boolean` | Whether the audio is currently playing                  |
| `volume`      | `number`  | The volume level of the audio                           |
| `activeIndex` | `number`  | The index of the currently active audio in the playlist |
| `loading`     | `boolean` | Whether the audio is currently loading                  |
| `isError`     | `boolean` | Whether there was an error during playback              |
| `looped`      | `boolean` | Whether the audio is set to loop                        |
