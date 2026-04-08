import { Dimensions } from "react-native";

const { width: SW } = Dimensions.get("window");
const H_PAD = 16;
const BOARD_WIDTH = SW - H_PAD * 2;
const CELL_SIZE = Math.floor(BOARD_WIDTH / 9);
const PAD_GAP = 6;
const PAD_SIZE = Math.floor((BOARD_WIDTH - PAD_GAP * 8) / 9);

export { BOARD_WIDTH, CELL_SIZE, H_PAD, PAD_GAP, PAD_SIZE };
