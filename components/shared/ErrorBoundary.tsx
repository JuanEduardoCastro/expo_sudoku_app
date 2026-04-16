import { moderateScale, scale, verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = { children: ReactNode };
type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    __DEV__ && console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.message}>The app encountered an unexpected error.</Text>
          <Pressable style={styles.button} onPress={() => this.setState({ hasError: false })}>
            <Text style={styles.buttonText}>Try again!</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: scale(24),
    gap: scale(16),
  },
  title: {
    ...textVar.xlargeBold,
  },
  message: {
    ...textVar.medium,
    textAlign: "center",
    color: "#666",
  },
  button: {
    backgroundColor: "#5B6AF0",
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
  },
  buttonText: {
    ...textVar.baseBold,
    color: "#fff",
  },
});
