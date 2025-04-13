// sections/header.js

document.getElementById("main-header").innerHTML = `
  <div class="relative bg-gradient-to-r from-indigo-100 via-white to-cyan-100 py-12 text-center shadow-md z-10">
    <div class="flex flex-col items-center space-y-3">
      <h1 class="text-5xl font-extrabold text-indigo-700 tracking-tight">EduPredict</h1>
      <p class="text-lg text-gray-600 italic">Forecasting the Future of International Education</p>
      <p class="text-sm bg-white/60 px-4 py-1 rounded-full text-indigo-600 font-medium shadow-sm">
        🎓 Powered by Machine Learning & SARIMAX Forecasting
      </p>
      <a href="#dashboard" onclick="showTab('dashboard')"
        class="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded shadow transition-all duration-200">
        🔍 Explore Forecasts
      </a>
    </div>
  </div>
`;