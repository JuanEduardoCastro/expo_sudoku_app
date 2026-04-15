import SettingsBlock from "@/components/settings/SettingsBlock";
import ButtonBack from "@/components/shared/ButtonBack";
import { H_PAD } from "@/constants/dimensions";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { styles } = useStyles(createStyles);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
        <Text style={styles.pageTitle}>Settings</Text>
      </View>

      <View style={{ height: 22 }} />

      <ScrollView
        scrollEnabled={false}
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
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
      justifyContent: "flex-start",
      padding: H_PAD,
    },
    header: {
      width: "100%",
      height: 30,
      flexDirection: "row",
      alignItems: "center",
      gap: 24,
    },
    pageTitle: {
      fontSize: 30,
      fontWeight: "700",
      color: colors.text,
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
      gap: 20,
    },
  });
