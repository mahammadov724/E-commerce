let allProducts = [];

function showProducts(products = allProducts) {
    let cardsDiv = document.querySelector('.cards');
    cardsDiv.innerHTML = "";

    products.forEach(product => {
        let card = document.createElement('div');
        card.classList.add('product-card');

        let img = document.createElement('img');
        img.src = product.image;
        img.alt = product.brand;

        let brand = document.createElement('h4');
        brand.textContent = product.brand;

        let price = document.createElement('p');
        price.classList.add('price');
        price.textContent = product.price + " AZN";

        let rating = document.createElement('div');
        rating.classList.add('rating');
        let stars = "⭐".repeat(product.rate || 4);
        rating.textContent = stars + " (" + (product.reviewCount || 0) + ")";

        let button = document.createElement('button');
        button.classList.add('add-to-cart');
        button.textContent = "Add to Cart";

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product.id);
        });

        card.addEventListener('click', () => {
            window.location.href = `productDetail.html?id=${product.id}`;
        });

        card.appendChild(img);
        card.appendChild(brand);
        card.appendChild(price);
        card.appendChild(rating);
        card.appendChild(button);

        cardsDiv.appendChild(card);
    });
}

function fetchProducts() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8086/products/all', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                allProducts = data.products;
                showProducts(allProducts);
            }
        })
        .catch(err => console.error("Xəta:", err));
}

fetchProducts();

function addToCart(productId) {
    const token = localStorage.getItem('token');

    const cartData = { productId: productId };

    fetch('http://localhost:8086/cart/add', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartData)
    })
    .then(async response => {
        const result = await response.text();

        if (response.ok) {
            alert("Məhsul səbətə əlavə olundu!");
            // 🔹 Məhsul əlavə olunduqdan sonra cart səhifəsinə keç
            window.location.href = 'cart.html';
        } else {
            alert("Xəta: " + result);
        }
    })
    .catch(err => console.error("Cart-a əlavə olunarkən xəta:", err));
}
