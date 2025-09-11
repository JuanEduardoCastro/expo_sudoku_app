import ButtonBack from "@/components/shared/ButtonBack";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

const Instructions = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
