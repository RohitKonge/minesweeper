import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

const GameInstructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInstructions = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        onClick={toggleInstructions}
        aria-label="Game Instructions"
      >
        <HelpCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">How to Play Minesweeper</h2>
              <button 
                onClick={toggleInstructions}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close instructions"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <p>
                The goal of Minesweeper is to uncover all cells that don't contain mines.
              </p>
              
              <div>
                <h3 className="font-semibold">Controls:</h3>
                <ul className="list-disc ml-5 mt-2">
                  <li><strong>Left Click</strong>: Reveal a cell</li>
                  <li><strong>Right Click</strong>: Flag a suspected mine or add a question mark</li>
                  <li><strong>Middle Click</strong> (or <strong>Left+Right Click</strong>): Reveal adjacent cells when the correct number of flags are placed</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold">Numbers:</h3>
                <p>Numbers on revealed cells indicate how many mines are adjacent to that cell.</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Difficulty Levels:</h3>
                <ul className="list-disc ml-5 mt-2">
                  <li><strong>Beginner</strong>: 9×9 grid with 10 mines</li>
                  <li><strong>Intermediate</strong>: 16×16 grid with 40 mines</li>
                  <li><strong>Expert</strong>: 16×30 grid with 99 mines</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold">Strategy Tips:</h3>
                <ul className="list-disc ml-5 mt-2">
                  <li>Start by clicking in the middle of the board</li>
                  <li>Look for patterns and obvious mine placements</li>
                  <li>Use the chord function to quickly clear large areas</li>
                  <li>The first click is always safe</li>
                </ul>
              </div>
            </div>
            
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={toggleInstructions}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameInstructions;