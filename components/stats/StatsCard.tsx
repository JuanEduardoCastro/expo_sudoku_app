import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Props for the `StatsCard` component.
 */
type StatsCardProps = {
  /** The label for the statistic being displayed (e.g., "Max points"). */
  title: string;
  /** The value of the statistic. Can be a string or a number. */
  value: string | number;
};
/**
 * A simple component to display a single line of statistics with a title and a value.
 */
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
