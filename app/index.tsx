import LevelBox from "@/components/LevelBox";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const index = () => {
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
    </View>
  );
};

export default index;

export const styles = StyleSheet.create({
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
});
