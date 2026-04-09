import { SHADOW } from "@/constants/shadows";
import { TColors } from "@/constants/types";
import useHaptic from "@/hooks/useHaptic";
import useStyles from "@/hooks/useStyles";
import { Pressable, StyleSheet, Text } from "react-native";

export type ButtonNavProps = {
  title?: string;
  onPress?: () => void;
};

const ButtonNav = ({ title, onPress }: ButtonNavProps) => {
  const { colors, styles } = useStyles(createStyles);
  const { onClickHapticHeavy } = useHaptic();

  const handleOnPress = () => {
    onPress && (onPress(), onClickHapticHeavy());
  };

  return (
    <Pressable style={[styles.buttonContainer, SHADOW.standar]} onPress={handleOnPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default ButtonNav;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      margin: 8,
    },
    buttonContainer: {
      backgroundColor: colors.surface,
      flex: 1,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.text, //TODO
      textAlign: "center",
    },
  });
