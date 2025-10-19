const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

async function fetchClaims() {
    try {
        const response = await fetch(`${API_BASE_URL}/claims`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching claims:', error);
        return [];
    }
}

async function saveVerification(claim) {
    try {
        const response = await fetch(`${API_BASE_URL}/verifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(claim),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error saving verification:', error);
    }
}

async function authenticateUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error authenticating user:', error);
    }
}