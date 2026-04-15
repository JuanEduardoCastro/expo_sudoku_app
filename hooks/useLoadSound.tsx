import { settingsService } from "@/store/dbServices";
import { useAudioPlayer } from "expo-audio";
import { useCallback, useEffect, useState } from "react";

const audioClip = require("./../assets/sounds/select-3124.wav");

const useLoadSound = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const loadSoundSetting = async () => {
      try {
        const storedValue = await settingsService.get("soundEnabled");
        if (storedValue !== null) {
          setSoundEnabled(JSON.parse(storedValue));
        }
      } catch (error) {
        __DEV__ && console.error("Failed to load sound setting from storage", error);
      }
    };
    loadSoundSetting();
  }, []);

  const player = useAudioPlayer(audioClip);

  const playSound = useCallback(async () => {
    if (!soundEnabled) return;
    player.seekTo(0);
    player.play();
  }, [player]);

  return { playSound, soundEnabled, setSoundEnabled };
};

export default useLoadSound;
