import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useState } from "react";

const VIBRATION_ENABLED_KEY = "vibEnabled";

/**
 * A custom hook to manage haptic feedback based on a user-configurable setting
 * stored in AsyncStorage.
 *
 * @returns An object containing:
 * - `onClickHapticHeavy`: A function to trigger a heavy haptic impact if enabled.
 * - `onClickHapticMedium`: A function to trigger a medium haptic impact if enabled.
 * - `vibEnabled`: A boolean indicating if vibrations are currently enabled.
 * - `setVibEnabled`: A function to update the vibration setting and persist it.
 */
const useHaptic = () => {
  const [vibEnabled, setVibEnabled] = useState<boolean>(true);

  /**
   * Effect to load the vibration setting from AsyncStorage on initial mount.
   * Defaults to `true` if no setting is found.
   */
  useEffect(() => {
    const loadVibrationSetting = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(VIBRATION_ENABLED_KEY);
        // If a value is stored, parse it. Otherwise, default to true.
        if (storedValue !== null) {
          setVibEnabled(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error("Failed to load vibration setting from storage", error);
      }
    };
    loadVibrationSetting();
  }, []);

  /**
   * Triggers a heavy haptic impact if vibrations are enabled.
   */
  const onClickHapticHeavy = useCallback(() => {
    if (vibEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [vibEnabled]);

  /**
   * Triggers a medium haptic impact if vibrations are enabled.
   */
  const onClickHapticMedium = useCallback(() => {
    if (vibEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [vibEnabled]);

  /**
   * Updates the vibration setting in both the component state and AsyncStorage.
   * Mimics the signature of a React state setter.
   */
  const setVibEnabledAndPersist = useCallback(
    async (value: boolean | ((prevState: boolean) => boolean)) => {
      const newValue = value instanceof Function ? value(vibEnabled) : value;
      setVibEnabled(newValue);
      await AsyncStorage.setItem(VIBRATION_ENABLED_KEY, JSON.stringify(newValue));
    },
    [vibEnabled]
  );

  return {
    onClickHapticHeavy,
    onClickHapticMedium,
    vibEnabled,
    setVibEnabled: setVibEnabledAndPersist,
  };
};

export default useHaptic;
