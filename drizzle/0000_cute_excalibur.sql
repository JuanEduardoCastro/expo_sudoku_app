CREATE TABLE `game_scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` integer NOT NULL,
	`points` integer NOT NULL,
	`time_seconds` integer NOT NULL,
	`error_count` integer DEFAULT 0 NOT NULL,
	`is_perfect` integer DEFAULT false NOT NULL,
	`is_good` integer DEFAULT false NOT NULL,
	`lost_streak` integer DEFAULT false NOT NULL,
	`completed_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `global_stats` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`max_points` integer DEFAULT 0 NOT NULL,
	`total_games` integer DEFAULT 0 NOT NULL,
	`perfect_games` integer DEFAULT 0 NOT NULL,
	`good_games` integer DEFAULT 0 NOT NULL,
	`completed_games` integer DEFAULT 0 NOT NULL,
	`total_time_play` integer DEFAULT 0 NOT NULL,
	`update_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `level_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` integer NOT NULL,
	`name` text NOT NULL,
	`max_points` integer DEFAULT 0 NOT NULL,
	`total_games` integer DEFAULT 0 NOT NULL,
	`best_time` integer DEFAULT 0 NOT NULL,
	`current_streak` integer DEFAULT 0 NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `level_stats_level_unique` ON `level_stats` (`level`);--> statement-breakpoint
CREATE TABLE `saved_games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` integer NOT NULL,
	`board_state` text NOT NULL,
	`solution_state` text NOT NULL,
	`current_score` integer NOT NULL,
	`current_error` integer NOT NULL,
	`elapsed_time` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`update_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `settings_key_unique` ON `settings` (`key`);