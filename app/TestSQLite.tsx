import ButtonBack from "@/components/shared/ButtonBack";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UserType = {
  id: number;
  name: string;
  email: string;
};

const TestSQLite = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();
  const [dataFromDB, setDataFromDB] = useState<UserType[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const database = useSQLiteContext();

  const onClick = async () => {
    console.log("onClick");
    try {
      database.runAsync("INSERT INTO users (name, email) VALUES (?, ?);", [
        "trujillo",
        "trujillomail@mail.com",
      ]);
    } catch (error) {
      console.log("XX -> TestSQLite.tsx:23 -> error :", error);
    }
  };

  const loadData = async () => {
    console.log("loadData");
    const dataLoaded = await database.getAllAsync<UserType>("SELECT * FROM users;");
    setDataFromDB(dataLoaded);
    console.log("dataLoaded ------->", dataLoaded);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>SQLite</Text>
        <Button onPress={onClick} title="Insert" />
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
