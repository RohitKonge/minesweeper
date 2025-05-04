import { GameProvider } from './context/GameContext';
import Board from './components/Board';
import GameHeader from './components/GameHeader';
import DifficultySelector from './components/DifficultySelector';
import GameInstructions from './components/GameInstructions';

function App() {
  return (
    <GameProvider>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Play Minesweeper Online</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Challenge yourself with the classic Minesweeper puzzle game! Choose your difficulty level and start clearing mines.
          </p>
        </header>
        
        <section className="bg-gray-300 p-4 shadow-lg border-t-4 border-l-4 border-white border-r-4 border-b-4 border-r-gray-500 border-b-gray-500 mb-8" aria-label="Game Board">
          <DifficultySelector />
          <GameHeader />
          <Board />
        </section>

        <footer className="max-w-2xl w-full">
          <GameInstructions />
          <div className="mt-8 text-center text-gray-600">
            <p className="mb-2">Play Minesweeper for free on minesweeper.buzz - The best online Minesweeper game!</p>
            <p>Available on all devices - No download required. Start playing now!</p>
          </div>
        </footer>

        <footer className="mt-8 mb-4 text-center text-gray-500 text-sm">
          © 2002-2025 Adam Smith. All rights reserved.
        </footer>
      </main>
    </GameProvider>
  );
}

export default App;