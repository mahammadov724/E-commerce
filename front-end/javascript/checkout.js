const token = localStorage.getItem('token');

document.getElementById('orderBtn').addEventListener('click', () => {
    let firstName = document.getElementById('firstName').value.trim();
    let lastName = document.getElementById('lastName').value.trim();
    let state = document.querySelector('select[name="state"]').value.trim();
    let address = document.getElementById('address').value.trim();
    let city = document.getElementById('city').value.trim();
    let tel = document.getElementById('tel').value.trim();
    let email = document.getElementById('email').value.trim();
    let cardNum = document.querySelector('input[name="cardNum"]').value.trim();
    let zip = document.getElementById('zip').value.trim();
    let expirationMM = document.getElementById('expiryMonth').value.trim();
    let expirationYY = parseInt(document.getElementById('expiryYear').value.trim());
    let cardSecurityCode = parseInt(document.getElementById('securitycode').value.trim());

    let cartIds = JSON.parse(localStorage.getItem('cartIdss')) || [];

    if (cartIds.length === 0) {
        Swal.fire({
            title: "Səbətdə heç bir məhsul yoxdur!",
            icon: "warning",
            width: '300px',
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#fff3cd',
            color: '#856404',
        });
        return;
    }

    let promises = cartIds.map(cartId => {
        const order = {
            cartId: cartId,
            firstName: firstName,
            lastName: lastName,
            state: state,
            city: city,
            address: address,
            zip: zip,
            tel: tel,
            email: email,
            cardNum: cardNum,
            expirationMM: expirationMM,
            expirationYY: expirationYY,
            cardSecurityCode: cardSecurityCode
        };

        return fetch(`http://localhost:8086/orders/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
    });

    Promise.all(promises)
        .then(async responses => {
            let successResponse = responses.find(resp => resp.ok);

            if (successResponse && successResponse.ok) {
                let message = await successResponse.text();

                Swal.fire({
                    title: message,
                    icon: "success",
                    width: '300px',
                    position: 'bottom-end',
                    toast: true,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#d4edda',
                    color: '#155724',
                });

                document.getElementById('checkoutForm').reset();
                localStorage.removeItem('cartIdss');

                document.querySelectorAll('.error-message').forEach(e => e.remove());
                document.querySelectorAll('input, select').forEach(i => i.style.borderColor = "");
            } else {
                for (let res of responses) {
                    let data;
                    try {
                        data = await res.json();
                    } catch {
                        continue;
                    }

                    if (data.message) {
                        Swal.fire({
                            title: data.message,
                            icon: 'error',
                            width: '300px',
                            position: 'bottom-end',
                            toast: true,
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            background: '#f8d7da',
                            color: '#721c24',
                        });
                    }

                    document.querySelectorAll('.error-message').forEach(e => e.remove());
                    document.querySelectorAll('input, select').forEach(i => i.style.borderColor = "");

                    if (data.validations) {
                        data.validations.forEach(error => {
                            let field = error.field;
                            let message = error.defaultMessage;

                            let inputField = document.getElementById(field);
                            if (inputField) {
                                inputField.style.borderColor = "red";

                                let errorMessage = document.createElement('div');
                                errorMessage.classList.add('error-message');
                                errorMessage.innerText = message;
                                errorMessage.style.color = "red";
                                errorMessage.style.fontSize = "12px";

                                inputField.parentElement.appendChild(errorMessage);
                            }
                        });
                    }
                }
            }
        })
        .catch(err => {
            console.error(err);
            Swal.fire({
                title: "Serverlə əlaqə zamanı problem yarandı!",
                icon: "error",
                width: '300px',
                position: 'bottom-end',
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#f8d7da',
                color: '#721c24',
            });
        });
});

function loadCheckoutSummary() {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8086/cart/getCart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => {
        if (!response.ok) throw new Error("Səbət məlumatı alına bilmədi");
        const data = await response.json();

        let subtotal = 0;
        data.forEach(item => {
            subtotal += item.product.price * item.quantity;
        });

        document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)}$`;
        document.getElementById('total').textContent = `${subtotal.toFixed(2)}$`;
    })
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', loadCheckoutSummary);
