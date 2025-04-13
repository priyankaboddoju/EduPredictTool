// sections/dashboard.js

// Re-render dashboard only when needed
// Handles academic, status, origin, and pie chart for categorical forecast charts
window.renderDashboardCharts = function () {
    if (document.getElementById("dashboard")) {
        document.getElementById("dashboard").innerHTML = `
        <div class="text-center mb-10">
          <h2 class="text-3xl font-extrabold text-indigo-700">📊 Forecast Dashboard</h2>
          <p class="text-gray-600 mt-2">Visualizations from your uploaded data</p>
        </div>
        <div id="dashboard-preview" class="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-auto"></div>
      `;
    }

    const dashboardDiv = document.getElementById("dashboard-preview");
    dashboardDiv.innerHTML = "";

    if (!window.uploadedFiles || uploadedFiles.length === 0) {
        dashboardDiv.innerHTML = `<p class="text-center text-gray-500">No data available. Please upload forecast files.</p>`;
        return;
    }

    uploadedFiles.forEach((file, fileIndex) => {
        const fileName = file.name.toLowerCase();
        const yearCol = file.headers.findIndex(h => h.toLowerCase().includes("year"));
        if (yearCol === -1) return;

        const forecastCols = file.headers.map((h, i) => ({ name: h, index: i })).filter(h => {
            const name = h.name.toLowerCase();
            return name.includes("forecast") || (name.includes("students") && name.includes("cast"));
        });

        forecastCols.forEach((col, j) => {
            const validRows = file.dataRows.filter(row => row[yearCol] && !isNaN(parseFloat(row[col.index])));

            const regionCol = file.headers.findIndex(h => h.toLowerCase().includes("origin") || h.toLowerCase().includes("country"));
            const showMap = regionCol !== -1 && col.name.toLowerCase().includes("origin") && col.name.toLowerCase().includes("forecast");

            const isPie = file.headers.some(h => h.toLowerCase().includes("field_of_study")) && col.name.toLowerCase().includes("forecast");

            const chartId = `dashboard-chart-${fileIndex}-${j}`;
            const chartContainer = document.createElement("div");
            chartContainer.className = "bg-white p-4 rounded shadow flex flex-col w-full";
            chartContainer.innerHTML = `
          <h3 class="text-lg font-semibold text-gray-800 mb-2">📉 ${col.name.replace(/_/g, ' ')}</h3>
          <div id="${chartId}" class="w-full" style="height: 350px;"></div>
        `;
            dashboardDiv.appendChild(chartContainer);

            if (showMap) {
                const mapData = {};
                validRows.forEach(row => {
                    const region = row[regionCol];
                    const value = parseFloat(row[col.index]);
                    if (region && !isNaN(value)) {
                        mapData[region] = (mapData[region] || 0) + value;
                    }
                });

                const locations = Object.keys(mapData);
                const values = Object.values(mapData);

                Plotly.newPlot(chartId, [{
                    type: "choropleth",
                    locationmode: "country names",
                    locations,
                    z: values,
                    colorscale: "Blues",
                    colorbar: {
                        title: "Forecasted Students"
                    }
                }], {
                    geo: {
                        projection: { type: "natural earth" },
                        showframe: false,
                        showcoastlines: true,
                        coastlinecolor: "#ccc"
                    },
                    margin: { t: 40, b: 20, l: 20, r: 20 },
                    title: `Forecast by Region: ${col.name.replace(/_/g, ' ')}`
                }, { responsive: true });

            } else if (isPie) {
                const categoryCol = file.headers.findIndex(h => h.toLowerCase().includes("field_of_study"));
                const pieData = {};
                validRows.forEach(row => {
                    const label = row[categoryCol];
                    const value = parseFloat(row[col.index]);
                    if (label && !isNaN(value)) {
                        pieData[label] = (pieData[label] || 0) + value;
                    }
                });

                const labels = Object.keys(pieData);
                const values = Object.values(pieData);

                Plotly.newPlot(chartId, [{
                    type: "pie",
                    labels,
                    values,
                    textinfo: "label+percent",
                    hoverinfo: "label+value"
                }], {
                    title: `Forecast Breakdown: ${col.name.replace(/_/g, ' ')}`
                }, { responsive: true });

            } else {
                let x = validRows.map(row => {
                    const raw = row[yearCol];
                    if (raw && /\d{2}-\d{2}-\d{2,4}/.test(raw)) {
                        return new Date(raw).getFullYear();
                    }
                    return raw && raw.length > 4 ? new Date(raw).getFullYear() : raw;
                });

                const y = validRows.map(row => parseFloat(row[col.index]));

                Plotly.newPlot(chartId, [{
                    x,
                    y,
                    type: "scatter",
                    mode: "lines+markers",
                    name: col.name,
                    marker: { color: '#4f46e5' }
                }], {
                    title: col.name.replace(/_/g, ' '),
                    margin: { t: 40, b: 40, l: 40, r: 20 },
                }, { responsive: true });
            }
        });
    });
};
