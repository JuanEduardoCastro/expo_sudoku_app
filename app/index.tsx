import LevelBox from "@/components/levels/LevelBox";
import ButtonNav from "@/components/shared/ButtonNav";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { SCHEMES } from "@/constants/colors";
import { H_PAD, moderateScale, verticalScale } from "@/constants/dimensions";
import { getLevels } from "@/constants/levels";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { savedGamesService, settingsService } from "@/store/dbServices";
import { useBoardStore, useGameScoresStore } from "@/store/store_zustand";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const index = () => {
  const { styles } = useStyles(createStyles);
  const { hasSavedGame, savedGameLevel, setHasSavedGame, setSavedGameLevel } = useBoardStore();
  const { scoresByLevels } = useGameScoresStore();

  const router = useRouter();
  const levels = getLevels(SCHEMES);

  const savedLevelName: string =
    levels.find((level) => level.id === savedGameLevel)?.name ?? "current";
  const savedLevelStreak: number =
    scoresByLevels.find((score) => score.level === savedGameLevel)?.streak ?? 0;

  const [warningModal, setWarningModal] = useState(false);
  const [onboardingModal, setOnboardingModal] = useState(false);
  const [pendingLevel, setPendingLevel] = useState<number | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeenOnboarding = await settingsService.get("hasSeenOnboarding");
      console.log("XX -> index.tsx:35 -> index -> hasSeenOnboarding :", hasSeenOnboarding);
      if (!hasSeenOnboarding) {
        setOnboardingModal(true);
      }
    };
    checkOnboarding();
  }, []);

  const handleDisabledLevelPress = (levelId: number) => {
    setPendingLevel(levelId);
    setWarningModal(true);
  };

  const handleConfirmNewGame = async () => {
    await savedGamesService.delete();
    setHasSavedGame(false);
    setSavedGameLevel(null);
    setWarningModal(false);
    router.push({ pathname: "/Game", params: { level: pendingLevel } });
  };

  const handleCancelWarning = () => {
    setWarningModal(false);
    setPendingLevel(null);
  };

  const handleAcceptOnboarding = () => {
    settingsService.set("hasSeenOnboarding", "true");
    router.push("/Instructions");
    setOnboardingModal(false);
  };

  const handleCancelOnboarding = () => {
    settingsService.set("hasSeenOnboarding", "false");
    setOnboardingModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>SUDOKU</Text>
        <Text style={styles.titleSubtex}>Think. Scan. Place.</Text>
      </View>
      <View style={{ height: verticalScale(36) }} />
      <Text style={styles.sectionLabel}>Choose your level:</Text>
      <View style={{ height: verticalScale(12) }} />
      <LevelBox
        hasSavedGame={hasSavedGame}
        onDisabledPress={handleDisabledLevelPress}
        savedGameLevel={savedGameLevel || null}
      />
      {/* <View style={{ height: verticalScale(14) }} /> */}

      <View style={{ height: verticalScale(42) }} />

      <View style={styles.buttonBox}>
        <ButtonNav title="Stats" onPress={() => router.push("/Stats")} />
        <ButtonNav title="Instructions" onPress={() => router.push("/Instructions")} />
        <ButtonNav title="Settings" onPress={() => router.push("/Settings")} />
      </View>
      {/* {__DEV__ && (
        <View style={styles.buttonBox}>
          <ButtonNav title="TestSQLite" onPress={() => {}} />
          <ButtonNav title="DesignPreview" onPress={() => router.push("/DesignPreview")} />
        </View>
      )} */}
      <ConfirmationModal
        visible={warningModal}
        title={"Abandon saved game?"}
        icon={"⚠️"}
        content={`Your ${savedLevelName} game in progress will be deleted.`}
        content2={`You will also lose your current streak of ${savedLevelStreak} on ${savedLevelName}.`}
        cancelText={"Keep playing"}
        cancelOnPress={handleCancelWarning}
        acceptText={"New game!"}
        acceptOnPress={handleConfirmNewGame}
      />
      <ConfirmationModal
        visible={onboardingModal}
        title="Welcome to SUDOKU"
        icon="😁"
        content="Fill the 9×9 grid so every row, column, and box contains the numbers 1–9."
        acceptText={"Show me how!"}
        acceptOnPress={handleAcceptOnboarding}
        cancelText={"Let's play!"}
        cancelOnPress={handleCancelOnboarding}
      />
    </View>
  );
};

export default index;

export const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      padding: H_PAD,
      // gap: scale(12),
    },
    titleBox: {
      alignItems: "center",
      paddingTop: 28,
      gap: 6,
    },
    titleText: {
      fontSize: moderateScale(42),
      fontWeight: "700",
      letterSpacing: 10,
      color: colors.accentBase,
    },
    titleSubtex: {
      ...textVar.medium,
      letterSpacing: 0.3,
      color: colors.textMuted,
    },
    sectionLabel: {
      ...textVar.smallBold,
      letterSpacing: 1.5,
      marginHorizontal: 10,
      color: colors.textMuted,
    },
    buttonBox: {
      flexDirection: "row",
      gap: 8,
      marginHorizontal: 8,
      marginBottom: moderateScale(24),
    },
  });
