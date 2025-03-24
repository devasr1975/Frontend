function updateCameraUrl() {
    var ipAddress = document.getElementById('ipaddress').value;

    var data = {
        "camera_url": ipAddress
    };

    fetch('https://smartiq-v2-0-l80w.onrender.com/up-camurl', { // Updated URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Check if the response contains "Camera URL updated successfully"
        if (data.message === "Camera URL updated successfully") {
            // Make another API call to checkcamera endpoint
            fetch('https://smartiq-v2-0-l80w.onrender.com/checkcamera') // Updated URL
                .then(response => response.json())
                .then(data => {
                    console.log('Check Camera Response:', data);
                    if (data.status === "connected") {
                        // Redirect to result.html if camera is connected
                        window.location.href = 'result.html';
                    } else {
                        // Handle other statuses if needed
                        console.log('Camera not connected');
                    }
                })
                .catch(error => {
                    console.error('Error checking camera:', error);
                    // Handle errors from checkcamera endpoint
                });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors from up-camurl endpoint
    });
}
