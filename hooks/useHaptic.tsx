import { settingsService } from "@/store/dbServices";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useState } from "react";

const VIBRATION_ENABLED_KEY = "vibEnabled";

const useHaptic = () => {
  const [vibEnabled, setVibEnabled] = useState<boolean>(true);

  useEffect(() => {
    const loadVibrationSetting = async () => {
      try {
        const storedValue = await settingsService.get(VIBRATION_ENABLED_KEY);
        if (storedValue !== null) {
          setVibEnabled(JSON.parse(storedValue));
        }
      } catch (error) {
        __DEV__ && console.error("Failed to load vibration setting from storage", error);
      }
    };
    loadVibrationSetting();
  }, []);

  const onClickHapticHeavy = useCallback(() => {
    if (vibEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [vibEnabled]);

  const onClickHapticMedium = useCallback(() => {
    if (vibEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [vibEnabled]);

  const onGameCompleteHaptic = useCallback(() => {
    if (vibEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [vibEnabled]);

  const setVibEnabledAndPersist = useCallback(
    async (value: boolean | ((prevState: boolean) => boolean)) => {
      const newValue = value instanceof Function ? value(vibEnabled) : value;
      setVibEnabled(newValue);
      await settingsService.set(VIBRATION_ENABLED_KEY, JSON.stringify(newValue));
    },
    [vibEnabled],
  );

  return {
    onClickHapticHeavy,
    onClickHapticMedium,
    onGameCompleteHaptic,
    vibEnabled,
    setVibEnabled: setVibEnabledAndPersist,
  };
};

export default useHaptic;
