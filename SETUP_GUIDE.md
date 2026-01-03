# Minigames Hub - Setup & Deployment Guide

## 📋 Prerequisites

- **Node.js** 18+ and npm/yarn
- **Firebase Project** (free tier works)
- **SendGrid Account** (free tier works)
- **Git** for version control

## 🚀 Initial Setup

### 1. Clone and Install Dependencies

```bash
# Clone repository
git clone <your-repo-url>
cd minigames-hub

# Install frontend dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable these services:
   - **Authentication** (Email/Password)
   - **Firestore Database** (Start in test mode)
   - **Cloud Storage**
   - **Cloud Functions**

4. Get your Firebase config:
   - Go to Project Settings → Service Accounts
   - Copy your Web SDK config

### 3. Configure Environment Variables

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local with your credentials
```

**Required variables:**
```env
VITE_FIREBASE_API_KEY=abc123...
VITE_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=yourproject
VITE_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...

VITE_SENDGRID_API_KEY=SG.abc123...
VITE_SUPPORT_EMAIL=yuggoswami089@gmail.com
```

### 4. SendGrid Setup

1. Go to [SendGrid](https://sendgrid.com)
2. Create an account (free tier)
3. Create an API key:
   - Settings → API Keys → Create API Key
   - Select "Restricted Access"
   - Enable "Mail Send"
   - Copy the key to `.env.local`

### 5. Set Up Firebase Functions

```bash
# Login to Firebase
npm install -g firebase-tools
firebase login

# Initialize functions (if not done)
firebase init functions

# Set environment variables for functions
firebase functions:config:set sendgrid.api_key="your_sendgrid_key"
firebase functions:config:set support.email="yuggoswami089@gmail.com"
```

### 6. Create Firestore Indexes

Go to Firebase Console → Firestore Database → Indexes and create:

```
Collection: leaderboard/global
Fields: coins (Descending)

Collection: leaderboard/{gameId}
Fields: score (Descending)

Collection: gameScores
Fields: userId (Ascending), playedAt (Descending)
```

## 💻 Development

### Run Locally

```bash
# Start dev server
npm run dev

# In another terminal, start Firebase emulator
firebase emulators:start

# Deploy functions to local emulator
firebase deploy --only functions
```

The app will open at `http://localhost:3000`

### Test OTP Flow

In development, OTP will be logged to console:
```
DEBUG OTP: 123456
```

## 🔧 Firestore Security Rules

Set these rules in Firestore (Security Rules tab):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for leaderboards
    match /leaderboard/{document=**} {
      allow read;
    }

    // User data: only owner can read/write
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }

    // Game scores: only owner can read, functions can write
    match /gameScores/{document=**} {
      allow read: if resource.data.userId == request.auth.uid;
      allow write: if request.auth.uid != null;
    }

    // OTP codes: only readable by auth functions
    match /otpCodes/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 🏗️ Building for Production

```bash
# Build frontend
npm run build

# Build Cloud Functions
cd functions
npm run build
cd ..

# Deploy to Firebase Hosting
firebase deploy
```

## 📦 Deploying to Vercel (Alternative)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - Copy all VITE_* variables from `.env.local`
5. Deploy!

The app will auto-deploy on push to main branch.

## 🔐 Security Checklist

- [ ] Firebase project is not in test mode
- [ ] Firestore rules are set (not test rules)
- [ ] Environment variables not in git
- [ ] Firebase API key restricted (only Auth, Firestore, Storage)
- [ ] CORS configured for sendGrid calls
- [ ] HTTPS enforced
- [ ] Rate limiting on OTP endpoint

## 🐛 Troubleshooting

### OTP Not Sending?

1. Check Firebase Function logs:
   ```bash
   firebase functions:log
   ```

2. Verify SendGrid API key in Firebase config:
   ```bash
   firebase functions:config:get
   ```

3. Check email in spam folder

### Games Not Loading?

1. Clear browser cache
2. Check console for errors (F12)
3. Verify Firestore database is running

### Firestore Errors?

1. Check Firestore Security Rules
2. Verify collection names match code
3. Check Firebase project ID in `.env.local`

## 📊 Database Backup

```bash
# Export data (requires firebase-tools)
firebase firestore:export ./backups/$(date +%Y%m%d)

# Import data
firebase firestore:import ./backups/20240101
```

## 🚀 Scaling Tips

- **Read:** Consider caching leaderboards with Cloud CDN
- **Write:** Rate limit game score saves per user
- **Storage:** Use Cloud Storage for game assets, CDN for delivery
- **Database:** Archive old game scores monthly

## 📞 Support

- **Contact:** yuggoswami089@gmail.com
- **Alternate:** kalpeshgoswami9@gmail.com

---

For more detailed Firebase docs, visit: https://firebase.google.com/docs
