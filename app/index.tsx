import LevelBox from "@/components/LevelBox";
import ButtonNav from "@/components/shared/ButtonNav";
import { H_PAD } from "@/constants/dimensions";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const index = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>SUDOKU</Text>
        <Text style={styles.titleSubtex}>Think. Scan. Place.</Text>
      </View>
      <View style={{ height: 36 }} />
      <Text style={styles.sectionLabel}>Choose your level:</Text>
      <View style={{ height: 12 }} />
      <LevelBox />
      <View style={{ height: 28 }} />

      <View style={styles.buttonBox}>
        <ButtonNav title="Stats" onPress={() => router.push("/Stats")} />
        <ButtonNav title="Instructions" onPress={() => router.push("/Instructions")} />
        <ButtonNav title="Settings" onPress={() => router.push("/Settings")} />
      </View>
      {__DEV__ && (
        <View style={styles.buttonBox}>
          <ButtonNav title="TestSQLite" onPress={() => router.push("/TestSQLite")} />
          <ButtonNav title="DesignPreview" onPress={() => router.push("/DesignPreview")} />
        </View>
      )}
    </View>
  );
};

export default index;

export const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      padding: H_PAD,
      // gap: 12,
    },
    titleBox: {
      alignItems: "center",
      paddingTop: 28,
      gap: 6,
    },
    titleText: {
      fontSize: 42,
      fontWeight: "bold",
      letterSpacing: 10,
      color: colors.accentBase,
    },
    titleSubtex: {
      fontSize: 14,
      letterSpacing: 0.3,
      color: colors.textMuted,
    },
    sectionLabel: {
      fontSize: 12,
      fontWeight: "semibold",
      letterSpacing: 1.5,
      marginHorizontal: 10,
      color: colors.textMuted,
    },
    buttonBox: {
      flexDirection: "row",
      gap: 8,
      marginHorizontal: 8,
      marginBottom: 24,
    },
  });
