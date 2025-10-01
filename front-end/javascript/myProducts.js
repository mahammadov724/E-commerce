function loadOnProducts() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8086/products/getAll', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => {
        if (response.ok) {
            let data = await response.json();
            console.log(data);

            let products_tbody = document.getElementById("products-tbody");

            let tableContent = '';
            data.products.forEach(element => {
                tableContent += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.brand}</td>
                    <td>${element.category}</td>
                    <td>${element.price} AZN</td>
                    <td>
                        <img src="${element.image}" style="width:100px; height:80px; object-fit:cover;" />
                    </td>
                    <td>
                        <button onclick="deleteProduct(${element.id})" style="padding:5px 10px; background:red; color:white; border:none; border-radius:5px; cursor:pointer;">
                            Delete
                        </button>
                    </td>
                </tr>
                `;
            });
            
            products_tbody.innerHTML = tableContent;
        }
    })
}

loadOnProducts();

