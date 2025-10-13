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

        let ratingValue = Math.round(product.rating || 0);
        let stars = '⭐'.repeat(ratingValue);
        rating.textContent = `${stars} (${product.rating?.toFixed(1) || "0.0"})`;


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
                window.location.href = 'cart.html';
            } else {
                alert("Xəta: " + result);
            }
        })
        .catch(err => console.error("Cart-a əlavə olunarkən xəta:", err));
}

document.querySelectorAll('.stars-filter button').forEach(button => {
    button.addEventListener('click', () => {
        const selectedStars = parseInt(button.getAttribute('data-stars'));

        const filtered = allProducts.filter(p =>
            Math.floor(p.rating || 0) >= selectedStars
        );

        showProducts(filtered);
    });
});



document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.textContent.trim().toLowerCase();
        const filtered = allProducts.filter(p => p.category?.toLowerCase() === category);
        showProducts(filtered);
    });
});

document.querySelector('.filters .btn').addEventListener('click', () => {
    showProducts(allProducts);
});

document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    const filtered = allProducts.filter(p =>
        p.brand?.toLowerCase().includes(query) ||
        p.model?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
    );

    showProducts(filtered);
});

fetchProducts();

const sortSelect = document.getElementById('sort');
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        const value = sortSelect.value;

        let sorted = [...allProducts];

        if (value === 'low') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (value === 'high') {
            sorted.sort((a, b) => b.price - a.price);
        }

        showProducts(sorted);
    });
}