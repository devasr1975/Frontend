// Language codes and their respective names
const language_codes = {
    "": "Select Language", // Adding an empty string for the default option
    es: "Spanish",
    fr: "French",
    de: "German",
    ta: "Tamil",
    "zh-cn": "Chinese (Simplified)",
    hi: "Hindi",
    ar: "Arabic",
    pt: "Portuguese",
    bn: "Bengali",
    ru: "Russian",
    ja: "Japanese",
    pa: "Punjabi",
};

let processing = false; // Flag to track processing state

document.addEventListener("DOMContentLoaded", function () {

    const saveTextEnabled = JSON.parse(localStorage.getItem("saveTextEnabled")) || false;  
    if (saveTextEnabled) {
        console.log("Save text functionality is enabled");
        
    } else {
        console.log("Save text functionality is disabled");
        
    }
});

// URL of your Flask application on Render
const apiUrlExtract = "https://smartiq-v2-0-l80w.onrender.com/extract"; // Updated public URL

// Function to toggle processing state and update button image
function toggleProcessing() {
    const playButton = document.querySelector(".ml-auto img");
    if (!processing) {
        // Start processing
        playButton.src = "assets/images/icons8-stop-64.png";
        extractText();
        processing = true;
    } else {
        // Stop processing
        playButton.src = "assets/images/play.png";
        processing = false;
        // Optionally, you can abort ongoing API requests here if needed
    }
}

// Function to make API call to /extract endpoint
function extractText() {
    fetch(apiUrlExtract, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Extract API response:", data);

            if (data.corrected_words && data.corrected_words.length > 0) {
                const word = data.corrected_words[0].word;
                console.log("Corrected Word:", word);

                // Call makeAPICall with the extracted word
                makeAPICall(word);
            } else if (data.message) {
                console.log("Message:", data.message);
            } else {
                console.log("Unhandled response:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            // Reset button image if there's an error
            const playButton = document.querySelector(".ml-auto img");
            playButton.src = "assets/images/play.png";
            processing = false;
        });
}

// Function to make API call to translate text
function makeAPICall(textInput = null) {
    // Get input text value if not provided
    textInput = textInput || document.getElementById("textInput").value.trim();

    // Retrieve target language from localStorage
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    if (!selectedLanguage) {
        alert("Please select a target language!");
        return;
    }

    // API endpoint URL for translation
    const apiUrl = "https://smartiq-v2-0-l80w.onrender.com/"; // Updated public URL

    // Prepare data for POST request
    const data = {
        Text: textInput,
        SourceLanguage: "en", // Hardcoded source language as 'en' (English)
        TargetLanguage: selectedLanguage,
    };

    // Make API call using fetch
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((responseData) => {
            console.log("API Response:", responseData);

            // Check if saveTextEnabled is true
            const saveTextEnabled = JSON.parse(localStorage.getItem("saveTextEnabled")) || false;
            if (saveTextEnabled) {
                // Store the response data in local storage
                storeResponseInLocalStorage(responseData);
            }

            // Display the translated text and handle audio playback
            displayTranslatedText(responseData);
            
            // Reset button image after processing completes
            const playButton = document.querySelector(".ml-auto img");
            playButton.src = "assets/images/play.png";
            processing = false;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            // Reset button image if there's an error
            const playButton = document.querySelector(".ml-auto img");
            playButton.src = "assets/images/play.png";
            processing = false;
        });
}

// Function to store response in local storage
function storeResponseInLocalStorage(responseData) {
    // Retrieve existing responses from local storage
    const storedResponses = JSON.parse(localStorage.getItem("apiResponses")) || [];

    // Add the new response to the array
    storedResponses.push(responseData);

    // Save the updated array back to local storage
    localStorage.setItem("apiResponses", JSON.stringify(storedResponses));
}

// Function to display translated text and handle audio playback
function displayTranslatedText(responseData) {
    // Display source text in h3 element
    const sourceTextElement = document.getElementById("sourceText");
    if (sourceTextElement) {
        sourceTextElement.textContent = responseData.text || ""; // Ensure text is displayed or empty string
    }

    // Display translated text in h4 element
    const translatedTextElement = document.getElementById("translatedText");
    if (translatedTextElement) {
        translatedTextElement.textContent = responseData.translated_text || ""; // Ensure text is displayed or empty string
    }

    // Play target audio if available (assuming Base64 encoded audio data)
    const targetAudioElement = document.getElementById("targetAudio");
    if (targetAudioElement && responseData.target_audio) {
        const targetAudioBinary = base64ToArrayBuffer(responseData.target_audio);
        const blob = new Blob([targetAudioBinary], { type: "audio/wav" });

        // Update audio element source and play
        const url = URL.createObjectURL(blob);
        targetAudioElement.src = url;
        targetAudioElement.style.display = "block"; // Ensure audio element is visible
        targetAudioElement.play();

        // Show the div with translated text and audio controls
        const translatedDiv = document.querySelector(".box.mt-3");
        translatedDiv.style.display = "block";
    } else {
        // Hide the div if there's no target audio
        const translatedDiv = document.querySelector(".box.mt-3");
        translatedDiv.style.display = "none";
    }
}

// Function to convert base64 string to ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Function to play target audio
function playAudio() {
    const targetAudio = document.getElementById("targetAudio");
    if (targetAudio) {
        targetAudio.play();
    }
}
