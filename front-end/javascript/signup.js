const registerForm = document.querySelector('form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
        name: document.getElementById('name').value.trim(),
        surname: document.getElementById('surname').value.trim(),
        email: document.getElementById('email').value.trim(),
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value
    };

    fetch('http://localhost:8086/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(async response => {
        if (response.ok) {
            alert('User registered successfully');

            document.getElementById('name').value = '';
            document.getElementById('surname').value = '';
            document.getElementById('email').value = '';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        } else {
            const data = await response.json();
            alert(data.message || 'Registration failed.');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Network error. Try again later.');
    });
});
