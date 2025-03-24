// Your language codes and names
const language_codes = {
    '': 'Select Language', // Adding an empty string for the default option
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'ta': 'Tamil',
    'zh-cn': 'Chinese (Simplified)',
    'hi': 'Hindi',
    'ar': 'Arabic',
    'pt': 'Portuguese',
    'bn': 'Bengali',
    'ru': 'Russian',
    'ja': 'Japanese',
    'pa': 'Punjabi'
};

// Get the select element
const select = document.getElementById('language');

// Loop through each language code and add an option to the select element
for (let code in language_codes) {
    if (language_codes.hasOwnProperty(code)) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = language_codes[code];
        select.appendChild(option);
    }
}

select.addEventListener('change', function () {
    const selectedLanguage = select.value;
    localStorage.setItem('selectedLanguage', selectedLanguage);
    updateNextButtonBehavior(); // Update behavior on language change

    // Hide the default option after selecting a language
    const defaultOption = select.querySelector('option[value=""]');
    if (defaultOption) {
        select.removeChild(defaultOption);
    }
});

// Check localStorage on page load and set selected option
const storedLanguage = localStorage.getItem('selectedLanguage');
if (storedLanguage) {
    select.value = storedLanguage;
    // Hide the default option on page load if a language is selected
    const defaultOption = select.querySelector('option[value=""]');
    if (defaultOption) {
        select.removeChild(defaultOption);
    }
}

// Function to update next button behavior based on selected language
function updateNextButtonBehavior() {
    const nextButton = document.getElementById('nextButton');
    const selectedLanguage = select.value;
    if (selectedLanguage === '') {
        nextButton.href = '#'; // Stay on the same page if default option is selected
        nextButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default behavior (navigating to href)
        });
    } else {
        nextButton.href = './index.html'; // Navigate to index.html if a language is selected
        nextButton.removeEventListener('click', function (event) {
            event.preventDefault();
        });
    }
}

// Initial call to set up button behavior on page load
updateNextButtonBehavior();
