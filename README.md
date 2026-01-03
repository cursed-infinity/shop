# Minigames Hub

A professional, modern gaming portal with **20+ playable minigames**, robust authentication with OTP verification, coin economy, leaderboards, and an admin dashboard.

## 🎮 Core Features

### 1. **Authentication & Security**
- Email + password signup with form validation
- 6-digit OTP verification (10-minute expiry, 60s resend cooldown)
- Persistent JWT-based sessions with "Remember Me"
- Password reset via email OTP
- ReCAPTCHA protection on signup/login (ready to integrate)
- Rate limiting on critical endpoints
- Firestore security rules with auth verification

### 2. **20+ Playable Games** ✅
All games are fully client-side with modern UI, mobile support, and sound effects:

**Currently Implemented:**
- **Classic**: TicTacToe ✅, Hangman ✅
- **Arcade**: Snake ✅
- **Puzzles**: 2048 ✅, Memory Match ✅
- **Reaction**: Reaction Test ✅
- **Number**: Guess The Number ✅

**Ready for Implementation (15+ more):**
- Connect4, Pong, Brick Breaker, Tetris
- Minesweeper, Sliding Puzzle, Simon Says
- Typing Test, Whack-a-Mole
- Spot The Difference, Maze Runner, Mini Sudoku
- Color Matching, and more!

### 3. **Coins & Ranks System** ✅
- Earn coins per game (configurable per game)
- 6 rank tiers: Bronze → Silver → Gold → Pro → Master → Legend
- Global + per-game leaderboards (top 100) ✅
- User profile with stats, achievements, and best scores
- Real-time coin updates

### 4. **Admin Dashboard** ✅
- User management (view, block, delete)
- Game settings (enable/disable, coin rewards)
- Leaderboard management
- Analytics and metrics
- User activity tracking

### 5. **UX/UI** ✅
- Dark gaming aesthetic with neon accents
- Glassmorphism design with backdrop blur
- Smooth animations (Framer Motion)
- Mobile-responsive layout
- Sound & notification controls
- Fullscreen modal game launcher

### 6. **Additional Features** (Ready for Phase 2)
- [ ] PWA support (installable on mobile)
- [ ] Daily challenges & login bonuses
- [ ] Achievements & badges system
- [ ] Social sharing & referral bonuses
- [ ] In-app coin purchases (Stripe/Razorpay)
- [ ] Google Analytics integration

## 📋 Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 18 (Vite), TypeScript, Tailwind CSS, Framer Motion |
| **State** | Zustand (with localStorage persistence) |
| **Backend** | Firebase (Auth + Firestore + Cloud Functions) |
| **Email** | SendGrid API for OTP delivery |
| **Storage** | Firebase Storage for game assets |
| **Hosting** | Vercel / Firebase Hosting |
| **Payments** | Stripe / Razorpay (optional) |
| **Analytics** | Google Analytics / Plausible (ready) |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase project (free tier works)
- SendGrid account (free tier works - 100 emails/day)

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd minigames-hub

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# Edit .env.local with your Firebase credentials and SendGrid API key
# See SETUP_GUIDE.md for detailed instructions

# 4. Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Environment Variables

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# SendGrid / Email
VITE_SENDGRID_API_KEY=your_sendgrid_key
VITE_SUPPORT_EMAIL=yuggoswami089@gmail.com
VITE_SUPPORT_EMAIL_ALT=kalpeshgoswami9@gmail.com

# Environment
VITE_ENV=production
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/                    # Login, signup, OTP screens
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── OTPVerification.tsx
│   │   └── AuthModal.tsx
│   ├── Games/                   # 20+ game components
│   │   ├── TicTacToe/
│   │   ├── Snake/
│   │   ├── Game2048/
│   │   ├── MemoryMatch/
│   │   ├── Hangman/
│   │   ├── GuessTheNumber/
│   │   ├── ReactionTest/
│   │   └── ... (13+ more)
│   ├── Dashboard/
│   │   ├── GameHub.tsx          # Main games grid and leaderboard
│   │   └── GameLauncher.tsx     # Game player modal
│   ├── Admin/
│   │   └── AdminDashboard.tsx   # Admin panel
│   └── Common/
│       └── Header.tsx            # Top navigation
├── services/
│   ├── firebase.ts              # Firebase initialization
│   └── authService.ts           # Auth logic (signup, OTP, login, etc.)
├── store/
│   └── authStore.ts             # Zustand state management
├── data/
│   └── games.ts                 # Game registry (20+ games)
├── types/
│   └── index.ts                 # TypeScript interfaces
├── App.tsx                      # Main app component
├── App.css                      # Global styles & animations
└── index.css                    # Tailwind directives

public/                          # Static assets
functions/
├── src/
│   └── index.ts                # Cloud Functions (OTP, scores, etc.)
└── package.json
```

## 🎮 How to Play

1. **Sign up** with email and password
2. **Verify OTP** sent to your email (6 digits, valid for 10 mins)
3. **Browse games** on the Games Hub
4. **Click "Play"** to launch any game in fullscreen
5. **Win to earn coins** and climb the ranks
6. **Check leaderboards** to compete with others

## 👨‍💼 Admin Dashboard

Access admin features (when implemented):

**Features:**
- View all registered users
- Block/unblock accounts
- Delete users
- Configure coin rewards per game
- View global analytics
- Manage leaderboards

## 🎮 Playing a Game

### First Time
1. Click any game card
2. Read description, difficulty, and coin reward
3. Click "Play Now" to start
4. Game opens in fullscreen modal

### Scoring
- Each game returns a score (0-1000)
- Coins earned = Game's coinsReward × (Your Score / 100)
- Example: 2048 (200 coins) with score 75 = 150 coins earned

### Game Loop
1. Play game
2. Game ends (win/lose/timeout)
3. Score saved to Firestore
4. Coins updated + rank recalculated
5. Back to hub

## 📝 Adding a New Game

### Complete 3-Step Process

**Step 1: Create Component** (`src/components/Games/YourGame/YourGame.tsx`)
```typescript
import React, { useState } from 'react';

interface YourGameProps {
  onGameEnd: (score: number) => void;
}

export const YourGame: React.FC<YourGameProps> = ({ onGameEnd }) => {
  const [score, setScore] = useState(0);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Your game UI */}
      <button onClick={() => onGameEnd(score)}>End Game</button>
    </div>
  );
};
```

**Step 2: Register in Registry** (`src/data/games.ts`)
```typescript
import { YourGame } from './YourGame/YourGame';

export const GAMES: GameConfig[] = [
  {
    id: 'your-game',
    name: 'Your Game',
    description: 'Description',
    icon: '🎮',
    component: YourGame,
    timeToPlay: '5 mins',
    coinsReward: 100,
    difficulty: 'Medium',
    category: 'Arcade',
  },
  // ... other games
];
```

**Step 3: Test**
```bash
npm run dev
# Game appears in hub - ready to play!
```

**For detailed guide:** See `HOW_TO_ADD_GAMES.md`

## 🔒 Security

✅ **Implemented:**
- Firebase Authentication with email/password
- Server-side OTP generation & verification
- Firestore Security Rules (auth-based)
- JWT token verification
- Secure environment variables
- HTTPS in production

🔄 **Ready to Integrate:**
- ReCAPTCHA on signup/login forms
- Rate limiting with Cloud Functions
- CORS configuration
- CSP Headers
- Admin role verification

## 🔐 Database Schema (Firestore)

```
users/{userId}
├── email: string
├── username: string
├── coins: number (total)
├── rank: string (Bronze/Silver/Gold/Pro/Master/Legend)
├── totalPoints: number
├── gamesPlayed: number
├── avatar: string (URL)
├── otpVerified: boolean
├── isBlocked: boolean
├── createdAt: timestamp
└── lastLogin: timestamp

gameScores/{scoreId}
├── userId: string
├── gameId: string
├── score: number
├── coinsEarned: number
├── playedAt: timestamp
└── duration: number (ms)

otpCodes/{userId}
├── email: string
├── otp: string (6 digits)
├── expiresAt: timestamp (10 mins)
├── verified: boolean
└── createdAt: timestamp

leaderboard/
├── global/{userId}
│   └── coins: number (total coins)
└── {gameId}/{userId}
    └── score: number (best score)
```

## 🚢 Deployment

### Option 1: Firebase Hosting

```bash
# Build
npm run build

# Deploy
firebase login
firebase init hosting  # (if first time)
firebase deploy
```

**Pros:**
- Integrated with Firebase
- CDN globally distributed
- Free SSL
- Automatic HTTPS

### Option 2: Vercel

```bash
# Push to GitHub
git push origin main

# Connect on Vercel dashboard
# Add environment variables
# Auto-deploys on push
```

**Pros:**
- Easier setup
- Better performance
- Built-in analytics
- Preview URLs

### Full Deployment Guide
See `SETUP_GUIDE.md` for step-by-step instructions

## 📊 Database Backup

```bash
# Export Firestore
firebase firestore:export ./backups/$(date +%Y%m%d)

# Import Firestore
firebase firestore:import ./backups/20240101
```

## 🐛 Development & Debugging

### Run with Console Logs
In development, OTP is logged to console:
```
DEBUG OTP: 123456 (valid for 10 mins)
```

### Test Firebase Functions Locally
```bash
firebase emulators:start --only functions,firestore
```

### Build Locally
```bash
npm run build
# Check dist/ folder for production files
```

### Lint & Type Check
```bash
npm run lint
# ESLint checks TypeScript
```

## 📞 Contact & Support

- **Primary Support:** yuggoswami089@gmail.com
- **Alternate Support:** kalpeshgoswami9@gmail.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-game`)
3. Implement your game (see `HOW_TO_ADD_GAMES.md`)
4. Test thoroughly
5. Commit changes (`git commit -m 'Add: Amazing Game'`)
6. Push to branch (`git push origin feature/amazing-game`)
7. Open a Pull Request

## 📄 License

MIT License - Free to use for any purpose

## 🎯 Project Phases

### Phase 1: Core Auth & Games ✅
- [x] Authentication system
- [x] OTP verification
- [x] 7 working games
- [x] Coins & ranking system
- [x] Global leaderboards
- [x] Game hub dashboard
- [ ] 13+ more games

### Phase 2: Polish & Admin 🔄
- [ ] 20 total games (complete)
- [ ] Admin dashboard (working)
- [ ] Game management panel
- [ ] User blocking/management
- [ ] Mobile optimization
- [ ] Bug fixes & performance

### Phase 3: Advanced Features ⏳
- [ ] PWA support
- [ ] Daily challenges
- [ ] Tournaments
- [ ] Achievements & badges
- [ ] In-app purchases
- [ ] Referral system
- [ ] Localization (Hindi/English)

## 📈 Roadmap

- **v0.1** (Current): Auth + 7 core games + leaderboards
- **v0.2**: 20 games + admin dashboard + polish
- **v0.3**: PWA + analytics + monetization
- **v1.0**: Full launch with tournaments & achievements

## 🎮 Sample Game Scores

| Game | Easy | Medium | Hard | Avg |
|------|------|--------|------|-----|
| TicTacToe | 100 | - | - | 100 |
| Snake | 150 | 250 | 500 | 300 |
| 2048 | 200 | 400 | 800 | 500 |
| Memory Match | 120 | 200 | 300 | 200 |
| Hangman | 110 | 200 | 300 | 200 |
| Reaction Test | 80 | 150 | 300 | 180 |

## ⚡ Performance Tips

- Games are lightweight (client-side only)
- Firestore queries are optimized with pagination
- Leaderboards cached in browser
- Images lazy-loaded
- CSS-in-JS minimal

---

**Built with ❤️ for gaming enthusiasts**

Last Updated: December 2025

