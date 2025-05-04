import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GameDifficulty, DIFFICULTY_SETTINGS } from '../types';
import { Settings2, Save, Trash2, Plus } from 'lucide-react';

interface CustomPreset {
  name: string;
  rows: number;
  cols: number;
  mines: number;
}

const DifficultySelector: React.FC = () => {
  const { game, startGame, startCustomGame } = useGame();
  const { difficulty } = game;
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    rows: DIFFICULTY_SETTINGS[GameDifficulty.CUSTOM].rows,
    cols: DIFFICULTY_SETTINGS[GameDifficulty.CUSTOM].cols,
    mines: DIFFICULTY_SETTINGS[GameDifficulty.CUSTOM].mines,
  });
  const [presets, setPresets] = useState<CustomPreset[]>(() => {
    const savedPresets = localStorage.getItem('minesweeper-presets');
    return savedPresets ? JSON.parse(savedPresets) : [];
  });
  const [newPresetName, setNewPresetName] = useState('');
  const [showPresetSave, setShowPresetSave] = useState(false);

  // Save presets to localStorage
  useEffect(() => {
    localStorage.setItem('minesweeper-presets', JSON.stringify(presets));
  }, [presets]);

  const handleDifficultyChange = (newDifficulty: GameDifficulty) => {
    if (newDifficulty === GameDifficulty.CUSTOM) {
      setShowCustomModal(true);
    } else if (newDifficulty !== difficulty) {
      startGame(newDifficulty);
    }
  };

  const calculateDensity = (rows: number, cols: number, mines: number) => {
    return ((mines / (rows * cols)) * 100).toFixed(1);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const maxMines = (customSettings.rows * customSettings.cols) - 9;
    const mines = Math.min(customSettings.mines, maxMines);
    startCustomGame(customSettings.rows, customSettings.cols, mines);
    setShowCustomModal(false);
  };

  const savePreset = () => {
    if (newPresetName.trim()) {
      setPresets([...presets, {
        name: newPresetName,
        ...customSettings
      }]);
      setNewPresetName('');
      setShowPresetSave(false);
    }
  };

  const loadPreset = (preset: CustomPreset) => {
    setCustomSettings({
      rows: preset.rows,
      cols: preset.cols,
      mines: preset.mines
    });
  };

  const deletePreset = (index: number) => {
    setPresets(presets.filter((_, i) => i !== index));
  };

  const getDifficultyButtonClass = (buttonDifficulty: GameDifficulty) => {
    const baseClass = "px-3 py-1 rounded transition-colors";
    const isActive = buttonDifficulty === difficulty;
    return isActive
      ? `${baseClass} bg-blue-600 text-white font-medium`
      : `${baseClass} bg-gray-300 hover:bg-gray-400 text-gray-800`;
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
          <div className="bg-white rounded-lg p-6 w-[480px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Custom Game</h2>
            <form onSubmit={handleCustomSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Height (8-50)
                    </label>
                    <input
                      type="number"
                      min="8"
                      max="50"
                      value={customSettings.rows}
                      onChange={(e) => setCustomSettings(prev => {
                        const rows = Math.min(50, Math.max(8, parseInt(e.target.value) || 8));
                        const maxMines = (rows * prev.cols) - 9;
                        return {
                          ...prev,
                          rows,
                          mines: Math.min(prev.mines, maxMines)
                        };
                      })}
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
                      onChange={(e) => setCustomSettings(prev => {
                        const cols = Math.min(50, Math.max(8, parseInt(e.target.value) || 8));
                        const maxMines = (prev.rows * cols) - 9;
                        return {
                          ...prev,
                          cols,
                          mines: Math.min(prev.mines, maxMines)
                        };
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
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
                  <div className="mt-1 text-sm text-gray-500">
                    Mine Density: {calculateDensity(customSettings.rows, customSettings.cols, customSettings.mines)}%
                  </div>
                </div>

                {presets.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Saved Presets</h3>
                    <div className="space-y-2">
                      {presets.map((preset, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium">{preset.name}</div>
                            <div className="text-sm text-gray-500">
                              {preset.rows}×{preset.cols}, {preset.mines} mines ({calculateDensity(preset.rows, preset.cols, preset.mines)}%)
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => loadPreset(preset)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              Load
                            </button>
                            <button
                              type="button"
                              onClick={() => deletePreset(index)}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!showPresetSave ? (
                  <button
                    type="button"
                    onClick={() => setShowPresetSave(true)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={16} /> Save as Preset
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Preset name"
                      value={newPresetName}
                      onChange={(e) => setNewPresetName(e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={savePreset}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Save size={16} /> Save
                    </button>
                  </div>
                )}
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