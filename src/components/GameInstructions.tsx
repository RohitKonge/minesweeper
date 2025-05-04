import React from 'react';

const GameInstructions: React.FC = () => {
  return (
    <article className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">How to Play Minesweeper Online - Free Classic Game</h2>
      
      <div className="space-y-4">
        <section>
          <p className="text-gray-600">
            Welcome to the best free online Minesweeper game! This classic puzzle game challenges your logic and deduction skills. The goal is simple: uncover all cells that don't contain mines while avoiding the hidden explosives.
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-2">Desktop Controls - Play Minesweeper on PC</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li>Left-click an empty square to reveal it</li>
            <li>Right-click (or Ctrl+click) an empty square to flag it</li>
            <li>Middle-click (or left+right click) a number to reveal its adjacent squares</li>
            <li>Press space bar while hovering over a square to flag it or reveal its adjacent squares</li>
            <li>Press F2 or click the smiley face to start a new game</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Mobile Controls - Play Minesweeper on Phone</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li>Tap an empty square to reveal it</li>
            <li>Long-press an empty square to flag it</li>
            <li>Tap a number to reveal its adjacent squares</li>
            <li>Perfect touch controls for mobile gameplay</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-2">Understanding Numbers in Minesweeper</h3>
          <p className="text-gray-600">
            Each number reveals crucial information about nearby mines:
            <ul className="list-disc ml-5 mt-2">
              <li>Numbers (1-8) show exactly how many mines are in the adjacent cells</li>
              <li>Use these numbers to deduce safe moves and mine locations</li>
              <li>Empty cells mean no mines are adjacent</li>
            </ul>
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-2">Multiple Difficulty Levels</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li><strong>Beginner Mode</strong>: Perfect for newcomers - 9×9 grid with 10 mines</li>
            <li><strong>Intermediate Mode</strong>: For experienced players - 16×16 grid with 40 mines</li>
            <li><strong>Expert Mode</strong>: Ultimate challenge - 16×30 grid with 99 mines</li>
            <li><strong>Custom Mode</strong>: Create your personalized challenge</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-2">Pro Strategy Tips</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li>Begin in the middle of the board for optimal starting position</li>
            <li>Learn to recognize common mine patterns</li>
            <li>Use the chord function (middle-click) to clear areas quickly</li>
            <li>First click is always safe - use it wisely!</li>
            <li>Mark suspected mines with flags to keep track</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Why Play Minesweeper Online?</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li>Free to play - no registration required</li>
            <li>Works on all devices - mobile, tablet, and desktop</li>
            <li>No downloads needed - play instantly in your browser</li>
            <li>Perfect for quick breaks or extended gaming sessions</li>
            <li>Improves logical thinking and problem-solving skills</li>
          </ul>
        </section>
      </div>
    </article>
  );
};

export default GameInstructions;