const API_BASE_URL = 'https://your-api-url.com/api';

async function fetchClaims() {
    const response = await fetch(`${API_BASE_URL}/claims`);
    if (!response.ok) {
        throw new Error('Failed to fetch claims');
    }
    return await response.json();
}

async function saveVerification(claim) {
    const response = await fetch(`${API_BASE_URL}/verifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(claim),
    });
    if (!response.ok) {
        throw new Error('Failed to save verification');
    }
    return await response.json();
}

async function authenticateUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Authentication failed');
    }
    return await response.json();
}