// Function to update selected language
function updateSelectedLanguage(lang) {
    console.log("Selected language:", lang);
    localStorage.setItem("selectedLanguage", lang); // Save selected language to localStorage
}

// Event listener for save text toggle
document.addEventListener('DOMContentLoaded', function() {
    const saveTextToggle = document.getElementById('saveTextToggle');
    const saveTextEnabled = JSON.parse(localStorage.getItem('saveTextEnabled')) || false;
    saveTextToggle.checked = saveTextEnabled; // Set toggle state based on saved value

    saveTextToggle.addEventListener('change', function() {
        const isChecked = saveTextToggle.checked;
        console.log("Save text toggle:", isChecked);
        localStorage.setItem('saveTextEnabled', JSON.stringify(isChecked)); // Save toggle state to localStorage
    });
});
