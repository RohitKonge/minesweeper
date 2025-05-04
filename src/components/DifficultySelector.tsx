import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { GameDifficulty, DIFFICULTY_SETTINGS } from '../types';
import { Settings2 } from 'lucide-react';

const DifficultySelector: React.FC = () => {
  const { game, startGame, startCustomGame } = useGame();
  const { difficulty } = game;
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    rows: DIFFICULTY_SETTINGS[GameDifficulty.CUSTOM].rows,
    cols: DIFFICULTY_SETTINGS[GameDifficulty.CUSTOM].cols,
    mines: DIFFICULTY_SETTINGS[GameDifficulty.CUSTOM].mines,
  });

  const handleDifficultyChange = (newDifficulty: GameDifficulty) => {
    if (newDifficulty === GameDifficulty.CUSTOM) {
      setShowCustomModal(true);
    } else if (newDifficulty !== difficulty) {
      startGame(newDifficulty);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const maxMines = (customSettings.rows * customSettings.cols) - 9; // Leave space for first click
    const mines = Math.min(customSettings.mines, maxMines);
    startCustomGame(customSettings.rows, customSettings.cols, mines);
    setShowCustomModal(false);
  };

  const getDifficultyButtonClass = (buttonDifficulty: GameDifficulty) => {
    const baseClass = "px-3 py-1 rounded transition-colors";
    const isActive = buttonDifficulty === difficulty;
    
    if (isActive) {
      return `${baseClass} bg-blue-600 text-white font-medium`;
    }
    
    return `${baseClass} bg-gray-300 hover:bg-gray-400 text-gray-800`;
  };

  return (
    <>
      <div className="flex justify-center gap-3 mb-4">
        <button
          className={getDifficultyButtonClass(GameDifficulty.BEGINNER)}
          onClick={() => handleDifficultyChange(GameDifficulty.BEGINNER)}
        >
          Beginner
        </button>
        <button
          className={getDifficultyButtonClass(GameDifficulty.INTERMEDIATE)}
          onClick={() => handleDifficultyChange(GameDifficulty.INTERMEDIATE)}
        >
          Intermediate
        </button>
        <button
          className={getDifficultyButtonClass(GameDifficulty.EXPERT)}
          onClick={() => handleDifficultyChange(GameDifficulty.EXPERT)}
        >
          Expert
        </button>
        <button
          className={`${getDifficultyButtonClass(GameDifficulty.CUSTOM)} flex items-center gap-1`}
          onClick={() => handleDifficultyChange(GameDifficulty.CUSTOM)}
        >
          <Settings2 size={16} />
          Custom
        </button>
      </div>

      {showCustomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Custom Game</h2>
            <form onSubmit={handleCustomSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Height (8-50)
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="50"
                    value={customSettings.rows}
                    onChange={(e) => setCustomSettings(prev => ({
                      ...prev,
                      rows: Math.min(50, Math.max(8, parseInt(e.target.value) || 8))
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Width (8-50)
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="50"
                    value={customSettings.cols}
                    onChange={(e) => setCustomSettings(prev => ({
                      ...prev,
                      cols: Math.min(50, Math.max(8, parseInt(e.target.value) || 8))
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mines (10-{(customSettings.rows * customSettings.cols) - 9})
                  </label>
                  <input
                    type="number"
                    min="10"
                    max={(customSettings.rows * customSettings.cols) - 9}
                    value={customSettings.mines}
                    onChange={(e) => setCustomSettings(prev => ({
                      ...prev,
                      mines: Math.min((prev.rows * prev.cols) - 9, Math.max(10, parseInt(e.target.value) || 10))
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Start Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DifficultySelector;