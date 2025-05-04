import React, { createContext, useState, useEffect, useCallback } from 'react';
import { 
  GameDifficulty, 
  GameState, 
  CellState, 
  Game,
  DIFFICULTY_SETTINGS,
  DifficultySettings
} from '../types';
import { 
  initializeGame, 
  plantMines, 
  revealCell, 
  toggleFlag, 
  chordCells, 
  checkWin, 
  revealAllMines 
} from '../utils/gameUtils';

interface GameContextProps {
  game: Game;
  startGame: (difficulty: GameDifficulty) => void;
  startCustomGame: (rows: number, cols: number, mines: number) => void;
  handleCellClick: (row: number, col: number) => void;
  handleCellRightClick: (row: number, col: number, e: React.MouseEvent) => void;
  handleCellChord: (row: number, col: number, e: React.MouseEvent) => void;
  resetGame: () => void;
}

// Create context with default values
export const GameContext = createContext<GameContextProps>({
  game: {
    board: {
      cells: [],
      rows: 0,
      cols: 0,
      mines: 0,
      minesLeft: 0,
    },
    state: GameState.NEW,
    difficulty: GameDifficulty.BEGINNER,
    time: 0,
    firstClick: true,
  },
  startGame: () => {},
  startCustomGame: () => {},
  handleCellClick: () => {},
  handleCellRightClick: () => {},
  handleCellChord: () => {},
  resetGame: () => {},
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [game, setGame] = useState<Game>(initializeGame(GameDifficulty.BEGINNER));
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  // Start the timer
  const startTimer = useCallback(() => {
    if (timerInterval === null) {
      const interval = window.setInterval(() => {
        setGame((prevGame) => ({
          ...prevGame,
          time: prevGame.time + 1,
        }));
      }, 1000);
      setTimerInterval(interval);
    }
  }, [timerInterval]);

  // Stop the timer
  const stopTimer = useCallback(() => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [timerInterval]);

  // Initialize a new game with specified difficulty
  const startGame = useCallback((difficulty: GameDifficulty) => {
    stopTimer();
    setGame(initializeGame(difficulty));
  }, [stopTimer]);

  // Initialize a new custom game
  const startCustomGame = useCallback((rows: number, cols: number, mines: number) => {
    stopTimer();
    const customSettings: DifficultySettings = { rows, cols, mines };
    DIFFICULTY_SETTINGS[GameDifficulty.CUSTOM] = customSettings;
    setGame(initializeGame(GameDifficulty.CUSTOM));
  }, [stopTimer]);

  // Reset the current game
  const resetGame = useCallback(() => {
    stopTimer();
    setGame(initializeGame(game.difficulty));
  }, [game.difficulty, stopTimer]);

  // Handle cell left click
  const handleCellClick = useCallback((row: number, col: number) => {
    if (game.state === GameState.LOST || game.state === GameState.WON) {
      return;
    }

    // Start the timer on first click
    if (game.state === GameState.NEW) {
      startTimer();
      
      // Plant mines (avoiding the first click)
      const boardWithMines = plantMines(game.board, row, col);
      setGame({
        ...game,
        board: boardWithMines,
        state: GameState.PLAYING,
        firstClick: false,
      });
      
      // Reveal the clicked cell after mines are planted
      setTimeout(() => {
        setGame((prevGame) => {
          const newBoard = revealCell(prevGame.board, row, col);
          const isWin = checkWin(newBoard);
          
          if (isWin) {
            stopTimer();
            return {
              ...prevGame,
              board: newBoard,
              state: GameState.WON,
            };
          }
          
          return {
            ...prevGame,
            board: newBoard,
          };
        });
      }, 0);
      
      return;
    }

    const cell = game.board.cells[row][col];

    // Skip if cell is flagged or questioned
    if (
      cell.state === CellState.FLAGGED ||
      cell.state === CellState.QUESTIONED
    ) {
      return;
    }

    // Reveal the cell
    const newBoard = revealCell(game.board, row, col);
    
    // Check if clicked on a mine
    if (cell.isMine) {
      stopTimer();
      setGame({
        ...game,
        board: revealAllMines(newBoard, row, col),
        state: GameState.LOST,
      });
      return;
    }
    
    // Check for win
    const isWin = checkWin(newBoard);
    
    if (isWin) {
      stopTimer();
      setGame({
        ...game,
        board: newBoard,
        state: GameState.WON,
      });
      return;
    }
    
    // Update the game state
    setGame({
      ...game,
      board: newBoard,
    });
  }, [game, startTimer, stopTimer]);

  // Handle cell right click (flag)
  const handleCellRightClick = useCallback((row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent context menu
    
    if (game.state === GameState.LOST || game.state === GameState.WON) {
      return;
    }
    
    // Start timer if first action
    if (game.state === GameState.NEW) {
      startTimer();
      setGame({
        ...game,
        state: GameState.PLAYING,
      });
    }
    
    const newBoard = toggleFlag(game.board, row, col);
    
    setGame({
      ...game,
      board: newBoard,
    });
  }, [game, startTimer]);

  // Handle chord action (middle click or left+right click)
  const handleCellChord = useCallback((row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    
    if (game.state !== GameState.PLAYING) {
      return;
    }
    
    const cell = game.board.cells[row][col];
    
    // Only chord on revealed cells with adjacent mines
    if (cell.state !== CellState.REVEALED || cell.adjacentMines === 0) {
      return;
    }
    
    const newBoard = chordCells(game.board, row, col);
    
    // Check if any mine was revealed
    let mineHit = false;
    for (let r = 0; r < newBoard.rows; r++) {
      for (let c = 0; c < newBoard.cols; c++) {
        const cell = newBoard.cells[r][c];
        if (cell.isMine && cell.state === CellState.REVEALED) {
          mineHit = true;
          stopTimer();
          setGame({
            ...game,
            board: revealAllMines(newBoard, r, c),
            state: GameState.LOST,
          });
          return;
        }
      }
    }
    
    // Check for win
    const isWin = checkWin(newBoard);
    
    if (isWin) {
      stopTimer();
      setGame({
        ...game,
        board: newBoard,
        state: GameState.WON,
      });
      return;
    }
    
    // Update the game state
    setGame({
      ...game,
      board: newBoard,
    });
  }, [game, stopTimer]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval !== null) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  return (
    <GameContext.Provider
      value={{
        game,
        startGame,
        startCustomGame,
        handleCellClick,
        handleCellRightClick,
        handleCellChord,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};