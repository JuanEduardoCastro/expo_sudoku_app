import { settingsService } from "@/store/dbServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MIGRATION_KEY = "__settings_migrate__";

export async function migrateSettings(): Promise<void> {
  const migrate = await AsyncStorage.getItem(MIGRATION_KEY);

  if (migrate === "true") {
    console.log("Settings already migrated");
    return;
  }

  try {
    console.log("Migrating settings from AsyncStorage to SQLite...");

    const colorMode = await AsyncStorage.getItem("colorMode");
    if (colorMode) {
      await settingsService.set("colorMode", colorMode);
    }

    const vibEnabled = await AsyncStorage.getItem("vibEnabled");
    if (vibEnabled) {
      await settingsService.set("vibEnabled", vibEnabled);
    }

    await AsyncStorage.setItem(MIGRATION_KEY, "true");
    console.log("Settings migrated successfully");
  } catch (error) {
    console.error("Settings migration failed:", error);
  }
}
