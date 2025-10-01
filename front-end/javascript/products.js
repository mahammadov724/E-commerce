function addProduct(){
    const token = localStorage.getItem('token');

    const productForm = document.querySelector('form');

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const product = {
            name: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            image: document.getElementById('product-image').value
        }

        fetch('http://localhost:8086/products/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => {
            if (response.ok) {
                alert('Product added successfully');
                document.getElementById('product-name').value = '';
                document.getElementById('product-price').value = '';
                document.getElementById('product-image').value = '';
            }
        })
    })
}

addProduct();