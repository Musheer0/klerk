export const getOSName = (userAgent:string) => {
    if (userAgent.includes("Windows NT 10.0")) {
        return "Windows 10";
    } else if (userAgent.includes("Windows NT 6.3")) {
        return "Windows 8.1";
    } else if (userAgent.includes("Windows NT 6.2")) {
        return "Windows 8";
    } else if (userAgent.includes("Windows NT 6.1")) {
        return "Windows 7";
    } else if (userAgent.includes("Mac OS X")) {
        return "macOS";
    } else if (userAgent.includes("Linux")) {
        return "Linux";
    } else if (userAgent.includes("Android")) {
        return "Android";
    } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
        return "iOS";
    }
    return "Unknown OS";
};