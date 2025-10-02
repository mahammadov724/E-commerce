const token = localStorage.getItem('token');
const productForm = document.querySelector('form');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

imageInput.addEventListener('input', () => {
    const url = imageInput.value.trim();
    imagePreview.src = url || "";
});

imagePreview.addEventListener('error', () => {
    if (imageInput.value.trim() !== "") {
        imagePreview.src = "https://via.placeholder.com/200x150?text=No+Image";
    }
});

if (productId) {
    fetch(`http://localhost:8086/products/getById/${productId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(product => {
            document.getElementById('brand').value = product.brand;
            document.getElementById('model').value = product.model;
            document.getElementById('category').value = product.category;
            document.getElementById('description').value = product.description;
            document.getElementById('price').value = product.price;
            document.getElementById('rating').value = product.rating;
            document.getElementById('image').value = product.image;
            imagePreview.src = product.image;

            document.querySelector('form h2').textContent = "Edit Product";
            document.querySelector('form button[type="submit"]').textContent = "Update";
        })
        .catch(err => console.error(err));
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        brand: document.getElementById('brand').value,
        model: document.getElementById('model').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        rating: parseFloat(document.getElementById('rating').value),
        image: document.getElementById('image').value
    };

    let url = 'http://localhost:8086/products/create';
    let method = 'POST';

    if (productId) {
        url = `http://localhost:8086/products/update/${productId}`;
        method = 'PUT';
        product.id = parseInt(productId); 
    }

    fetch(url, {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)  
    })
        .then(async res => {
            if (res.ok) {
                alert(`✅ Product ${productId ? 'updated' : 'added'} successfully!`);
                if (!productId) {
                    productForm.reset();
                    imagePreview.src = "";
                } else {
                    window.location.href = "myProducts.html";
                }
            } else {
                const err = await res.json();
                alert('❌ Error: ' + (err.message || 'Operation failed'));
            }
        })
        .catch(err => {
            console.error(err);
            alert("❌ Server error!");
        });
});

const myProductsBtn = document.querySelector('.my-products');
myProductsBtn.addEventListener('click', () => {
    window.location.href = "myProducts.html";
});
