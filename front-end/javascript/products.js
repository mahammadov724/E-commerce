function addProduct() {
    const token = localStorage.getItem('token');
    const productForm = document.querySelector('form');

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

        fetch('http://localhost:8086/products/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(async response => {
            if (response.ok) {
                alert('✅ Product added successfully!');
                productForm.reset();
                document.getElementById('imagePreview').src = "";
            } else {
                let err = await response.json();
                alert('❌ Error: ' + (err.message || 'Failed to add product'));
            }
        })
        .catch(err => {
            console.error(err);
            alert("❌ Server error!");
        });
    });

    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');

    imageInput.addEventListener('input', () => {
        const url = imageInput.value.trim();
        if (url) {
            imagePreview.src = url;
        } else {
            imagePreview.src = "";
        }
    });

    imagePreview.addEventListener('error', () => {
        if (imageInput.value.trim() !== "") {
            imagePreview.src = "https://via.placeholder.com/200x150?text=No+Image"; 
        }
    });
}

addProduct();
