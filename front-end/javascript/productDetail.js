function getProduct() {
    let token = localStorage.getItem('token');

    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    fetch(`http://localhost:8086/products/getById/${productId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            let object = await response.json();
            console.log(object);

            let img = document.querySelector('.left-side img');
            img.src = object.image;

            let h3 = document.querySelector('.right-side h3');
            h3.textContent = object.brand;

            let h4 = document.querySelector('.right-side h4');
            h4.textContent = object.description;

            let p = document.querySelector('.right-side p');
            p.textContent = object.price + " AZN";
        })
}

getProduct()

function addToCart() {
    let btn = document.querySelector('.right-side button');

    btn.addEventListener('click', () => {
        let urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get('id');
        console.log(productId);

        const token = localStorage.getItem('token');

        const cart = {
            productId: productId
        }

        fetch(`http://localhost:8086/cart/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })
            .then(async response => {
                let message = await response.text();
                alert(message);
            })

    })
}

addToCart()