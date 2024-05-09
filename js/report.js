document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submitReportButton');
    if (submitButton) {
        submitButton.addEventListener('click', function () {
            submitReport();
        });
    } else {
        console.error('Submit button not found');
    }
});

function submitReport() {
    // Gather form data
    const formData = {
        userName: document.getElementById('userName').value,
        title: document.getElementById('title').value,
        scamType: document.getElementById('scamType').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        platform: document.getElementById('platform').value
    };

    // Validate data before submitting (basic example)
    if (!validateFormData(formData)) {
        alert('Please fill all the fields correctly.');
        return;
    }

    // Post the form data
    fetch('/submit-report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to submit report');
        }
        return response.json();
    })
    .then(data => {
        alert('Report Successfully Submitted'); // Inform the user
        document.getElementById('scamReportForm').reset(); // Clear the form after submission
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting report: ' + error.message); // Show error to user
    });
}

// A simple validation function for formData
function validateFormData(formData) {
    return Object.values(formData).every(value => value !== '');
}
