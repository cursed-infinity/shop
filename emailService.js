// Email Service using SendGrid
// This file handles sending OTP emails

const SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY_HERE';
const FROM_EMAIL = 'yuggoswami089@gmail.com';

async function sendOTPEmail(email, otp, username) {
    try {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SENDGRID_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                personalizations: [{
                    to: [{ email: email }],
                    subject: `🎮 Your Minigames Hub OTP: ${otp}`,
                }],
                from: { email: FROM_EMAIL, name: 'Minigames Hub' },
                content: [{
                    type: 'text/html',
                    value: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; background: #f5f5f5; }
                                .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; text-align: center; }
                                .header { color: #00d4ff; font-size: 28px; margin-bottom: 20px; }
                                .otp-box { background: linear-gradient(135deg, #00d4ff, #0099ff); color: white; padding: 20px; border-radius: 10px; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; }
                                .message { color: #333; font-size: 16px; line-height: 1.6; }
                                .footer { color: #999; font-size: 12px; margin-top: 30px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">🎮 Minigames Hub</div>
                                <p class="message">Hi ${username || 'Player'},</p>
                                <p class="message">Your OTP for email verification is:</p>
                                <div class="otp-box">${otp}</div>
                                <p class="message">This OTP will expire in 10 minutes.</p>
                                <p class="message">If you didn't request this, please ignore this email.</p>
                                <div class="footer">
                                    <p>© 2025 Minigames Hub. All rights reserved.</p>
                                    <p>Contact: yuggoswami089@gmail.com | kalpeshgoswami9@gmail.com</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `
                }]
            })
        });

        if (response.ok) {
            console.log('✅ OTP email sent to:', email);
            return { success: true, message: 'OTP sent to email' };
        } else {
            console.error('❌ Failed to send email:', response.status);
            return { success: false, message: 'Failed to send email' };
        }
    } catch (error) {
        console.error('❌ Email service error:', error);
        return { success: false, message: error.message };
    }
}

export { sendOTPEmail };
