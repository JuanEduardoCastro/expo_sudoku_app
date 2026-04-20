import { moderateScale, scale, verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
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
    isNewScoreRecord: boolean;
    isNewTimeRecord: boolean;
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
  const { styles } = useStyles(createStyles);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.iconWrap}>
            <Text style={{ fontSize: 26 }}>{icon}</Text>
          </View>

          <View style={{ height: verticalScale(16) }} />

          <Text style={styles.modalTitle}>{title}</Text>

          <View style={{ height: verticalScale(16) }} />
          {!isFinishedModal ? (
            <>
              <Text style={styles.modalContent}>{content}</Text>
              <Text style={styles.modalContent}>{content2}</Text>
            </>
          ) : (
            <>
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
              <View style={styles.recordBadgeBox}>
                {finishedData?.isNewScoreRecord && (
                  <Text style={styles.recordBadge}>🏆 Best score!</Text>
                )}
                {finishedData?.isNewTimeRecord && (
                  <Text style={styles.recordBadge}>🏆 Best time!</Text>
                )}
              </View>
            </>
          )}

          <View style={{ height: verticalScale(16) }} />

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
      width: "90%",
      minHeight: "30%",
      alignItems: "center",
      paddingVertical: verticalScale(24),
      paddingHorizontal: scale(18),
      backgroundColor: colors.surface,
      borderRadius: moderateScale(20),
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
      ...textVar.xxlargeBold,
      textAlign: "center",
      letterSpacing: 0.4,
      color: colors.text,
    },
    modalContent: {
      ...textVar.mediumLight,
      letterSpacing: 0.5,
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
      ...textVar.xlargeBold,
      color: colors.text,
    },
    statLabel: {
      ...textVar.small,
      letterSpacing: 0.8,
      color: colors.textMuted,
    },
    recordBadgeBox: {
      height: verticalScale(32),
      justifyContent: "flex-end",
    },
    recordBadge: {
      ...textVar.smallBold,
      color: colors.accentBase,
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
      height: verticalScale(48),
      borderRadius: moderateScale(14),
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonCancelText: {
      ...textVar.base,
      color: colors.textMuted,
    },
    buttonAccept: {
      backgroundColor: colors.accentBase,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: verticalScale(48),
      borderRadius: moderateScale(14),
    },
    buttonAcceptText: {
      ...textVar.baseBold,
      color: colors.almostWhite,
    },
  });
