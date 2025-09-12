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
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default ButtonNav;

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});
