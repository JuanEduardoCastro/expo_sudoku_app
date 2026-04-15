import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { formatSeconds } from "@/utils/formatters";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ConfirmationModalProps = {
  visible: boolean;
  title: string;
  icon?: string;
  content?: string;
  content2?: string;
  cancelText?: string | null;
  cancelOnPress?: () => void;
  acceptText?: string | null;
  acceptOnPress?: () => void;
  isFinishedModal?: boolean;
  finishedData?: {
    score: number;
    timer: number;
    errors: number;
  };
};

const ConfirmationModal = ({
  visible,
  title,
  icon,
  content,
  content2,
  cancelText = null,
  cancelOnPress,
  acceptText = "Ok",
  acceptOnPress,
  isFinishedModal = false,
  finishedData,
}: ConfirmationModalProps) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.iconWrap}>
            <Text style={{ fontSize: 26 }}>{icon}</Text>
          </View>

          <View style={{ height: 16 }} />

          <Text style={styles.modalTitle}>{title}</Text>

          <View style={{ height: 16 }} />
          {!isFinishedModal ? (
            <>
              <Text style={styles.modalContent}>{content}</Text>
              <Text style={styles.modalContent}>{content2}</Text>
            </>
          ) : (
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{finishedData?.score}</Text>
                <Text style={styles.statLabel}>Score</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {finishedData?.timer ? formatSeconds(finishedData?.timer) : "--"}
                </Text>
                <Text style={styles.statLabel}>Time</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{finishedData?.errors}</Text>
                <Text style={styles.statLabel}>Errors</Text>
              </View>
            </View>
          )}

          <View style={{ height: 16 }} />

          <View style={styles.buttonBox}>
            {cancelText && (
              <Pressable style={[styles.buttonCancel]} onPress={cancelOnPress}>
                <Text style={styles.buttonCancelText}>{cancelText} </Text>
              </Pressable>
            )}
            {acceptText && (
              <Pressable style={styles.buttonAccept} onPress={acceptOnPress}>
                <Text style={styles.buttonAcceptText}>{acceptText}</Text>
              </Pressable>
            )}
          </View>
        </View>
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
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    cardContainer: {
      width: "80%",
      minHeight: "30%",
      alignItems: "center",
      padding: 24,
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconWrap: {
      backgroundColor: colors.accentLight,
      width: 60,
      height: 60,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: "800",
      textAlign: "center",
      letterSpacing: 0.2,
      color: colors.text,
    },
    modalContent: {
      fontSize: 14,
      lineHeight: 21,
      textAlign: "center",
      color: colors.textMuted,
    },
    statsRow: {
      backgroundColor: colors.surface2,
      flexDirection: "row",
      borderRadius: 16,
      borderWidth: 1,
      overflow: "hidden",
      width: "100%",
      marginTop: 4,
      borderColor: colors.border,
    },
    statBox: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 14,
      gap: 4,
    },
    statValue: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.text,
    },
    statLabel: {
      fontSize: 11,
      fontWeight: "600",
      letterSpacing: 0.8,
      color: colors.textMuted,
    },
    buttonBox: {
      flexDirection: "row",
      width: "100%",
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    buttonCancel: {
      backgroundColor: colors.surface2,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 48,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonCancelText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.textMuted,
    },
    buttonAccept: {
      backgroundColor: colors.accentBase,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 48,
      borderRadius: 14,
    },
    buttonAcceptText: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.almostWhite,
    },
  });
