// import { gameScoresService, globalStatsService } from "@/store/dbServices";

// describe('Database Service', () => {
//   test('should save and retrieve game score', async () => {
//     const gameData = {
//       level: 1,
//       points: 100,
//       timeSeconds: 300,
//       errorCount: 0,
//       isPerfect: true,
//       isGood: true,
//       lostStreak: false,
//     };

//     const saved = await gameScoresService.create(gameData);
//     expect(saved.id).toBeDefined();
//     expect(saved.points).toBe(100);
//   });

//   test('should update global stats after game', async () => {
//     const before = await globalStatsService.get();

//     await gameScoresService.create({
//       level: 1,
//       points: 150,
//       timeSeconds: 200,
//       errorCount: 0,
//       isPerfect: true,
//       isGood: true,
//       lostStreak: false,
//     });

//     const after = await globalStatsService.get();
//     expect(after.totalGames).toBe(before.totalGames + 1);
//   });
// });
