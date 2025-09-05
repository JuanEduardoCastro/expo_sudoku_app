import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type ButtonBackProps = {
  title?: string;
  onPress?: () => void;
};

const ButtonBack = ({ title, onPress }: ButtonBackProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={onPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
};

export default ButtonBack;

const styles = StyleSheet.create({
  container: {},
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#1c3a56",
    fontWeight: "semibold",
  },
});
