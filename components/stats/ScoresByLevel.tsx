import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatsCard from "./StatsCard";

const ScoresByLevel = () => {
  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>Scores by level</Text>
      <View style={{ height: 8 }} />
      <StatsCard title="Level" value="Easy" />
      <StatsCard title="Max points" value="3.490" />
      <StatsCard title="Total games" value="20" />
      <StatsCard title="Best time" value="04.57" />
      <StatsCard title="Streak" value="10" />

      <View style={{ height: 8 }} />
      <StatsCard title="Level" value="Medium" />
      <StatsCard title="Max points" value="3.490" />
      <StatsCard title="Total games" value="20" />
      <StatsCard title="Best time" value="04.57" />
      <StatsCard title="Streak" value="10" />

      <View style={{ height: 8 }} />
      <StatsCard title="Level" value="Hard" />
      <StatsCard title="Max points" value="3.490" />
      <StatsCard title="Total games" value="20" />
      <StatsCard title="Best time" value="04.57" />
      <StatsCard title="Streak" value="10" />

      <View style={{ height: 8 }} />
      <StatsCard title="Level" value="Expert" />
      <StatsCard title="Max points" value="3.490" />
      <StatsCard title="Total games" value="20" />
      <StatsCard title="Best time" value="04.57" />
      <StatsCard title="Streak" value="10" />
    </View>
  );
};

export default ScoresByLevel;

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
