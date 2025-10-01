const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    fetch('http://localhost:8086/users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(async response => {
        if (response.ok) {
            alert('User login successfully');
            const token = await response.text();
            localStorage.setItem('token',token);
            window.location.href = "index.html";
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
        else{
            let data = await response.json();
            alert(data.message);
        }
    })
})