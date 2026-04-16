import { moderateScale, verticalScale } from "@/constants/dimensions";
import { SHADOW } from "@/constants/shadows";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useHaptic from "@/hooks/useHaptic";
import useStyles from "@/hooks/useStyles";
import { Pressable, StyleSheet, Text } from "react-native";

export type ButtonNavProps = {
  title?: string;
  onPress?: () => void;
};

const ButtonNav = ({ title, onPress }: ButtonNavProps) => {
  const { styles } = useStyles(createStyles);
  const { onClickHapticHeavy } = useHaptic();

  const handleOnPress = () => {
    if (onPress) {
      onPress();
      onClickHapticHeavy();
    }
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
      height: verticalScale(44),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: moderateScale(12),
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonText: {
      ...textVar.medium,
      color: colors.text,
      textAlign: "center",
    },
  });
