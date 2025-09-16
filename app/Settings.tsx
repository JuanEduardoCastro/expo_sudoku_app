import ButtonBack from "@/components/shared/ButtonBack";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

const Settings = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
      </View>
      <View style={styles.content}></View>
    </SafeAreaView>
  );
};

export default Settings;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
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
    content: {
      flex: 1,
      paddingHorizontal: 24,
      gap: 20,
    },
  });
