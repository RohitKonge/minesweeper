import React from 'react';

const GameInstructions: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">How to Play Minesweeper</h2>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          The goal of Minesweeper is to uncover all cells that don't contain mines.
        </p>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Desktop Controls</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li>Left-click an empty square to reveal it</li>
            <li>Right-click (or Ctrl+click) an empty square to flag it</li>
            <li>Middle-click (or left+right click) a number to reveal its adjacent squares</li>
            <li>Press space bar while hovering over a square to flag it or reveal its adjacent squares</li>
            <li>Press F2 or click the smiley face to start a new game</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Mobile Controls</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li>Tap an empty square to reveal it</li>
            <li>Long-press an empty square to flag it</li>
            <li>Tap a number to reveal its adjacent squares</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Numbers</h3>
          <p className="text-gray-600">
            Numbers on revealed cells indicate how many mines are adjacent to that cell.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Difficulty Levels</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li><strong>Beginner</strong>: 9×9 grid with 10 mines</li>
            <li><strong>Intermediate</strong>: 16×16 grid with 40 mines</li>
            <li><strong>Expert</strong>: 16×30 grid with 99 mines</li>
            <li><strong>Custom</strong>: Create your own board size and mine count</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Strategy Tips</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li>Start by clicking in the middle of the board</li>
            <li>Look for patterns and obvious mine placements</li>
            <li>Use the chord function to quickly clear large areas</li>
            <li>The first click is always safe</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameInstructions;