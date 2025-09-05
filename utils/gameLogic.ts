import { Board } from "@/app/Game";

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

const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j]!, array[i]!];
  }

  return array;
};

export const generatesBoard = (difficulty: number): Board => {
  const board = createBoard();
  solvedBoard(board);

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
  return board;
};

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

export function checkRow(board: Board, row: number, num: number | null = null): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row]?.[i]?.value === num) {
      return false;
    }
  }

  return true;
}

export function checkCol(board: Board, col: number, num: number | null = null): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[i]?.[col]?.value === num) {
      return false;
    }
  }

  return true;
}

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
