export interface UserData {
    name: string
    email: string
    phone: string
    address: string
    nhsNumber: string
    dateOfBirth: string
    expiryTime?: number
}

const USER_DATA_KEY = "phr_user_data"
const DEFAULT_EXPIRY_HOURS = 24

function setCookie(value: string, maxAge: number): void {
    document.cookie = `${USER_DATA_KEY}=${value}; max-age=${maxAge}; path=/`;
}

function getCookie(): string | null {
    const name = `${USER_DATA_KEY}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

export function getCookieAge(hours: number = DEFAULT_EXPIRY_HOURS): number {
    return hours * 60 * 60;
}

// Initialize mock user data if none exists
export function initializeUserData(): void {
    const existingData = getUserData()
    if (!existingData) {
        const mockData: UserData = {
            name: "Test User",
            email: "testuser@example.com",
            phone: "07779144842",
            address: "71 High St, Sheffield City Centre, Sheffield, S1 2GD",
            nhsNumber: "123 456 7890",
            dateOfBirth: "21/4/1992",
            expiryTime: getExpiryTime(),
        }

        const maxAge = getCookieAge();
        setCookie(JSON.stringify(mockData), maxAge);
        console.log(`User data initialized in cookie with max-age of ${maxAge} seconds.`);
    } else {
        // If data exists, update the expiry time
        updateExpiryTime()
    }
}

// get user data from cookie
export function getUserData(): UserData | null {
    const data = getCookie();
    if (!data) return null;
    try {
        const userData = JSON.parse(data) as UserData;
        return userData;
    } catch (error) {
        console.error("Error parsing user data from cookie:", error);
        document.cookie = `${USER_DATA_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        return null;
    }
}

// update user data in cookie
export function updateUserData(userData: UserData): void {
    // Preserve the existing expiry time if it exists
    const existingData = getUserData()
    const expiryTime = existingData?.expiryTime || getExpiryTime()
    const updateData = {...userData, expiryTime} 

    // Calculate maxAge in seconds based on expiryTime
    const maxAge = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
    setCookie(JSON.stringify(updateData), maxAge);
}


//  ============ Expiry Time =============
// get expiry time based on current settings
export function getExpiryTime(hoursFromNow = DEFAULT_EXPIRY_HOURS): number {
    return Date.now() + hoursFromNow * 60 * 60 * 1000
}


// set custom expiry time in hours
export function updateExpiryTime(hours: number = DEFAULT_EXPIRY_HOURS): void {
    const userData = getUserData()
    if (userData) {
        userData.expiryTime = getExpiryTime(hours)
        const maxAge = getCookieAge(hours)
        setCookie(JSON.stringify(userData), maxAge)
    }
}

// get time remaining until expiry in milliseconds
export function getTimeRemainingMs(): number {
    const userData = getUserData()
    if (!userData || !userData.expiryTime) return 0

    const remaining = userData.expiryTime - Date.now()
    return remaining > 0 ? remaining : 0
}

// get formatted time remaining string (HH:MM:SS) [AI assisted]
export function getFormattedTimeRemaining(): string {
    const remainingMs = getTimeRemainingMs()

    if (remainingMs <= 0) return "00:00:00"

    const seconds = Math.floor((remainingMs / 1000) % 60)
    const minutes = Math.floor((remainingMs / (1000 * 60)) % 60)
    const hours = Math.floor(remainingMs / (1000 * 60 * 60))

    return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
    ].join(":")
}
