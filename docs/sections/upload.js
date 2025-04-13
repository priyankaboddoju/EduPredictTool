let uploadedFiles = []; // { name, headers, dataRows, uploadedAt }

// Initialize upload UI
document.getElementById("upload").innerHTML = `
  <h2 class="text-2xl font-semibold mb-4">📥 Upload Forecast CSV Files</h2>

  <input type="file" accept=".csv" onchange="handleMultiFileUpload(event)" multiple class="mb-6" />

  <div id="file-list" class="mb-6">
    <h3 class="text-lg font-medium mb-2">📂 Uploaded Files:</h3>
    <ul id="uploaded-files" class="space-y-2"></ul>
    <button onclick="clearUploadedFiles()" class="text-sm text-red-600 hover:underline mt-2">🗑️ Clear All Files</button>
  </div>

  <button onclick="applyUploadedFiles()"
    class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded shadow mb-6">
    ✅ Use These Files for Summary
  </button>

  <div id="upload-chart" class="w-full h-96"></div>
`;

window.handleMultiFileUpload = function (event) {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        if (uploadedFiles.some(f => f.name === file.name)) {
            showToast(`⚠️ ${file.name} already uploaded`, "info");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const rows = text.trim().split('\n').map(row => row.split(','));
            const headers = rows[0];
            const dataRows = rows.slice(1);

            uploadedFiles.push({
                name: file.name,
                headers,
                dataRows,
                uploadedAt: new Date(file.lastModified).toLocaleDateString()
            });

            renderFileList();
            showToast(`✅ ${file.name} uploaded`, "success");
        };
        reader.readAsText(file);
    });
};

function renderFileList() {
    const list = document.getElementById("uploaded-files");
    list.innerHTML = "";
    uploadedFiles.forEach((file, index) => {
        const li = document.createElement("li");
        li.className = "bg-gray-100 px-4 py-2 rounded flex justify-between items-center";
        li.innerHTML = `
      <span class="text-sm text-gray-700">📄 ${file.name}</span>
      <button onclick="removeUploadedFile(${index})" class="text-red-500 hover:underline text-xs">Remove</button>
    `;
        list.appendChild(li);
    });
}

window.removeUploadedFile = function (index) {
    uploadedFiles.splice(index, 1);
    renderFileList();
};

window.clearUploadedFiles = function () {
    uploadedFiles = [];
    renderFileList();
    document.getElementById("upload-chart").innerHTML = "";
    showToast("🧹 All files cleared.", "info");
};

window.applyUploadedFiles = function () {
    if (uploadedFiles.length === 0) {
        showToast("⚠️ No files to apply.", "error");
        return;
    }

    const mergedRows = uploadedFiles.flatMap(file => file.dataRows);
    const unifiedHeaders = uploadedFiles[0].headers;

    let yearCol = unifiedHeaders.findIndex(h => h.toLowerCase().includes("year"));
    let forecastCol = unifiedHeaders.findIndex(h => h.toLowerCase().includes("forecast"));

    if (yearCol === -1 || forecastCol === -1) {
        document.getElementById('home-mini-chart').innerHTML = `<p class="text-sm text-gray-400 text-center">⚠️ No valid year or forecast columns found.</p>`;
    } else {
        const x = mergedRows.map(row => row[yearCol]);
        const y = mergedRows.map(row => parseFloat(row[forecastCol])).filter(v => !isNaN(v));

        Plotly.newPlot('home-mini-chart', [{
            x,
            y,
            type: "scatter",
            mode: "lines",
            name: "Forecast Preview",
            line: { color: 'purple' }
        }], {
            margin: { t: 10, b: 30, l: 30, r: 10 },
            xaxis: { title: '', showgrid: false },
            yaxis: { title: '', showgrid: false }
        });
    }

    const latestDate = uploadedFiles.at(-1)?.uploadedAt || "—";

    const countryCol = unifiedHeaders.findIndex(h => h.toLowerCase().includes("country"));
    const countryFreq = {};
    if (countryCol >= 0) {
        mergedRows.forEach(row => {
            const country = row[countryCol];
            if (country) countryFreq[country] = (countryFreq[country] || 0) + 1;
        });
    }

    const topCountry = Object.entries(countryFreq).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
    const forecastValues = mergedRows.map(row => parseFloat(row[forecastCol])).filter(v => !isNaN(v));
    const total = forecastValues.reduce((a, b) => a + b, 0);

    document.getElementById("latest-date").innerText = latestDate;
    document.getElementById("total-students").innerText = Math.round(total).toLocaleString();
    document.getElementById("top-country").innerText = topCountry;

    showTab("home");
    showToast("✅ Forecast updated and previewed.");

    if (document.getElementById("dashboard")) {
        document.getElementById("dashboard").innerHTML = `
      <div class="text-center mb-10">
        <h2 class="text-3xl font-extrabold text-indigo-700">📊 Forecast Dashboard</h2>
        <p class="text-gray-600 mt-2">Visualizations from your uploaded data</p>
      </div>
      <div id="dashboard-preview" class="grid grid-cols-1 sm:grid-cols-2 gap-6"></div>
    `;
    }

    const dashboardDiv = document.getElementById("dashboard-preview");
    dashboardDiv.innerHTML = "";

    uploadedFiles.forEach((file, i) => {
        const yearCol = file.headers.findIndex(h => h.toLowerCase().includes("year"));
        const forecastCol = file.headers.findIndex(h => h.toLowerCase().includes("forecast"));
        if (yearCol === -1 || forecastCol === -1) return;

        const validRows = file.dataRows.filter(row => {
            const year = row[yearCol];
            const val = parseFloat(row[forecastCol]);
            return year && !isNaN(val);
        });

        if (validRows.length === 0) return;

        const x = validRows.map(row => row[yearCol]);
        const y = validRows.map(row => parseFloat(row[forecastCol]));

        const chartId = `dashboard-chart-${i}`;
        const title = file.name.replace(/_/g, ' ').replace(/\.csv$/i, '');

        const chartContainer = document.createElement("div");
        chartContainer.className = "bg-white p-4 rounded shadow flex flex-col min-h-[420px]";
        chartContainer.innerHTML = `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">📈 ${title}</h3>
      <div id="${chartId}" class="w-full grow"></div>
    `;
        dashboardDiv.appendChild(chartContainer);

        Plotly.newPlot(chartId, [{
            x,
            y,
            type: "scatter",
            mode: "lines+markers",
            name: title
        }], {
            title: `Forecast: ${title}`,
            margin: { t: 40, b: 40, l: 40, r: 20 }
        }, { responsive: true });
    });
};
