const crypto = require("otp-generator")
 function generateOtp(length = 6) {
    // Generate random bytes
    const randomBytes =crypto.generate(length, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets:false});
    
    // Convert the bytes to a base64 string and extract the desired length
    
    // Ensure the OTP is numeric if desired
    return randomBytes
}
