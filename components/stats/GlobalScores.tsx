import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatsCard from "./StatsCard";

const GlobalScores = () => {
  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>Global scores</Text>
      <View style={{ height: 8 }} />
      <StatsCard title="Max points" value="3.490" />
      <StatsCard title="Total games" value="20" />
      <StatsCard title="Perfect games" value="50" />
      <StatsCard title="Good games" value="30" />
      <StatsCard title="Complete games" value="90" />
      <StatsCard title="Total time played" value="330.456" />
    </View>
  );
};

export default GlobalScores;

const styles = StyleSheet.create({
  statsSection: {
    width: "100%",
    gap: 4,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c3a56",
  },
});
