import OtpGenerator from 'otp-generator'
export function generateOtp(length = 6) {
    const randomBytes =OtpGenerator.generate(length, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets:false});
    return randomBytes
}
