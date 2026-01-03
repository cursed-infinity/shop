# How to Add a New Game

This guide walks you through adding a new game to Minigames Hub.

## Quick Start

### Step 1: Create the Game Component

Create a new file in `src/components/Games/YourGame/YourGame.tsx`:

```typescript
import React, { useState, useEffect } from 'react';

interface YourGameProps {
  onGameEnd: (score: number) => void;
}

export const YourGame: React.FC<YourGameProps> = ({ onGameEnd }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGameOver = () => {
    setGameOver(true);
    // Call onGameEnd with final score to end the game
    // The parent component will handle saving the score to Firestore
    onGameEnd(score);
  };

  return (
    <div className="w-full h-full bg-slate-950 flex items-center justify-center p-4">
      {/* Your game UI here */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Your Game Name</h2>
        <div className="text-4xl font-bold mb-4">Score: {score}</div>
        
        {gameOver && (
          <div>
            <div className="text-2xl font-bold text-green-400 mb-4">+{score} coins</div>
            <button
              onClick={() => {
                // Reset game
                setScore(0);
                setGameOver(false);
              }}
              className="button-glow px-6 py-2 text-white font-semibold"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
```

### Step 2: Register in Games Registry

Open `src/data/games.ts` and add your game to the `GAMES` array:

```typescript
import { YourGame } from './YourGame/YourGame';

export const GAMES: GameConfig[] = [
  // ... existing games ...
  {
    id: 'your-game',
    name: 'Your Game Name',
    description: 'A short description of the game',
    icon: '🎮', // Use an emoji or update to use an image
    component: YourGame,
    timeToPlay: '5-10 mins',
    coinsReward: 100, // Coins earned for winning
    difficulty: 'Medium', // Easy, Medium, or Hard
    category: 'Arcade', // Arcade, Puzzle, Reaction, Classic, Strategy
  },
];
```

### Step 3: Test Your Game

1. Run dev server: `npm run dev`
2. Sign in and go to Games Hub
3. Your game should appear with the new card
4. Click "Play" to test it

## Game Development Best Practices

### 1. **Score System**
   - Return a score between 0-1000
   - Higher scores = more coins earned
   - Final score passed to `onGameEnd(score)`

### 2. **Mobile Responsiveness**
   - Use `h-full` and `w-full` for full-screen gameplay
   - Add touch controls for mobile
   - Test on mobile devices

```typescript
// Add touch support for controls
const handleTouchStart = (e: React.TouchEvent) => {
  const touch = e.touches[0];
  // Handle touch input
};
```

### 3. **Animations & Visual Feedback**
   - Use Framer Motion for smooth animations
   - Add hover effects
   - Provide clear win/lose feedback

```typescript
import { motion } from 'framer-motion';

<motion.div
  animate={{ scale: gameOver ? 1.1 : 1 }}
  transition={{ duration: 0.3 }}
>
  Your content
</motion.div>
```

### 4. **Sound Effects** (Optional)
   - Use HTML5 Audio API
   - Make toggleable in header
   - Keep file sizes small

```typescript
const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.play().catch(e => console.log('Sound blocked:', e));
};
```

### 5. **Accessibility**
   - Add keyboard controls
   - Use semantic HTML
   - Include ARIA labels for screen readers

## Game Difficulty & Coin Rewards

### Recommended Rewards by Difficulty:

| Difficulty | Base Coins | Time | Example Games |
|-----------|-----------|------|---------------|
| Easy      | 50-100    | 2-5m | Reaction, Guess Number |
| Medium    | 100-150   | 5-15m | Snake, 2048, Memory |
| Hard      | 150-200+  | 10-30m | Tetris, Sudoku, Minesweeper |

**Coin Calculation:**
```
Coins Earned = (Game's coinsReward) × (Player's Score / 100)
Example: 2048 game (150 coins) with score of 75 = 150 × 0.75 = 112.5 coins
```

## Code Structure Examples

### Simple Game (Reaction Test)
```typescript
// State
const [state, setState] = useState<'waiting' | 'test' | 'done'>('waiting');
const [reactionTime, setReactionTime] = useState(0);

// Game logic
useEffect(() => {
  if (state === 'waiting') {
    setTimeout(() => setState('test'), Math.random() * 3000 + 2000);
  }
}, [state]);

// End game
const handleResult = (time: number) => {
  setReactionTime(time);
  setState('done');
  onGameEnd(500 - time); // Score based on speed
};
```

### Complex Game (Tetris)
```typescript
// Game state
const [board, setBoard] = useState<Block[][]>(initializeBoard());
const [currentPiece, setCurrentPiece] = useState<Piece>(getRandomPiece());
const [score, setScore] = useState(0);

// Game loop
useEffect(() => {
  const gameLoop = setInterval(() => {
    // Update piece position
    // Check collisions
    // Clear lines
    // Update score
  }, 200);

  return () => clearInterval(gameLoop);
}, [board, currentPiece]);

// Handle input
const handleKeyDown = (e: KeyboardEvent) => {
  switch(e.key) {
    case 'ArrowLeft': movePieceLeft(); break;
    case 'ArrowRight': movePieceRight(); break;
    case 'ArrowDown': movePieceDown(); break;
    case ' ': rotatePiece(); break;
  }
};
```

## Testing Checklist

- [ ] Game starts without errors
- [ ] Scoring works correctly
- [ ] Game ends properly
- [ ] Score is saved to database
- [ ] Responsive on mobile
- [ ] Keyboard controls work
- [ ] No console errors
- [ ] Visual feedback is clear
- [ ] Performance is smooth (60 FPS)

## Debugging Tips

```typescript
// Log score changes
useEffect(() => {
  console.log('Score updated:', score);
}, [score]);

// Test game end
const handleTestEnd = () => {
  console.log('Game ended with score:', 42);
  onGameEnd(42);
};

// Add a debug button
{process.env.NODE_ENV === 'development' && (
  <button onClick={handleTestEnd}>Debug End Game</button>
)}
```

## Assets & Icons

### Game Icons
- Use emoji (simplest): `🎮 ⭕ 🐍`
- Or create SVG icons in `src/assets/game-icons/`
- Or use PNG icons from services like Freepik

### UI Assets
- Use Tailwind classes for all styling
- Avoid external CSS
- Keep file sizes small
- Use CDN for images if needed

## Common Issues & Solutions

### Game Not Appearing
1. Check import in `games.ts`
2. Verify `id` is unique
3. Restart dev server

### Score Not Saving
1. Check Firestore rules
2. Verify user is authenticated
3. Check browser console for errors

### Performance Issues
1. Use `useCallback` for event handlers
2. Limit re-renders with `React.memo`
3. Profile with DevTools

## Example: Complete Memory Game

```typescript
import React, { useState, useEffect } from 'react';

interface MemoryGameProps {
  onGameEnd: (score: number) => void;
}

const EMOJIS = ['🍎', '🍌', '🍒', '🍕', '🎮', '🎯'];

export const MemoryGame: React.FC<MemoryGameProps> = ({ onGameEnd }) => {
  const [cards, setCards] = useState<{id:number; emoji:string; flipped:boolean}[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);

  useEffect(() => {
    // Initialize game
    const newCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({
        id: i,
        emoji,
        flipped: false,
      }));
    setCards(newCards);
  }, []);

  const handleCardClick = (id: number) => {
    if (cards[id].flipped) return;
    
    setMoves(m => m + 1);
    
    // Game logic...
    
    // Check if won
    if (matched === EMOJIS.length) {
      const score = Math.max(0, 1000 - moves * 50);
      onGameEnd(score);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <h1 className="text-4xl font-bold">Memory Game</h1>
      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="w-16 h-16 bg-slate-700 rounded-lg font-bold text-3xl"
          >
            {card.flipped ? card.emoji : '?'}
          </button>
        ))}
      </div>
    </div>
  );
};
```

## Need Help?

- Check existing games for patterns
- Read React & TypeScript docs
- Test locally with hot reload
- Use browser DevTools

---

Happy game development! 🎮
