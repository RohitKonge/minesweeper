import React from 'react';
import { Cell as CellType, CellState } from '../types';

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  onChord: (e: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick, onRightClick, onChord }) => {
  const { state, adjacentMines } = cell;

  // Generate cell class based on state
  const getCellClass = () => {
    let baseClass = 'w-8 h-8 border text-center flex items-center justify-center font-bold select-none relative transition-all duration-150';
    
    switch (state) {
      case CellState.UNOPENED:
        return `${baseClass} bg-gray-300 cursor-pointer hover:brightness-105 active:brightness-95 border-t-white border-l-white border-r-gray-600 border-b-gray-600`;
      case CellState.REVEALED:
        return `${baseClass} bg-gray-200 border border-gray-300`;
      case CellState.FLAGGED:
        return `${baseClass} bg-gray-300 cursor-pointer border-t-white border-l-white border-r-gray-600 border-b-gray-600`;
      case CellState.QUESTIONED:
        return `${baseClass} bg-gray-300 cursor-pointer border-t-white border-l-white border-r-gray-600 border-b-gray-600`;
      case CellState.MINE:
        return `${baseClass} bg-gray-200 border border-gray-300`;
      case CellState.MINE_HIT:
        return `${baseClass} bg-red-500 border border-gray-300`;
      case CellState.MINE_WRONG:
        return `${baseClass} bg-gray-200 border border-gray-300`;
      default:
        return baseClass;
    }
  };

  // Get number color based on adjacent mine count
  const getNumberColor = () => {
    switch (adjacentMines) {
      case 1:
        return 'text-blue-600';
      case 2:
        return 'text-green-600';
      case 3:
        return 'text-red-600';
      case 4:
        return 'text-blue-800';
      case 5:
        return 'text-red-800';
      case 6:
        return 'text-teal-600';
      case 7:
        return 'text-black';
      case 8:
        return 'text-gray-600';
      default:
        return '';
    }
  };

  // Render cell content based on state
  const renderContent = () => {
    switch (state) {
      case CellState.REVEALED:
        return adjacentMines > 0 ? (
          <span className={getNumberColor()}>{adjacentMines}</span>
        ) : null;
      case CellState.FLAGGED:
        return <span className="text-red-600">🚩</span>;
      case CellState.QUESTIONED:
        return <span className="text-blue-600">?</span>;
      case CellState.MINE:
      case CellState.MINE_HIT:
        return <span>💣</span>;
      case CellState.MINE_WRONG:
        return (
          <>
            <span className="text-red-600">🚩</span>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="text-red-600 text-2xl">✗</span>
            </span>
          </>
        );
      default:
        return null;
    }
  };

  // Handle middle click (chord) or simultaneous left+right click
  const handleMouseDown = (e: React.MouseEvent) => {
    // Middle click
    if (e.button === 1) {
      onChord(e);
    }
    // Handle left+right click by checking if both buttons are pressed
    else if (e.buttons === 3) {
      onChord(e);
    }
  };

  return (
    <div
      className={getCellClass()}
      onClick={onClick}
      onContextMenu={onRightClick}
      onMouseDown={handleMouseDown}
      onAuxClick={onChord} // for middle click
    >
      {renderContent()}
    </div>
  );
};

export default Cell;