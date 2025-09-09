import GameBoard from "@/components/grid/GameBoard";
import ButtonBack from "@/components/shared/ButtonBack";
import ModalMsg from "@/components/shared/ModalMsg";
import { generatesBoard } from "@/utils/gameLogic";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export type CellProps = {
  row: number;
  col: number;
  value: number | null;
  editable: boolean;
};

export type Board = CellProps[][];

const Game = () => {
  const router = useRouter();
  const { level } = useLocalSearchParams();
  const { board, solution } = generatesBoard(Number(level));
  const [openModal, setOpenModal] = useState(false);

  const handleBackButton = () => {
    setOpenModal(true);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const goBackCommand = () => {
    setOpenModal(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={handleBackButton} />
      </View>
      <View style={styles.gridContainer}>
        <GameBoard generatedBoard={board} solution={solution} level={Number(level)} />
      </View>
      {openModal && (
        <ModalMsg
          visible={openModal}
          handleOpenModal={handleOpenModal}
          content="Are you sure you want to exit?"
          cancelOnPress={handleOpenModal}
          acceptOnPress={goBackCommand}
          cancelText="No"
          acceptText="Yes"
        />
      )}
    </SafeAreaView>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  gridContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
