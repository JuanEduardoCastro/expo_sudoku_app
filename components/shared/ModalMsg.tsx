import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ModalMsgProps = {
  visible: boolean;
  handleOpenModal: () => void;
  title?: string;
  content?: string;
  cancel?: boolean;
  cancelText?: string;
  cancelOnPress?: () => void;
  accept?: boolean;
  acceptText?: string;
  acceptOnPress?: () => void;
};

const ModalMsg = ({
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
}: ModalMsgProps) => {
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

export default ModalMsg;

const styles = StyleSheet.create({
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
