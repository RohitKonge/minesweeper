import React from 'react';
import { useGame } from '../context/GameContext';
import { formatTime } from '../utils/gameUtils';
import { GameState } from '../types';
import { Smile, Frown, Trophy, RotateCcw } from 'lucide-react';

const GameHeader: React.FC = () => {
  const { game, resetGame } = useGame();
  const { board, state, time } = game;

  // Render face based on game state
  const renderFace = () => {
    switch (state) {
      case GameState.LOST:
        return <Frown className="w-6 h-6" />;
      case GameState.WON:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      default:
        return <Smile className="w-6 h-6" />;
    }
  };

  return (
    <div className="flex justify-between items-center p-3 bg-gray-200 border-t-4 border-l-4 border-white border-r-4 border-b-4 border-r-gray-500 border-b-gray-500 mb-2">
      {/* Mines Counter */}
      <div className="bg-black text-red-500 font-mono text-2xl px-2 py-1 w-20 text-center">
        {board.minesLeft.toString().padStart(3, '0')}
      </div>
      
      {/* Reset Button */}
      <button 
        className="bg-gray-300 p-2 rounded-md border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-gray-500 border-b-gray-500 hover:bg-gray-400 active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white transition-all"
        onClick={resetGame}
      >
        <div className="flex gap-2 items-center">
          {renderFace()}
          <RotateCcw className="w-5 h-5" />
        </div>
      </button>
      
      {/* Timer */}
      <div className="bg-black text-red-500 font-mono text-2xl px-2 py-1 w-20 text-center">
        {time < 999 ? time.toString().padStart(3, '0') : '999'}
      </div>
    </div>
  );
};

export default GameHeader;