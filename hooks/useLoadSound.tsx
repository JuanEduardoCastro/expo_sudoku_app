import { useAudioPlayer } from "expo-audio";
import { useCallback } from "react";

const audioClip = require("./../assets/sounds/select-3124.wav");

const useLoadSound = () => {
  const player = useAudioPlayer(audioClip);

  const playSound = useCallback(async () => {
    player.seekTo(0);
    player.play();
  }, [player]);

  return { playSound };
};

export default useLoadSound;
