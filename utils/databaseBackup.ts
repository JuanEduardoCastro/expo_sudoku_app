import { gameScoresService, globalStatsService, levelStatsService } from "@/store/dbServices";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function exportDatabaseToJSON(): Promise<string> {
  const data = {
    exportDate: new Date().toISOString(),
    gameScores: await gameScoresService.getAll(),
    globalStats: await globalStatsService.get(),
    levelStats: await levelStatsService.getAll(),
  };

  const json = JSON.stringify(data, null, 2);
  const fileUri = FileSystem.documentDirectory + "sudoku_backup.json";

  await FileSystem.writeAsStringAsync(fileUri, json);

  return fileUri;
}

export async function shareBackup(): Promise<void> {
  const fileUri = await exportDatabaseToJSON();
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  } else {
    console.log("Sharing not available");
  }
}
