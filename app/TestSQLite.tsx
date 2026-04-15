import ButtonBack from "@/components/shared/ButtonBack";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { gameScoresService, globalStatsService, levelStatsService } from "@/store/dbServices";
import * as schema from "@/store/schema";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UserType = {
  id: number;
  name: string;
  email: string;
};

const TestSQLite = () => {
  const { styles } = useStyles(createStyles);
  const router = useRouter();
  const [dataFromDB, setDataFromDB] = useState<UserType[]>([]);
  const [gameScore, setGameScore] = useState<schema.GameScores[]>([]);
  const [globalStats, setGlobalStats] = useState<schema.GlobalStats[]>([]);
  const [levelStats, setLevelStats] = useState<schema.LevelStats[]>([]);

  const loadData = async () => {
    const scores = await gameScoresService.getRecent(30);
    const global = await globalStatsService.get();
    const levels = await levelStatsService.getAll();

    setGameScore(scores);
    setLevelStats(levels);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const testInsertGame = async () => {
    await gameScoresService.create({
      level: 1,
      points: 100,
      timeSeconds: 300,
      errorCount: 2,
      isPerfect: false,
      isGood: true,
      lostStreak: false,
    });

    await loadData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>SQLite</Text>
        <Button onPress={testInsertGame} title="Insert game" />
        <View style={{ height: 60 }} />
        <FlatList
          data={dataFromDB}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 34 }}>
              <Text style={styles.ruleText}>{item.name}</Text>
              <Text style={styles.ruleText}>{item.email}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default TestSQLite;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
    },
    header: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      gap: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
      textAlign: "center",
    },
    ruleText: {
      fontSize: 18,
      color: colors.text,
      lineHeight: 26,
    },
  });
