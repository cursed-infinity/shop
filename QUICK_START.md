# Quick Start Guide - Minigames Hub

## 🚀 Get Started in 5 Minutes

### 1. Prerequisites Check
```bash
# Check Node.js version (need 18+)
node --version

# Check npm version
npm --version
```

### 2. Clone & Install
```bash
git clone <repo-url>
cd minigames-hub
npm install
```

### 3. Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Name it "minigames-hub"
4. Accept default settings
5. Wait for project creation (2-3 minutes)

### 4. Get Firebase Credentials
1. In Firebase Console, click ⚙️ (Settings)
2. Click "Project Settings"
3. Scroll to "Your apps" section
4. Click "Web" icon (if not already there)
5. Copy the config object

### 5. Enable Services
In Firebase Console:
1. Go to "Authentication" → Click "Get Started"
2. Enable "Email/Password" method
3. Go to "Firestore Database" → Click "Create Database"
   - Select "Start in test mode"
   - Choose region closest to you
4. Go to "Storage" → Click "Get Started"

### 6. Create SendGrid Account
1. Go to https://sendgrid.com
2. Create free account
3. Verify your account (check email)
4. Go to Settings → API Keys
5. Click "Create API Key"
6. Name it "minigames-hub"
7. Copy the API key

### 7. Configure Environment
```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with your details
# Paste Firebase config from step 4
# Paste SendGrid API key from step 6
```

Example `.env.local`:
```env
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=minigames-hub.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=minigames-hub
VITE_FIREBASE_STORAGE_BUCKET=minigames-hub.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...

VITE_SENDGRID_API_KEY=SG.xxxxx
VITE_SUPPORT_EMAIL=yuggoswami089@gmail.com
VITE_SUPPORT_EMAIL_ALT=kalpeshgoswami9@gmail.com

VITE_ENV=development
```

### 8. Start Development Server
```bash
npm run dev
```

### 9. Test the App
1. App opens at http://localhost:3000
2. Click "Sign Up"
3. Enter test email: `test@example.com`
4. Password: `Test12345`
5. Watch for OTP in browser console (development mode)
6. Enter OTP in the verification screen
7. Play games!

---

## 🔑 Finding Your Firebase Keys

**Location:** Firebase Console → Project Settings → General

```
API Key: VITE_FIREBASE_API_KEY
Auth Domain: VITE_FIREBASE_AUTH_DOMAIN
Project ID: VITE_FIREBASE_PROJECT_ID
Storage Bucket: VITE_FIREBASE_STORAGE_BUCKET
Sender ID: VITE_FIREBASE_MESSAGING_SENDER_ID
App ID: VITE_FIREBASE_APP_ID
```

## 📧 SendGrid API Key

**Location:** https://app.sendgrid.com/settings/api_keys

1. Click "Create API Key"
2. Set permissions: Mail Send
3. Copy full key (starts with "SG.")

## 🎮 Test Gameplay

### First Game
1. Sign in
2. Search for "Reaction Test"
3. Click the game card
4. Click "Play Now"
5. Game opens fullscreen
6. Follow instructions (click when green)
7. See your score + coins earned

### Try Different Difficulty
1. Back to hub
2. Try "Snake" (Medium difficulty)
3. Use arrow keys to move
4. Higher score = more coins!

## 🔍 Firestore Security Rules

Set these in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public leaderboards
    match /leaderboard/{document=**} {
      allow read;
    }

    // User data: only owner reads/writes
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }

    // Game scores
    match /gameScores/{document=**} {
      allow read: if resource.data.userId == request.auth.uid;
      allow write: if request.auth.uid != null;
    }

    // OTP codes
    match /otpCodes/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 📱 Test on Mobile

```bash
# Note your local IP
ipconfig getifaddr en0  # macOS
hostname -I             # Linux
ipconfig                # Windows → find IPv4 Address

# Start Vite with --host flag
npm run dev -- --host

# Open on mobile: http://YOUR_IP:3000
```

## ✅ Troubleshooting

### "apiKey is invalid"
- Check `.env.local` Firebase keys
- Make sure API Key isn't restricted in Firebase Console

### "OTP not sending"
- Check SendGrid API key is correct
- Verify email is in VITE_SUPPORT_EMAIL
- Check browser console for errors

### Game not loading
- Check browser console (F12)
- Restart dev server: `npm run dev`
- Clear browser cache (Ctrl+Shift+Del)

### Can't verify OTP
- In development, check browser console for OTP code
- OTP valid for 10 minutes only
- Try "Resend OTP"

## 📚 Next Steps

1. **Read full README:** `README.md`
2. **Setup guide:** `SETUP_GUIDE.md`
3. **Add games:** `HOW_TO_ADD_GAMES.md`
4. **Deploy:** See "Deployment" section in README.md

## 🎮 Build & Deploy

```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy to Firebase Hosting
firebase deploy

# OR Deploy to Vercel
# (Just push to GitHub, Vercel auto-deploys)
```

## 💡 Pro Tips

1. **Hot Reload:** Edit code → auto-updates in browser
2. **DevTools:** Press F12 in browser to debug
3. **Firestore Rules:** Use "Publish" to apply rules
4. **Test Data:** Create test user in Firebase Auth console

## 🆘 Need Help?

- **Email:** yuggoswami089@gmail.com
- **Backup:** kalpeshgoswami9@gmail.com
- **Docs:** See README.md and SETUP_GUIDE.md

---

**You're all set!** 🎉

Go ahead and test the app. More games coming soon!
