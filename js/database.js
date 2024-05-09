document.addEventListener('DOMContentLoaded', function () {
    fetchReports();
});

function fetchReports() {
    fetch('/reports')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('reportsContainer');
            tbody.innerHTML = ''; // Clear existing entries
            data.data.forEach(report => {
                const row = tbody.insertRow();
                row.insertCell(0).textContent = report.userName;
                row.insertCell(1).textContent = report.date;
                row.insertCell(2).textContent = report.title;
                row.insertCell(3).textContent = report.scamType;
                row.insertCell(4).textContent = report.description;
                row.insertCell(5).textContent = report.platform;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching reports: ' + error.message);
        });
}
