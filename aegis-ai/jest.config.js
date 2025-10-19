**File path: /Users/rajdeepsingh/Downloads/aegis_ai-main/js/api.js**

const API_BASE_URL = 'https://your-backend-api.com/api'; // Replace with your actual API URL

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

export { fetchClaims, saveVerification, authenticateUser };

Next, let's create a file for handling the UI logic.

**File path: /Users/rajdeepsingh/Downloads/aegis_ai-main/js/ui.js**

import { fetchClaims, saveVerification, authenticateUser } from './api.js';

document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
});

async function initializeApp() {
    try {
        const claims = await fetchClaims();
        populateFeed(claims);
    } catch (error) {
        console.error(error);
    }
}

function populateFeed(claims) {
    const container = document.getElementById("feedContainer");
    container.innerHTML = "";

    claims.forEach((claim, index) => {
        const item = createFeedItem(claim, index);
        container.appendChild(item);
    });
}

function createFeedItem(claim, index) {
    const div = document.createElement("div");
    div.className = "border border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow slide-in bg-gray-700 premium-glow";
    div.innerHTML = `
        <div class="flex items-start justify-between">
            <div class="flex-1">
                <p>${claim.text}</p>
                <p>Status: ${claim.status}</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="showExplanation(${index})">Explain</button>
            </div>
        </div>
    `;
    return div;
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const user = await authenticateUser(email, password);
        updateUserInterface(user);
    } catch (error) {
        console.error(error);
    }
}

function updateUserInterface(user) {
    const userSection = document.getElementById("userSection");
    const userProfile = document.getElementById("userProfile");
    const userName = document.getElementById("userName");

    if (user) {
        userSection.classList.add("hidden");
        userProfile.classList.remove("hidden");
        userName.textContent = user.name;
    } else {
        userSection.classList.remove("hidden");
        userProfile.classList.add("hidden");
    }
}

export { initializeApp, handleLogin };

Next, let's create a file for the HTML templates.

**File path: /Users/rajdeepsingh/Downloads/aegis_ai-main/templates/home.html**

<div id="homePage" class="page active">
    <div class="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="container mx-auto px-6 text-center relative z-10">
            <h1 class="text-4xl font-bold text-white mb-4">Welcome to Aegis</h1>
            <p class="text-gray-400 text-lg">Your advanced misinformation detection tool.</p>
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Feature Cards will be populated here -->
            </div>
        </div>
    </div>
</div>

Now, let's create a file for the verification page.

**File path: /Users/rajdeepsingh/Downloads/aegis_ai-main/templates/verify.html**

<div id="verifyPage" class="page">
    <div class="container mx-auto px-6 py-8">
        <h1 class="text-4xl font-bold text-white mb-4">Aegis Quantum Fact Checker</h1>
        <p class="text-gray-400 text-lg">Verify claims instantly with quantum-enhanced AI verification</p>
        <div class="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 mb-8 premium-glow">
            <input type="text" id="claimInput" placeholder="Enter claim to verify" class="w-full p-2 rounded-lg" />
            <button onclick="quantumVerifyClaim()">Verify Claim</button>
            <div id="verificationResult" class="hidden"></div>
        </div>
    </div>
</div>

Finally, let's update the main HTML file to include the new JavaScript files and templates.

**File path: /Users/rajdeepsingh/Downloads/aegis_ai-main/index.html**

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aegis - Advanced Misinformation Detection</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
    <script type="module" src="js/api.js"></script>
    <script type="module" src="js/ui.js"></script>
</head>
<body class="bg-gray-900 min-h-screen text-gray-100">
    <!-- Header -->
    <header class="gradient-bg text-white shadow-2xl border-b border-gray-700 sticky top-0 z-40">
        <div class="container mx-auto px-6 py-4">
            <!-- Header content -->
        </div>
    </header>

    <!-- Load templates -->
    <div id="app">
        <!-- Home Page -->
        <div id="homePage" class="page active">
            <!-- Home template will be injected here -->
        </div>
        <!-- Verification Page -->
        <div id="verifyPage" class="page">
            <!-- Verification template will be injected here -->
        </div>
    </div>

    <script>
        // Load templates dynamically
        async function loadTemplates() {
            const homeTemplate = await fetch('templates/home.html').then(res => res.text());
            const verifyTemplate = await fetch('templates/verify.html').then(res => res.text());
            document.getElementById('homePage').innerHTML = homeTemplate;
            document.getElementById('verifyPage').innerHTML = verifyTemplate;
        }

        loadTemplates();
    </script>
</body>
</html>

This restructuring allows for easier maintenance and scalability of your application. You can now connect to a real backend API, manage your UI logic separately, and enhance your application progressively.
