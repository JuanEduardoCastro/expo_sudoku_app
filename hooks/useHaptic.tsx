import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";

const useHaptic = () => {
  const [vibEnabled, setVibEnabled] = useState<boolean>(true);

  useEffect(() => {
    const checkLocalStorage = async () => {
      const checkInLocalStorage = await AsyncStorage.getItem("vibEnabled");
      checkInLocalStorage ? setVibEnabled(true) : setVibEnabled(false);
    };
    checkLocalStorage();
  }, []);

  const onClickHapticHeavy = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const onClickHapticMedium = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return { onClickHapticHeavy, onClickHapticMedium, vibEnabled, setVibEnabled };
};

export default useHaptic;
