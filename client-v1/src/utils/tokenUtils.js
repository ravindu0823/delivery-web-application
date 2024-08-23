import axios from 'axios';

// Constants for API endpoints
const LOGIN_URL = 'https://checkmateapi20240716235602.azurewebsites.net/api/User/login';
const REFRESH_URL = 'https://checkmateapi20240716235602.azurewebsites.net/api/User/refresh';
const TOKEN_KEY = 'authToken';
const ORGANIZATION = '1e7071f0-dacb-4a98-f264-08dcb066d923';

// Get the current timestamp in milliseconds
const getCurrentTimestamp = () => new Date().getTime();

// Get token data from local storage
function getTokenFromLocalStorage() {
    const tokenData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return tokenData || null;
}

// Set token data in local storage
function setToken(accessToken, refreshToken, expiration) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify({
        accessToken,
        refreshToken,
        expiration
    }));
}

// Remove token data from local storage
function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

// Check if the token is expired
function isTokenExpired() {
    const tokenData = getTokenFromLocalStorage();
    if (!tokenData) return true;
    return getCurrentTimestamp() >= tokenData.expiration;
}

// Generate a new token using API
async function generateToken() {
    try {
        const response = await axios.post(LOGIN_URL, {
            userName: 'serendib@gmail.com',
            password: 'Anubaba@123'
        });
        const { accessToken, refreshToken } = response.data;
        const expirationTime = getCurrentTimestamp() + 3600000; // 1 hour expiration
        setToken(accessToken, refreshToken, expirationTime);
        return accessToken;
    } catch (error) {
        console.error('Error generating token:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Refresh the token using API
async function refreshToken() {
    try {
        const tokenData = getTokenFromLocalStorage();
        if (!tokenData) throw new Error('No refresh token available');

        const { refreshToken } = tokenData;
        const response = await axios.post(REFRESH_URL, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        const expirationTime = getCurrentTimestamp() + 3600000; // 1 hour expiration
        setToken(accessToken, newRefreshToken, expirationTime);
        return accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error.response ? error.response.data : error.message);
        removeToken(); // Remove token if refreshing fails
        throw error;
    }
}

// Main function to get a valid token
export const getValidToken = async () => {
    const tokenData = getTokenFromLocalStorage();

    if (tokenData === null) {
        // No token available, generate a new one
        return await generateToken();
    } else {
        if (isTokenExpired()) {
            // Token is expired, try to refresh it
            try {
                return await refreshToken();
            } catch (error) {
                // If refreshing fails, generate a new token
                return await generateToken();
            }
        } else {
            // Token is valid
            return tokenData.accessToken;
        }
    }
};

export { ORGANIZATION };
