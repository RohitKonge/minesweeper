import React from 'react';
import Cell from './Cell';
import { useGame } from '../context/GameContext';

const Board: React.FC = () => {
  const { game, handleCellClick, handleCellRightClick, handleCellChord } = useGame();
  const { board } = game;

  // Calculate board size based on difficulty
  const boardStyle = {
    gridTemplateColumns: `repeat(${board.cols}, 2rem)`,
    width: `${board.cols * 2}rem`,
  };

  return (
    <div 
      className="grid gap-0 border-t-2 border-l-2 border-gray-400 bg-gray-400 mx-auto shadow-md"
      style={boardStyle}
    >
      {board.cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onRightClick={(e) => handleCellRightClick(rowIndex, colIndex, e)}
            onChord={(e) => handleCellChord(rowIndex, colIndex, e)}
          />
        ))
      )}
    </div>
  );
};

export default Board;