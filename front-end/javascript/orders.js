const token = localStorage.getItem('token');

const orderId = localStorage.getItem('selectedOrderId'); 

function loadOrderItems() {
    if (!orderId) {
        console.error("❌ Order ID tapılmadı. localStorage və ya URL-də yoxdur.");
        alert("Order ID tapılmadı. Zəhmət olmasa sifariş seçin.");
        return;
    }

    console.log("🟢 Backend-ə göndərilən Order ID:", orderId);

    fetch(`http://localhost:8086/orderItem/getByOrder/${orderId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(async response => {
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Server xətası: ${errText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("✅ OrderItem-lər:", data);
        renderOrderItems(data);
    })
    .catch(error => {
        console.error("❌ Xəta baş verdi:", error);
        alert("Order item-ləri yüklənərkən xəta baş verdi!");
    });
}

function renderOrderItems(items) {
    const tableBody = document.getElementById('orderItemsTableBody');
    tableBody.innerHTML = ''; 

    if (!items || items.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">Bu sifariş üçün məhsul tapılmadı</td></tr>';
        return;
    }

    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.productName || '—'}</td>
            <td>${item.quantity || 0}</td>
            <td>${item.price ? item.price.toFixed(2) + " ₼" : "—"}</td>
            <td>${(item.price * item.quantity).toFixed(2)} ₼</td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', loadOrderItems);
