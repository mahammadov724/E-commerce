function loadOnTable() {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8086/cart/getCart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            if (!response.ok) throw new Error("Cart məlumatı alınmadı");
            let data = await response.json();
            console.log("Cart Data:", data);

            let items = data.cartItems || data;

            let tableContent = '';
            let subtotal = 0;

            items.forEach(cart => {
                subtotal += cart.subTotal;

                tableContent += `
                <tr data-id="${cart.product.id}">
                    <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="${cart.product.image}" style="width:80px; height:70px; object-fit:cover; border-radius:8px;"/>
                            ${cart.product.brand}
                        </div>
                    </td>
                    <td style="text-align:center;">${cart.product.price} AZN</td>
                    <td style="text-align:center;">
                        <input type="number" min="1" value="${cart.quantity}" class="quantity-input" data-cart-id="${cart.id}" style="width: 50px;">
                    </td>
                    <td class="subtotal" style="text-align:center;">${cart.subTotal} AZN</td>
                    <td style="text-align:center;">
                        <button data-id="${cart.id}" class="remove-btn" style="background:red;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">
                            ✖
                        </button>
                    </td>
                </tr>
            `;
            });

            document.getElementById('cart-body').innerHTML = tableContent;
            updateTotals(subtotal);
            attachEventListeners();

            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    let newQuantity = e.target.value;
                    let cartId = e.target.getAttribute('data-cart-id');

                    const cart = {
                        id: cartId,
                        quantity: newQuantity
                    }

                    fetch(`http://localhost:8086/cart/update`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(cart)
                    })
                        .then(msj => {
                            loadOnTable();
                        })
                })
            })
        })
        .catch(err => console.error("Cart yüklənərkən xəta:", err));
}

function updateTotals(subtotal) {
    document.getElementById('subtotal').textContent = `${subtotal} AZN`;
    document.getElementById('total').textContent = `${subtotal} AZN`;
}

function attachEventListeners() {
    const removeBtns = document.querySelectorAll('.remove-btn');
    const qtyInputs = document.querySelectorAll('.qty-input');

    removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.closest('tr').getAttribute('data-id');
            removeFromCart(productId);
        });
    });

    qtyInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const tr = e.target.closest('tr');
            const productId = tr.getAttribute('data-id');
            const newQty = parseInt(e.target.value);
            if (newQty < 1) {
                e.target.value = 1;
                return;
            }
            updateQuantity(productId, newQty);
        });
    });
}

function deleteFromCart() {

    const token = localStorage.getItem('token');

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            let cartId = e.target.getAttribute('data-id');

            if (confirm("Are you sure?")) {

                fetch(`http://localhost:8086/cart/delete/${cartId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(resp => {
                        e.target.closest("tr").remove();
                        loadOnTable();
                    })
            }
        }
    })
}

deleteFromCart();

function updateQuantity(productId, qty) {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8086/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: qty })
    })
        .then(async res => {
            if (res.ok) {
                loadOnTable();
            } else {
                const text = await res.text();
                alert("Yeniləmə xətası: " + text);
            }
        })
        .catch(err => console.error("Update error:", err));
}

loadOnTable();
