document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
});

function initializeApp() {
    showPage("home");
    updateUserInterface();
    startQuantumEffects();
}

function showPage(pageId) {
    document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
    });

    document.getElementById(pageId + "Page").classList.add("active");
    currentPage = pageId;

    if (pageId === "monitor") {
        populateFeed();
        initializeCharts();
        startQuantumUpdates();
    } else if (pageId === "verify") {
        populateRecentVerifications();
    } else if (pageId === "trends") {
        populateTrendingTopics();
        initializeCategoryChart();
        populateTrendTimeline();
    }
}

function updateUserInterface() {
    const userSection = document.getElementById("userSection");
    const userProfile = document.getElementById("userProfile");
    const userName = document.getElementById("userName");

    if (currentUser) {
        userSection.classList.add("hidden");
        userProfile.classList.remove("hidden");
        userName.textContent = currentUser.name;
    } else {
        userSection.classList.remove("hidden");
        userProfile.classList.add("hidden");
    }
}