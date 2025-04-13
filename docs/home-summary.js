// home-summary.js

function updateHomeSummary(dataRows, headers) {
    let forecastCol = headers.findIndex(h => h.toLowerCase().includes("students_forecast"));
    if (forecastCol === -1) forecastCol = headers.findIndex(h => h.toLowerCase().includes("forecast"));

    const yearCol = headers.findIndex(h => h.toLowerCase().includes("year"));
    const countryCol = headers.findIndex(h => h.toLowerCase().includes("origin") || h.toLowerCase().includes("country") || h.toLowerCase().includes("region") || h.toLowerCase().includes("source_of_fund"));

    // === Latest Upload ===
    if (yearCol >= 0) {
        const years = dataRows.map(row => row[yearCol]).filter(Boolean);
        const sorted = [...years].sort((a, b) => new Date(b) - new Date(a));
        const latest = sorted[0] || "—";
        document.getElementById("latest-date").textContent = latest;
    }

    // === Total Forecasted Students ===
    if (forecastCol >= 0) {
        const total = dataRows.reduce((sum, row) => {
            const val = parseFloat(row[forecastCol]);
            return sum + (isNaN(val) ? 0 : val);
        }, 0);
        document.getElementById("total-students").textContent = Math.round(total).toLocaleString() || "—";
    }

    // === Top Country / Region / Source ===
    if (countryCol >= 0) {
        const freqMap = {};
        dataRows.forEach(row => {
            const key = row[countryCol];
            if (key) freqMap[key] = (freqMap[key] || 0) + 1;
        });
        const top = Object.entries(freqMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
        document.getElementById("top-country").textContent = top;
    }
}