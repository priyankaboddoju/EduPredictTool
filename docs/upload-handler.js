// upload-handler.js

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        const rows = text.trim().split('\n').map(row => row.split(','));
        const headers = rows[0];
        const dataRows = rows.slice(1);

        // Optional: draw chart preview if forecast & year available
        const forecastCol = headers.findIndex(h => h.toLowerCase().includes("forecast"));
        const yearCol = headers.findIndex(h => h.toLowerCase().includes("year"));
        if (yearCol >= 0 && forecastCol >= 0) {
            const x = dataRows.map(row => row[yearCol]);
            const y = dataRows.map(row => parseFloat(row[forecastCol]));
            Plotly.newPlot("home-mini-chart", [{
                x, y,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: 'purple' }
            }], { margin: { t: 10 } });
        }

        // 🔁 This connects to home-summary.js
        updateHomeSummary(dataRows, headers);

        // ✅ Upload success toast
        showUploadToast();
    };

    reader.readAsText(file);
}

function showUploadToast() {
    const toast = document.createElement("div");
    toast.textContent = "✅ Upload successful";
    toast.className = "fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce z-50";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
