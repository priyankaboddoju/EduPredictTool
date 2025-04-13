// sections/home.js

document.getElementById("home").innerHTML = `
  <div class="text-center mb-6">
    <h2 class="text-3xl font-extrabold text-indigo-800 bg-gradient-to-r from-indigo-50 to-cyan-50 py-2 rounded shadow-sm inline-block px-4">
      📊 Real-Time Forecast Summary
    </h2>
    <p class="mt-4 text-gray-600 max-w-2xl mx-auto text-base">
      This platform visualizes international student forecasts using machine learning models. Upload your
      CSV to get dynamic insights or explore interactive charts from our default dataset.
    </p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
    <div class="bg-blue-50 p-6 rounded-lg shadow">
      <div class="text-3xl mb-2">📅</div>
      <p class="text-sm text-gray-500">Latest Upload</p>
      <h3 id="latest-date" class="text-2xl font-bold text-blue-700">—</h3>
    </div>
    <div class="bg-green-50 p-6 rounded-lg shadow">
      <div class="text-3xl mb-2">🎓</div>
      <p class="text-sm text-gray-500">Total Forecasted Students</p>
      <h3 id="total-students" class="text-2xl font-bold text-green-700">—</h3>
    </div>
    <div class="bg-yellow-50 p-6 rounded-lg shadow">
      <div class="text-3xl mb-2">🌍</div>
      <p class="text-sm text-gray-500">Top Country</p>
      <h3 id="top-country" class="text-2xl font-bold text-yellow-700">—</h3>
    </div>
  </div>

  <div class="bg-gray-50 mt-10 p-4 rounded-lg shadow">
    <h4 class="text-lg font-semibold text-gray-700 mb-2">📈 Forecast Preview</h4>
    <div id="home-mini-chart" class="w-full h-40"></div>
  </div>

  <div class="text-center mt-10">
    <p class="text-base text-gray-600 mb-4">Ready to explore deeper insights?</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#upload" onclick="showTab('upload')"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded shadow">⬆ Upload CSV</a>
      <a href="#dashboard" onclick="showTab('dashboard')"
        class="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded shadow">📊 View Dashboard</a>
    </div>
  </div>
`;
