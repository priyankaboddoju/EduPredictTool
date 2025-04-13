// sections/tabs.js

document.getElementById("navigation-tabs").innerHTML = `
  <nav class="flex justify-center space-x-4 bg-white shadow py-4 sticky top-0 z-20">
    <button class="tab-button text-blue-600 font-semibold" onclick="showTab('home')">Home</button>
    <button class="tab-button" onclick="showTab('dashboard')">📊 Forecast Dashboard</button>
    <button class="tab-button" onclick="showTab('upload')">Upload & Explore</button>
    <button class="tab-button" onclick="showTab('powerbi')">Power BI View</button>
  </nav>
`;

window.showTab = function (tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');

    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('text-blue-600', 'font-semibold'));

    const tabMap = {
        home: 0,
        dashboard: 1,
        upload: 2,
        powerbi: 3
    };
    const buttons = document.querySelectorAll('.tab-button');
    const index = tabMap[tabId];
    if (buttons[index]) buttons[index].classList.add('text-blue-600', 'font-semibold');
};
