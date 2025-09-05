import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const LevelBox = () => {
  const router = useRouter();
  return (
    <View style={styles.levelBox}>
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.05 } })}>
        <Text style={styles.levelText}>For test</Text>
      </Pressable>
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.54 } })}>
        <Text style={styles.levelText}>Easy</Text>
      </Pressable>
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.6 } })}>
        <Text style={styles.levelText}>Medium</Text>
      </Pressable>
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.65 } })}>
        <Text style={styles.levelText}>Hard</Text>
      </Pressable>
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.7 } })}>
        <Text style={styles.levelText}>Expert</Text>
      </Pressable>
    </View>
  );
};

export default LevelBox;

const styles = StyleSheet.create({
  levelBox: {
    width: "70%",
    paddingHorizontal: 26,
    paddingVertical: 22,
    gap: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1c3a56",
  },
});
