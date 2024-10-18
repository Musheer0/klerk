import crypto from 'crypto'
export function generateOtp(length = 6) {
    // Generate random bytes
    const randomBytes = crypto.randomBytes(length);
    
    // Convert the bytes to a base64 string and extract the desired length
    const otp = randomBytes.toString('base64').replace(/\+/g, '0').slice(0, length);
    
    // Ensure the OTP is numeric if desired
    return otp.replace(/[^\d]/g, '').slice(0, length);
}