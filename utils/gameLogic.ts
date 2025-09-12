import { Board } from "@/app/Game";

/**
 * Creates an empty 9x9 Sudoku board.
 * @returns {Board} A 9x9 grid where each cell is an object with row, col, null value, and editable status.
 */
const createBoard = (): Board => {
  return Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, col) => ({
      row,
      col,
      value: null,
      editable: true,
    }))
  );
};

/**
 * Solves the Sudoku board using a backtracking algorithm.
 * It recursively tries to fill the board with valid numbers.
 * @param {Board} board - The Sudoku board to be solved.
 * @param {number} [row=0] - The current row index to start from.
 * @param {number} [col=0] - The current column index to start from.
 * @returns {boolean} True if the board is successfully solved, false otherwise.
 */
function solvedBoard(board: Board, row = 0, col = 0): boolean {
  if (row === 9) {
    return true;
  }

  if (col === 9) {
    return solvedBoard(board, row + 1, 0);
  }

  if (board[row]?.[col]?.value !== null) {
    return solvedBoard(board, row, col + 1);
  }

  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (const num of numbers) {
    if (isValid(board, row, col, num)) {
      board[row][col].value = num;
      board[row][col].editable = false;
      if (solvedBoard(board, row, col + 1)) {
        return true;
      }
      board[row][col].value = null;
      board[row][col].editable = true;
    }
  }
  return false;
}

/**
 * Checks if placing a number in a specific cell is valid according to Sudoku rules.
 * @param {Board} board - The current Sudoku board.
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 * @param {number} num - The number to validate.
 * @returns {boolean} True if the move is valid, false otherwise.
 */
export function isValid(board: Board, row: number, col: number, num: number): boolean {
  if (
    !checkRow(board, row, num) ||
    !checkCol(board, col, num) ||
    !checkGrid(board, row, col, num)
  ) {
    return false;
  }

  return true;
}

/**
 * Shuffles an array in place using the Fisher-Yates (aka Knuth) shuffle algorithm.
 * @param {number[]} array - The array to be shuffled.
 * @returns {number[]} The shuffled array.
 */
const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j]!, array[i]!];
  }

  return array;
};

/**
 * Type definition for the object returned by `generatesBoard`.
 */
export type GeneratesBoard = {
  /** The generated Sudoku board with some cells removed. */
  board: Board;
  /** The complete, solved version of the board. */
  solution: Board;
};

/**
 * Generates a new Sudoku board and its solution.
 * @param {number} difficulty - A number between 0 and 1 representing the percentage of cells to remove.
 * @returns {GeneratesBoard} An object containing the generated board and the full solution.
 */
export const generatesBoard = (difficulty: number): GeneratesBoard => {
  const board = createBoard();
  solvedBoard(board);

  const solution = JSON.parse(JSON.stringify(board));

  const totalCells = 81;
  const cellsToRemove = Math.floor(totalCells * difficulty);

  let removedCells = 0;
  while (removedCells < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (board[row]?.[col]?.value !== null || board[row]?.[col]?.value !== undefined) {
      board[row][col].value = null;
      board[row][col].editable = true;
      removedCells++;
    }
  }
  return { board, solution };
};

/**
 * Checks if the game is complete (i.e., all cells are filled).
 * @param {Board} board - The Sudoku board to check.
 * @returns {boolean} True if all cells have a value, false otherwise.
 */
export function checkGame(board: Board): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row]?.[col]?.value === null) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks a row for validity.
 * If `num` is provided, it checks if `num` already exists in the row.
 * If `num` is null (default), it checks if the row is completely filled with non-null values.
 * @param {Board} board - The Sudoku board.
 * @param {number} row - The row index to check.
 * @param {number | null} [num=null] - The number to check for. If null, checks for row completion.
 * @returns {boolean} False if `num` is found or if the row is incomplete (when num is null), true otherwise.
 */
export function checkRow(board: Board, row: number, num: number | null = null): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row]?.[i]?.value === num) {
      return false;
    }
  }

  return true;
}

/**
 * Checks a column for validity.
 * If `num` is provided, it checks if `num` already exists in the column.
 * If `num` is null (default), it checks if the column is completely filled with non-null values.
 * @param {Board} board - The Sudoku board.
 * @param {number} col - The column index to check.
 * @param {number | null} [num=null] - The number to check for. If null, checks for column completion.
 * @returns {boolean} False if `num` is found or if the column is incomplete (when num is null), true otherwise.
 */
export function checkCol(board: Board, col: number, num: number | null = null): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[i]?.[col]?.value === num) {
      return false;
    }
  }

  return true;
}

/**
 * Checks a 3x3 grid for validity.
 * If `num` is provided, it checks if `num` already exists in the grid.
 * If `num` is null (default), it checks if the grid is completely filled with non-null values.
 * @param {Board} board - The Sudoku board.
 * @param {number} row - The starting row index of the grid.
 * @param {number} col - The starting column index of the grid.
 * @param {number | null} [num=null] - The number to check for. If null, checks for grid completion.
 * @returns {boolean} False if `num` is found or if the grid is incomplete (when num is null), true otherwise.
 */
export function checkGrid(
  board: Board,
  row: number,
  col: number,
  num: number | null = null
): boolean {
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i]?.[startCol + j]?.value === num) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Retrieves the value of a specific cell.
 * @param {Board} board - The Sudoku board.
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 * @returns {number | null} The value of the cell, or null if it's empty or out of bounds.
 */
export function checkCell(board: Board, row: number, col: number, num: number | null = null) {
  return board[row]?.[col]?.value ?? null;
}
