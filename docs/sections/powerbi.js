// sections/powerbi.js

document.getElementById("powerbi").innerHTML = `
  <div class="text-center mb-10">
    <h2 class="text-3xl font-extrabold text-indigo-700">📊 Power BI Embedded Dashboard</h2>
    <p class="text-gray-600 mt-2">Interact with our fully published SARIMAX-based visual forecast</p>
  </div>

  <div class="relative w-full max-w-6xl mx-auto rounded overflow-hidden shadow-lg aspect-video">
    <iframe
      title="TEAM_2_PROJECT_7_DASHBOARD"
      width="100%"
      height="100%"
      src="https://app.powerbi.com/reportEmbed?reportId=4378cf6f-ec79-4d5d-b52c-6c0bc4f1a427&autoAuth=true&ctid=3c71cbab-b5ed-4f3b-ac0d-95509d6c0e93"
      frameborder="0"
      allowfullscreen="true"
      class="w-full h-[80vh] rounded"
    ></iframe>
  </div>
`;