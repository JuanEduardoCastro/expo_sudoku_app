import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "./AppText";

const Loading = () => {
  const { styles } = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.text}> Loading ...</AppText>
    </SafeAreaView>
  );
};

export default Loading;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      ...textVar.xlargeBold,
      color: colors.text,
      letterSpacing: 1.5,
    },
  });
