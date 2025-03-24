// Function to redirect to home.html after a delay
function redirectToHome() {
    setTimeout(function() {
        window.location.href = 'home.html';
    }, 2000); // Delay of 2000 milliseconds (2 seconds)
}

// Call the redirect function when the page loads
redirectToHome();
