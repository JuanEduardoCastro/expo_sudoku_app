import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Loading = () => {
  const { styles } = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> Loading ...</Text>
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
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: 1.5,
    },
  });
