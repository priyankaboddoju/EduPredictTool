// utils.js

function formatNumber(num) {
    return isNaN(num) ? "—" : Number(num).toLocaleString();
}

function formatDate(input) {
    const date = new Date(input);
    return isNaN(date.getTime()) ? input : date.toLocaleDateString();
}

function showToast(message, type = "success") {
    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500"
    };

    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = `fixed bottom-6 right-6 text-white px-4 py-2 rounded shadow-lg z-50 ${colors[type] || colors.success}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}