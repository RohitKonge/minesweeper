import React from 'react';
import { GameProvider } from './context/GameContext';
import Board from './components/Board';
import GameHeader from './components/GameHeader';
import DifficultySelector from './components/DifficultySelector';
import GameInstructions from './components/GameInstructions';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Minesweeper</h1>
        
        <div className="bg-gray-300 p-4 shadow-lg border-t-4 border-l-4 border-white border-r-4 border-b-4 border-r-gray-500 border-b-gray-500 mb-8">
          <DifficultySelector />
          <GameHeader />
          <Board />
        </div>
        
        <p className="text-gray-500 text-sm text-center mt-4">
          Tip: Use left-click to reveal cells, right-click to flag mines, and middle-click (or left+right click) for chording.
        </p>
        
        <GameInstructions />
      </div>
    </GameProvider>
  );
}

export default App;