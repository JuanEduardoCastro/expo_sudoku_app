import { useAudioPlayer } from "expo-audio";
import { useCallback } from "react";

/** The audio clip to be played by the hook. */
const audioClip = require("./../assets/sounds/select-3124.wav");

/**
 * A custom hook that simplifies playing a sound effect using `expo-audio`.
 *
 * It leverages the `useAudioPlayer` hook to manage the lifecycle of an audio
 * player instance for a specific sound clip. This ensures the sound is loaded
 * efficiently and unloaded automatically when the component unmounts, preventing
 * memory leaks.
 *
 * @returns An object containing the `playSound` function.
 */
const useLoadSound = () => {
  /**
   * Initializes an audio player for the given sound clip.
   * `useAudioPlayer` handles loading the asset and managing the player's lifecycle.
   */
  const player = useAudioPlayer(audioClip);

  /**
   * Plays the loaded sound effect from the beginning.
   * If the sound is already playing, it will be restarted.
   */
  const playSound = useCallback(async () => {
    player.seekTo(0);
    player.play();
  }, [player]);

  return { playSound };
};

export default useLoadSound;
