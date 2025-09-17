import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useHaptic from "@/hooks/useHaptic";
import useStyles from "@/hooks/useStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";

/**
 * Props for the `ButtonNav` component.
 */
export type ButtonNavProps = {
  /** The text to display on the button. */
  title?: string;
  /** Function to be called when the button is pressed. */
  onPress?: () => void;
};

/**
 * A general-purpose navigation button.
 * Used on the home screen to navigate to different sections like "Stats" or "Instructions".
 */
const ButtonNav = ({ title, onPress }: ButtonNavProps) => {
  const { colors, styles } = useStyles(createStyles);
  const { onClickHapticHeavy } = useHaptic();

  const handleOnPress = () => {
    onPress && (onPress(), onClickHapticHeavy());
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleOnPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default ButtonNav;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      margin: 8,
    },
    button: {
      backgroundColor: colors.button,
      padding: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    buttonText: {
      ...textVar.base,
      color: colors.dark, //TODO
      textAlign: "center",
    },
  });
