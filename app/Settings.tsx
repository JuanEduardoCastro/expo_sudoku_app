import SettingsBlock from "@/components/settings/SettingsBlock";
import ButtonBack from "@/components/shared/ButtonBack";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
      </View>
      <Text style={styles.statsTitle}>Settings</Text>
      <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SettingsBlock />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
    statsTitle: {
      width: "100%",
      paddingHorizontal: 16,
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    content: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 24,
      gap: 20,
    },
  });
