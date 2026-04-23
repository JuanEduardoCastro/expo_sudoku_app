import SettingsBlock from "@/components/settings/SettingsBlock";
import ButtonBack from "@/components/shared/ButtonBack";
import { H_PAD, scale, verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { styles } = useStyles(createStyles);
  const router = useRouter();

  const version = Constants.nativeAppVersion ?? Constants.expoConfig?.version ?? "0.1.0(*)";
  const build = Constants.nativeBuildVersion ?? "dev";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
        <Text style={styles.pageTitle}>Settings</Text>
      </View>

      <View style={{ height: verticalScale(22) }} />

      <ScrollView
        scrollEnabled={false}
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <SettingsBlock />
        </View>
      </ScrollView>
      <View style={styles.versionBox}>
        <Text style={styles.versionText}>
          v{version} ({build})
        </Text>
      </View>
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
      paddingTop: Platform.OS === "android" ? 34 : null,
    },
    header: {
      width: "100%",
      height: verticalScale(36),
      flexDirection: "row",
      alignItems: "center",
      gap: scale(24),
    },
    pageTitle: {
      ...textVar.titleBold,
      color: colors.text,
    },
    content: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: scale(20),
    },
    versionBox: {
      alignItems: "center",
      paddingVertical: verticalScale(12),
    },
    versionText: {
      ...textVar.mediumBold,
      color: colors.textMuted,
      letterSpacing: 1.3,
    },
  });
