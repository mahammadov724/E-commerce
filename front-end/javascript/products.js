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

    localStorage.setItem('productId',productId);

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

// productForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const product = {
//         brand: document.getElementById('brand').value,
//         model: document.getElementById('model').value,
//         category: document.getElementById('category').value,
//         description: document.getElementById('description').value,
//         price: parseFloat(document.getElementById('price').value),
//         rating: parseFloat(document.getElementById('rating').value),
//         image: document.getElementById('image').value
//     };

//     let url = 'http://localhost:8086/products/create';
//     let method = 'POST';

//     if (productId) {
//     url = `http://localhost:8086/products/update`; // id path-də deyil, body-də var
//     method = 'PUT';
//     product.id = parseInt(productId);
// }


//     fetch(url, {
//         method: method,
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(product)  
//     })
//         .then(async res => {
//             if (res.ok) {
//                 alert(`✅ Product ${productId ? 'updated' : 'added'} successfully!`);
//                 if (!productId) {
//                     productForm.reset();
//                     imagePreview.src = "";
//                 } else {
//                     window.location.href = "myProducts.html";
//                 }
//             } else {
//                 const err = await res.json();
//                 alert('❌ Error: ' + (err.message || 'Operation failed'));
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             alert("❌ Server error!");
//         });
// });


function createProduct() {
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

        let productId = localStorage.getItem('productId');

        if (productId) {
            updateProduct(product,productId);
        }else{
             fetch('http://localhost:8086/products/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(response => {
                if (response.ok) {
                    alert('Product create successfully');
                    productForm.reset();
                    window.location.href = 'myProducts.html';
                }
            })
        }
    })
}

createProduct();

function updateProduct(product,productId){
    const productForm = document.querySelector('form');

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch(`http://localhost:8086/products/update`,{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: productId,
                brand: product.brand,
                model: product.model,
                description: product.description,
                rating: product.rating,
                category: product.category,
                price: product.price,
                image: product.image
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Product update successfully');
                localStorage.removeItem('productId');
                window.location.href = 'myProducts.html';
            }
        })
    })
}