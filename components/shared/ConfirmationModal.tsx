import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

/**
 * Props for the `ConfirmationModal` component.
 */
type ConfirmationModalProps = {
  /** Controls the visibility of the modal. */
  visible: boolean;
  /** Function to close the modal, typically by pressing the 'X' button. */
  handleOpenModal: () => void;
  /** The title of the modal. @deprecated This prop is not currently used. */
  title?: string;
  /** The main message or question to display in the modal body. */
  content?: string;
  /** Determines if the cancel button should be displayed. Defaults to `true`. */
  cancel?: boolean;
  /** The text for the cancel button. Defaults to "Cancel". */
  cancelText?: string;
  /** Function to execute when the cancel button is pressed. */
  cancelOnPress?: () => void;
  /** Determines if the accept button should be displayed. Defaults to `true`. */
  accept?: boolean;
  /** The text for the accept button. Defaults to "Ok". */
  acceptText?: string;
  /** Function to execute when the accept button is pressed. */
  acceptOnPress?: () => void;
};

/**
 * A reusable modal component to ask the user for confirmation.
 * It can be configured with custom text and actions for accept/cancel buttons.
 */
const ConfirmationModal = ({
  visible,
  handleOpenModal,
  title,
  content,
  cancel = true,
  cancelText = "Cancel",
  cancelOnPress,
  accept = true,
  acceptText = "Ok",
  acceptOnPress,
}: ConfirmationModalProps) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.header}>
            <Text style={styles.headerCloseText}></Text>
            <Pressable style={styles.headerCloseButton} onPress={() => handleOpenModal()}>
              <Text style={styles.headerCloseText}>X</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{content}</Text>
          </View>
          <View style={styles.buttonBox}>
            {cancel && (
              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: "transparent", borderWidth: 1, borderColor: "#1c3a56" },
                ]}
                onPress={cancelOnPress}
              >
                <Text style={styles.buttonText}>{cancelText} </Text>
              </Pressable>
            )}
            {accept && (
              <Pressable style={styles.button} onPress={acceptOnPress}>
                <Text style={styles.buttonText}>{acceptText}</Text>
              </Pressable>
            )}
          </View>
        </View>
        <Text>ModalMsg</Text>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    cardContainer: {
      width: "80%",
      height: "30%",
      backgroundColor: "white",
      borderRadius: 8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 8,
    },
    headerCloseButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      color: "#1c3a56",
    },
    headerCloseText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#1c3a56",
    },
    content: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    contentText: {
      fontSize: 16,
      color: "#1c3a56",
    },
    buttonBox: {
      width: "100%",
      height: 100,
      paddingHorizontal: 16,
      paddingVertical: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    },
    button: {
      width: 90,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "lightblue",
      padding: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 16,
      color: "#1c3a56",
      fontWeight: "bold",
    },
  });
