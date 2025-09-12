import { useNotificationMessageStore } from "@/store/store";
import React, { useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

/**
 * A modal component to display temporary notifications to the user.
 * The visibility and content of the modal are controlled by the `useNotificationMessageStore`.
 * The modal automatically dismisses itself after a few seconds.
 */
const NotificationModal = () => {
  const { notification, setNotification, resetNotification } = useNotificationMessageStore();

  // Effect to automatically close the notification after a delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      resetNotification();
    }, 4000);
    // Cleanup function to clear the timer if the component unmounts or notification changes.
    return () => clearTimeout(timer);
  }, [notification, resetNotification]);

  const handleCloseModal = () => {
    resetNotification();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={notification.type !== null}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.header}>
            <Text style={styles.headerCloseText}></Text>
            <Pressable style={styles.headerCloseButton} onPress={handleCloseModal}>
              <Text style={styles.headerCloseText}>X</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{notification.message}</Text>
          </View>
          <View style={styles.buttonBox}>
            <Pressable style={styles.button} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;

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
    height: "20%",
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
