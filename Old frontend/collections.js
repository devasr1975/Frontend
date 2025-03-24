function playAudio(audioSrc) {
    const audioElement = document.createElement('audio');
    audioElement.src = audioSrc;
    audioElement.style.display = 'none';
    document.body.appendChild(audioElement);
    audioElement.play();
    audioElement.onended = () => document.body.removeChild(audioElement); // Remove the audio element after playback
}

function deleteResponse(index) {
    const apiResponses = JSON.parse(localStorage.getItem('apiResponses')) || [];
    apiResponses.splice(index, 1); // Remove the item at 'index'
    localStorage.setItem('apiResponses', JSON.stringify(apiResponses)); // Update localStorage
    displayResponses(); // Refresh the displayed responses
}

function displayResponses() {
    const responsesContainer = document.getElementById('responsesContainer');
    responsesContainer.innerHTML = ''; // Clear previous content

    const apiResponses = JSON.parse(localStorage.getItem('apiResponses')) || [];

    if (apiResponses.length === 0) {
        responsesContainer.innerHTML = '<p>No items in local storage.</p>';
    } else {
        apiResponses.forEach((response, index) => {
            const boxDiv = document.createElement('div');
            boxDiv.className = 'box mt-3';

            const dFlexDiv = document.createElement('div');
            dFlexDiv.className = 'd-flex align-items-center';

            const h3Element = document.createElement('h3');
            h3Element.textContent = response.text || ''; // Display source text

            const imgElement = document.createElement('img');
            imgElement.src = './assets/images/headphone.svg';
            imgElement.alt = 'Play Audio';
            imgElement.height = 40;
            imgElement.width = 25;
            imgElement.className = 'ml-auto';
            imgElement.onclick = () => playAudio(`data:audio/wav;base64,${response.target_audio}`); // Play target audio on click

            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fas fa-trash-alt ml-2';
            deleteIcon.style.cursor = 'pointer';
            deleteIcon.onclick = () => deleteResponse(index); // Delete the response on click

            dFlexDiv.appendChild(h3Element);
            dFlexDiv.appendChild(imgElement);
            dFlexDiv.appendChild(deleteIcon);

            const h5Element = document.createElement('h5');
            h5Element.textContent = 'Translated Text';

            const h4Element = document.createElement('h4');
            h4Element.textContent = response.translated_text || ''; // Display translated text

            boxDiv.appendChild(dFlexDiv);
            boxDiv.appendChild(h5Element);
            boxDiv.appendChild(h4Element);

            responsesContainer.appendChild(boxDiv);
        });
    }
}

// Call the function to display responses
displayResponses();
