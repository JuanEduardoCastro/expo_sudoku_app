import React from "react";
import { StyleSheet, Text, View } from "react-native";

type StatsCardProps = {
  title: string;
  value: string;
};
const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <View style={styles.statsLine}>
      <Text style={styles.statsText}>{title}</Text>
      <Text style={styles.statsDinamicText}> {value} </Text>
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  statsLine: {
    flexDirection: "row",
    gap: 12,
  },
  statsText: {
    width: "40%",
    fontSize: 16,
    color: "#1c3a56",
    textAlign: "right",
  },
  statsDinamicText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1c3a56",
  },
});
