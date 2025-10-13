document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');

    fetch(`http://localhost:8086/orders/my-orders?email=${userEmail}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        const tbody = document.getElementById('orderItemsTableBody');
        let html = '';
        let total = 0;

        data.forEach(order => {
            order.items.forEach(item => {
                total += item.subTotal;
                html += `
                    <tr>
                        <td>
                            <div style="display:flex; align-items:center; gap:10px;">
                                <img src="${item.product.image}" style="width:80px; height:70px; object-fit:cover; border-radius:8px;"/>
                                ${item.product.brand}
                            </div>
                        </td>
                        <td style="text-align:center;">${item.product.price} AZN</td>
                        <td style="text-align:center;">${item.quantity}</td>
                        <td style="text-align:center;">${item.subTotal} AZN</td>
                        <td></td>
                    </tr>
                `;
            });
        });

        tbody.innerHTML = html;
        document.getElementById('subtotal').textContent = `${total} AZN`;
        document.getElementById('total').textContent = `${total} AZN`;
    })
    .catch(err => console.error("Sifarişlər yüklənərkən xəta:", err));
});
