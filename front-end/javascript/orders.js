document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = './login.html';
        return;
    }

    fetch('http://localhost:8086/users/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Profil məlumatı alınmadı");
        }
        return res.json();
    })
    .then(userData => {
        const userId = userData.id;
        return fetch(`http://localhost:8086/orders/${userId}`);
    })
    .then(res => res.json())
    .then(orders => {
        const tbody = document.getElementById('orderItemsTableBody');
        tbody.innerHTML = '';

        let total = 0;

        orders.forEach(order => {
            const row = document.createElement('tr');

            const productCell = document.createElement('td');
            productCell.innerHTML = `
                <img src="${order.image}" alt="${order.model}" style="width: 50px; height: 50px; object-fit: cover;">
                <div>${order.brand} ${order.model}</div>
            `;

            const priceCell = document.createElement('td');
            priceCell.textContent = `${(order.subTotal / order.quantity).toFixed(2)}$`;

            const quantityCell = document.createElement('td');
            quantityCell.textContent = order.quantity;

            const subTotalCell = document.createElement('td');
            subTotalCell.textContent = `${order.subTotal.toFixed(2)}$`;

            const addressCell = document.createElement('td');
            addressCell.innerHTML = `
                ${order.firstName} ${order.lastName} <br>
                ${order.address}, ${order.city}, ${order.state} <br>
                ${order.email} | ${order.tel}
            `;

            total += order.subTotal;

            row.appendChild(productCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);
            row.appendChild(subTotalCell);
            row.appendChild(addressCell);

            tbody.appendChild(row);
        });

        document.getElementById('subtotal').textContent = `${total.toFixed(2)}$`;
        document.getElementById('total').textContent = `${total.toFixed(2)}$`;

    })
    .catch(error => {
        console.error('Sifarişlər yüklənərkən xəta baş verdi:', error);
        document.getElementById('orderItemsTableBody').innerHTML = `<tr><td colspan="5">Sifarişlər tapılmadı.</td></tr>`;
    });
});
