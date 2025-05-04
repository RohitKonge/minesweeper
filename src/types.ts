// Game difficulty levels
export enum GameDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
  CUSTOM = 'custom',
}

// Game state
export enum GameState {
  NEW = 'new',
  PLAYING = 'playing',
  WON = 'won',
  LOST = 'lost',
}

// Cell state
export enum CellState {
  UNOPENED = 'unopened',
  REVEALED = 'revealed',
  FLAGGED = 'flagged',
  QUESTIONED = 'questioned',
  MINE = 'mine',
  MINE_HIT = 'mine-hit',
  MINE_WRONG = 'mine-wrong',
}

// Difficulty level settings
export interface DifficultySettings {
  rows: number;
  cols: number;
  mines: number;
}

// Game configuration by difficulty
export const DIFFICULTY_SETTINGS: Record<GameDifficulty, DifficultySettings> = {
  [GameDifficulty.BEGINNER]: {
    rows: 9,
    cols: 9,
    mines: 10,
  },
  [GameDifficulty.INTERMEDIATE]: {
    rows: 16,
    cols: 16,
    mines: 40,
  },
  [GameDifficulty.EXPERT]: {
    rows: 16,
    cols: 30,
    mines: 99,
  },
  [GameDifficulty.CUSTOM]: {
    rows: 20,
    cols: 30,
    mines: 145,
  },
};

// Cell interface
export interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  state: CellState;
  adjacentMines: number;
}

// Board interface
export interface Board {
  cells: Cell[][];
  rows: number;
  cols: number;
  mines: number;
  minesLeft: number;
}

// Game interface
export interface Game {
  board: Board;
  state: GameState;
  difficulty: GameDifficulty;
  time: number;
  firstClick: boolean;
}