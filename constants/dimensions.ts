import { Dimensions } from "react-native";

const { width: SW, height: SH } = Dimensions.get("window");
console.log("XX -> dimensions.ts:4 -> SH :", SH);
console.log("XX -> dimensions.ts:4 -> SW :", SW);

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const scale = (size: number) => Math.round((SW / BASE_WIDTH) * size);

export const verticalScale = (size: number) => Math.round((SH / BASE_HEIGHT) * size);

export const moderateScale = (size: number, factor = 0.45) =>
  Math.round(size + (scale(size) - size) * factor);

const H_PAD = scale(16);
const MAX_BOARD_FROM_HEIGHT = SH - verticalScale(380);
const BOARD_WIDTH = Math.min(SW - H_PAD * 2, MAX_BOARD_FROM_HEIGHT);

const CELL_SIZE = Math.floor(BOARD_WIDTH / 9);
const PAD_GAP = scale(6);
const PAD_SIZE = Math.floor((BOARD_WIDTH - PAD_GAP * 8) / 9);

export { BOARD_WIDTH, CELL_SIZE, H_PAD, PAD_GAP, PAD_SIZE, SH, SW };
