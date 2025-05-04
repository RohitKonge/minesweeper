import { 
  Board, 
  Cell, 
  CellState, 
  DifficultySettings, 
  GameDifficulty, 
  GameState,
  DIFFICULTY_SETTINGS
} from '../types';

// Create a new cell
export const createCell = (row: number, col: number): Cell => ({
  row,
  col,
  isMine: false,
  state: CellState.UNOPENED,
  adjacentMines: 0,
});

// Create a new board based on difficulty settings
export const createBoard = (settings: DifficultySettings): Board => {
  const { rows, cols, mines } = settings;
  
  // Initialize cells
  const cells: Cell[][] = Array(rows)
    .fill(null)
    .map((_, rowIndex) =>
      Array(cols)
        .fill(null)
        .map((_, colIndex) => createCell(rowIndex, colIndex))
    );

  return {
    cells,
    rows,
    cols,
    mines,
    minesLeft: mines,
  };
};

// Initialize a new game with specified difficulty
export const initializeGame = (difficulty: GameDifficulty) => {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const board = createBoard(settings);
  
  return {
    board,
    state: GameState.NEW,
    difficulty,
    time: 0,
    firstClick: true,
  };
};

// Plant mines on the board, avoiding firstClickRow and firstClickCol
export const plantMines = (board: Board, firstClickRow: number, firstClickCol: number): Board => {
  const { rows, cols, mines } = board;
  const newBoard = { ...board };
  let minesPlanted = 0;

  // Create a safe zone around the first click (3x3 area)
  const isSafeZone = (row: number, col: number) => {
    return (
      row >= Math.max(0, firstClickRow - 1) &&
      row <= Math.min(rows - 1, firstClickRow + 1) &&
      col >= Math.max(0, firstClickCol - 1) &&
      col <= Math.min(cols - 1, firstClickCol + 1)
    );
  };

  // Plant mines randomly
  while (minesPlanted < mines) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);
    const cell = newBoard.cells[randomRow][randomCol];

    // Skip if it's in the safe zone or already a mine
    if (isSafeZone(randomRow, randomCol) || cell.isMine) {
      continue;
    }

    // Plant a mine
    newBoard.cells[randomRow][randomCol] = {
      ...cell,
      isMine: true,
    };
    minesPlanted++;
  }

  // Calculate adjacent mines for each cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!newBoard.cells[row][col].isMine) {
        const adjacentMines = countAdjacentMines(newBoard, row, col);
        newBoard.cells[row][col] = {
          ...newBoard.cells[row][col],
          adjacentMines,
        };
      }
    }
  }

  return newBoard;
};

// Count adjacent mines for a cell
export const countAdjacentMines = (board: Board, row: number, col: number): number => {
  const { rows, cols } = board;
  let count = 0;

  // Check all adjacent cells (including diagonals)
  for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
      // Skip the cell itself
      if (r === row && c === col) {
        continue;
      }

      // Count if it's a mine
      if (board.cells[r][c].isMine) {
        count++;
      }
    }
  }

  return count;
};

// Reveal a cell and possibly adjacent cells
export const revealCell = (board: Board, row: number, col: number): Board => {
  const newBoard = { ...board };
  const cell = newBoard.cells[row][col];

  // Skip if cell is already revealed or flagged
  if (
    cell.state === CellState.REVEALED ||
    cell.state === CellState.FLAGGED ||
    cell.state === CellState.QUESTIONED
  ) {
    return newBoard;
  }

  // Reveal the cell
  newBoard.cells[row][col] = {
    ...cell,
    state: CellState.REVEALED,
  };

  // If it's a mine, return the board
  if (cell.isMine) {
    return newBoard;
  }

  // If it has 0 adjacent mines, reveal adjacent cells
  if (cell.adjacentMines === 0) {
    const { rows, cols } = newBoard;

    // Check all adjacent cells
    for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
        // Skip the cell itself
        if (r === row && c === col) {
          continue;
        }

        // Recursively reveal adjacent cells
        if (newBoard.cells[r][c].state === CellState.UNOPENED) {
          newBoard.cells = revealCell(newBoard, r, c).cells;
        }
      }
    }
  }

  return newBoard;
};

// Toggle flag on a cell
export const toggleFlag = (board: Board, row: number, col: number): Board => {
  const newBoard = { ...board };
  const cell = newBoard.cells[row][col];

  // Skip if the cell is already revealed
  if (cell.state === CellState.REVEALED) {
    return newBoard;
  }

  let minesLeft = newBoard.minesLeft;

  // Toggle the cell state
  if (cell.state === CellState.UNOPENED) {
    newBoard.cells[row][col] = {
      ...cell,
      state: CellState.FLAGGED,
    };
    minesLeft--;
  } else if (cell.state === CellState.FLAGGED) {
    newBoard.cells[row][col] = {
      ...cell,
      state: CellState.QUESTIONED,
    };
    minesLeft++;
  } else if (cell.state === CellState.QUESTIONED) {
    newBoard.cells[row][col] = {
      ...cell,
      state: CellState.UNOPENED,
    };
  }

  return {
    ...newBoard,
    minesLeft,
  };
};

// Chord action (reveal adjacent cells if the number of flags matches the adjacent mines)
export const chordCells = (board: Board, row: number, col: number): Board => {
  const newBoard = { ...board };
  const cell = newBoard.cells[row][col];

  // Skip if the cell is not revealed or has no adjacent mines
  if (cell.state !== CellState.REVEALED || cell.adjacentMines === 0) {
    return newBoard;
  }

  const { rows, cols } = newBoard;
  let flaggedCount = 0;

  // Count flagged cells around this cell
  for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
      // Skip the cell itself
      if (r === row && c === col) {
        continue;
      }

      // Count if it's flagged
      if (newBoard.cells[r][c].state === CellState.FLAGGED) {
        flaggedCount++;
      }
    }
  }

  // If flagged count matches adjacent mines, reveal all unflagged adjacent cells
  if (flaggedCount === cell.adjacentMines) {
    for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
        // Skip the cell itself
        if (r === row && c === col) {
          continue;
        }

        // Skip flagged and questioned cells
        const adjacentCell = newBoard.cells[r][c];
        if (
          adjacentCell.state === CellState.FLAGGED ||
          adjacentCell.state === CellState.QUESTIONED
        ) {
          continue;
        }

        // Reveal the cell
        newBoard.cells = revealCell(newBoard, r, c).cells;
      }
    }
  }

  return newBoard;
};

// Check if the game is won
export const checkWin = (board: Board): boolean => {
  const { rows, cols } = board;
  
  // Check if all non-mine cells are revealed
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = board.cells[row][col];
      
      // If a non-mine cell is not revealed, the game is not won
      if (!cell.isMine && cell.state !== CellState.REVEALED) {
        return false;
      }
    }
  }
  
  return true;
};

// Reveal all mines when game is over
export const revealAllMines = (board: Board, hitRow?: number, hitCol?: number): Board => {
  const newBoard = { ...board };
  const { rows, cols } = newBoard;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = newBoard.cells[row][col];
      
      if (cell.isMine) {
        // If this is the mine that was hit
        if (row === hitRow && col === hitCol) {
          newBoard.cells[row][col] = {
            ...cell,
            state: CellState.MINE_HIT,
          };
        } 
        // For other mines
        else if (cell.state !== CellState.FLAGGED) {
          newBoard.cells[row][col] = {
            ...cell,
            state: CellState.MINE,
          };
        }
      } 
      // Mark incorrectly flagged cells
      else if (cell.state === CellState.FLAGGED) {
        newBoard.cells[row][col] = {
          ...cell,
          state: CellState.MINE_WRONG,
        };
      }
    }
  }
  
  return newBoard;
};

// Format time in seconds to MM:SS
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};