# 📧 SendGrid Setup Guide - OTP Email Service

## Step 1: Create SendGrid Account
1. Go to https://sendgrid.com/
2. Click "Sign Up"
3. Fill in your details
4. Verify your email
5. Login to dashboard

## Step 2: Create API Key
1. In SendGrid dashboard, go to **Settings → API Keys**
2. Click "Create API Key"
3. Name: `Minigames Hub OTP`
4. Select "Full Access" (for now)
5. Create and **copy the key**

⚠️ **Important:** This key is shown only ONCE. Copy it immediately!

## Step 3: Update index.html
1. Open `c:\Users\yug\Desktop\games.net\index.html`
2. Find this line (around line 850):
```javascript
'Authorization': 'Bearer SG.YOUR_SENDGRID_API_KEY_HERE',
```

3. Replace `SG.YOUR_SENDGRID_API_KEY_HERE` with your actual API key:
```javascript
'Authorization': 'Bearer SG.xxxxxxxxxxxxxxxxxxxx_your_key_here',
```

## Step 4: Verify Sender Email (IMPORTANT)
SendGrid requires you to verify the sender email address.

### Option A: Verify Your Email (Free)
1. In SendGrid, go to **Settings → Sender Authentication**
2. Click "Verify a Single Sender"
3. Enter `yuggoswami089@gmail.com`
4. Click link in verification email from SendGrid
5. ✅ Done!

### Option B: Domain Authentication (Advanced)
1. Go to **Settings → Sender Authentication**
2. Click "Authenticate Your Domain"
3. Follow DNS setup (requires domain access)

## Step 5: Test It!
1. Open `index.html` in browser
2. Click "Create Account"
3. Fill in:
   - Username: `TestUser`
   - Email: Your email
   - Password: `Test@12345`
4. Click "Create Account"
5. Check your email inbox for OTP! 📬

## Troubleshooting

### ❌ Email not received?
- Check **Spam/Junk folder**
- Verify sender email in SendGrid
- Check SendGrid **Activity Feed** (Settings → Email Activity)
- Look at browser console (F12) for errors

### ❌ "Authorization failed" error?
- API Key is wrong or incomplete
- Make sure to include `SG.` prefix
- Don't add extra spaces
- Copy the ENTIRE key

### ❌ "From email not verified"?
- Verify sender email in SendGrid first
- Wait 5-10 minutes after verification
- Use verified email as FROM address

## API Key Security
⚠️ **NEVER commit API key to GitHub!**

If you accidentally exposed it:
1. Go to SendGrid API Keys settings
2. Delete the old key
3. Create a new one
4. Update your code

## Console Logs to Check
Open browser console (F12 → Console tab) to see:
```
✅ OTP email sent successfully to: your@email.com
```

If email fails, you'll see:
```
❌ Failed to send email. Please check SendGrid API key.
📧 OTP (fallback): 123456
```

## Production Setup
For production deployment:
1. Store API key in environment variables
2. Use `.env.local` file (never commit to git)
3. Keep API key secure
4. Enable Domain Authentication for better deliverability

---

**Questions?** Check SendGrid docs: https://docs.sendgrid.com/
