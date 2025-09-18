import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { useCallback, useEffect, useState } from "react";

/**
 * A custom hook to manage loading and playing a sound effect.
 * It loads the sound once and provides a function to play it,
 * ensuring the sound is unloaded on component unmount to prevent memory leaks.
 *
 * @returns An object containing the `playSound` function.
 */
const useLoadSound = () => {
  /** State to hold the loaded sound object. */
  const [sound, setSound] = useState<Sound | null>(null);

  /**
   * Effect to load the sound when the hook is first used and unload it on cleanup.
   */
  useEffect(() => {
    let isMounted = true;
    /**
     * Asynchronously loads the sound file.
     */
    const loadSound = async () => {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require("./../assets/sounds/select-3124.wav")
        );
        if (isMounted) {
          setSound(newSound);
        }
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    };

    loadSound();

    return () => {
      isMounted = false;
      sound?.unloadAsync();
    };
  }, []);

  /**
   * Plays the loaded sound effect. If the sound is already playing, it will be stopped and restarted.
   */
  const playSound = useCallback(async () => {
    if (sound) {
      await sound.replayAsync();
    }
  }, [sound]);

  return { playSound };
};

export default useLoadSound;
