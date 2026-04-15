import { Board } from "@/app/Game";
import {
  checkCell,
  checkCol,
  checkGame,
  checkGrid,
  checkRow,
  generatesBoard,
  isValid,
} from "@/utils/gameLogic";

const createEmptyBoard = (): Board =>
  Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, col) => ({
      row,
      col,
      value: null,
      editable: true,
    })),
  );

describe("checkRow", () => {
  it("return false when the number already exists in the row", () => {
    const board = createEmptyBoard();
    board[0][3].value = 5;

    expect(checkRow(board, 0, 5)).toBe(false);
  });

  it("return true when the number does not exist in the row", () => {
    const board = createEmptyBoard();
    board[0][3].value = 5;

    expect(checkRow(board, 0, 9)).toBe(true);
  });
});

describe("checkCol", () => {
  it("return false when the number already exists in the column", () => {
    const board = createEmptyBoard();
    board[4][2].value = 7;

    expect(checkCol(board, 2, 7)).toBe(false);
  });

  it("return true when the number does not exist in the column", () => {
    const board = createEmptyBoard();
    board[4][2].value = 7;

    expect(checkCol(board, 2, 9)).toBe(true);
  });
});

describe("checkGrid", () => {
  it("return false when the number already exists in the grid", () => {
    const board = createEmptyBoard();
    board[0][0].value = 4;

    expect(checkGrid(board, 1, 1, 4)).toBe(false);
  });

  it("return true when the number does not exist in the grid", () => {
    const board = createEmptyBoard();
    board[0][0].value = 1;

    expect(checkGrid(board, 1, 1, 9)).toBe(true);
  });
});

describe("isValid", () => {
  it("return true when placement is valid (no conflict in row, col, or grid)", () => {
    const board = createEmptyBoard();

    expect(isValid(board, 0, 0, 1)).toBe(true);
  });

  it("return false when number conflicts with its row", () => {
    const board = createEmptyBoard();
    board[0][3].value = 1;

    expect(isValid(board, 0, 0, 1)).toBe(false);
  });

  it("return false when number conflicts with its column", () => {
    const board = createEmptyBoard();
    board[5][0].value = 1;

    expect(isValid(board, 0, 0, 1)).toBe(false);
  });

  it("return false when number conflicts with its 3x3 grid", () => {
    const board = createEmptyBoard();
    board[1][1].value = 1;

    expect(isValid(board, 0, 0, 1)).toBe(false);
  });
});

describe("checkGame", () => {
  it("returns false when the board has empty (null) cells", () => {
    const board = createEmptyBoard();

    expect(checkGame(board)).toBe(false);
  });

  it("returns true when every cell has value", () => {
    const board = createEmptyBoard();
    board.forEach((row) => row.forEach((cell) => (cell.value = 1)));

    expect(checkGame(board)).toBe(true);
  });
});

describe("checkCell", () => {
  it("returns the value at the given position", () => {
    const board = createEmptyBoard();
    board[3][7].value = 9;

    expect(checkCell(board, 3, 7)).toBe(9);
  });

  it("returns null when the position is empty", () => {
    const board = createEmptyBoard();

    expect(checkCell(board, 0, 0)).toBe(null);
  });
});

describe("generatesBoard", () => {
  it("returns an object with board and solution porperties", () => {
    const result = generatesBoard(0.5);

    expect(result).toHaveProperty("board");
    expect(result).toHaveProperty("solution");
  });

  it("solution has no null cells (fully solved)", () => {
    const { solution } = generatesBoard(0.5);

    const hasNull = solution.some((row) => row.some((cell) => cell.value === null));
    expect(hasNull).toBe(false);
  });

  it("board has fewer filled cells thatn the solution", () => {
    const { board, solution } = generatesBoard(0.5);

    const boardFilled = board.flat().filter((cell) => cell.value !== null).length;
    const solutionFilled = solution.flat().filter((cell) => cell.value !== null).length;

    expect(boardFilled).toBeLessThan(solutionFilled);
  });

  it("higher difficulty remove more cells", () => {
    const easy = generatesBoard(0.4);
    const medium = generatesBoard(0.7);

    const easyFilled = easy.board.flat().filter((cell) => cell.value !== null);
    const mediumFilled = medium.board.flat().filter((cell) => cell.value !== null);

    expect(mediumFilled.length).toBeLessThan(easyFilled.length);
  });
});
