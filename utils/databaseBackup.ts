import { gameScoresService, globalStatsService, levelStatsService } from "@/store/dbServices";
import { File, Path } from "expo-file-system/next";
import * as Sharing from "expo-sharing";

export async function exportDatabaseToJSON(): Promise<string> {
  const data = {
    exportDate: new Date().toISOString(),
    gameScores: await gameScoresService.getAll(),
    globalStats: await globalStatsService.get(),
    levelStats: await levelStatsService.getAll(),
  };

  const json = JSON.stringify(data, null, 2);
  const file = new File(Path.document, "sudoku_backup.json");
  await file.write(json);
  return file.uri;
}

export async function shareBackup(): Promise<void> {
  const fileUri = await exportDatabaseToJSON();
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  } else {
    __DEV__ && console.log("Sharing not available");
  }
}
