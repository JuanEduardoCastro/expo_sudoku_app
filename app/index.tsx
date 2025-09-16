import LevelBox from "@/components/LevelBox";
import ButtonNav from "@/components/shared/ButtonNav";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * The main entry point and home screen of the application.
 * It displays a welcome message, allows the user to select a game difficulty
 * via the `LevelBox` component, and provides navigation to the Stats and Instructions screens.
 */
const index = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>WELLCOME</Text>
        <Text style={styles.titleText}>SUDOKU APP</Text>
      </View>
      <View style={{ height: 80 }} />
      <View style={styles.subTitleBox}>
        <Text style={styles.subTitleText}>Choose your level:</Text>
      </View>
      <LevelBox />
      <View style={styles.buttonBox}>
        <ButtonNav title="Stats" onPress={() => router.push("/Stats")} />
        <ButtonNav title="Instructions" onPress={() => router.push("/Instructions")} />
      </View>
      <View style={styles.buttonBox}>
        <ButtonNav title="Settings" onPress={() => router.push("/Settings")} />
      </View>
    </View>
  );
};

export default index;

export const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    titleBox: {
      alignItems: "center",
      gap: 8,
    },
    titleText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#1c3a56",
    },
    subTitleBox: {},
    subTitleText: {
      fontSize: 24,
      color: "#1c3a56",
    },
    buttonBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },
  });
