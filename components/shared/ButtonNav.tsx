import { Pressable, StyleSheet, Text, View } from "react-native";

export type ButtonNavProps = {
  title?: string;
  onPress?: () => void;
};

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
