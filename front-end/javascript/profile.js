function getUserProfile(){
    const token = localStorage.getItem('token');

    fetch('http://localhost:8086/users/profile', {
        method:'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => {
        let data = await response.json();
        console.log(data);
        
        document.getElementById('user-name').textContent = data.name;
        document.getElementById('user-surname').textContent = data.surname;
        document.getElementById('user-email').textContent = data.email;
        document.getElementById('user-username').textContent = data.username;
    })
}

getUserProfile();

let productButton = document.querySelector('.sub-main button');

productButton.addEventListener('click', (e) => {
    window.location.href = 'myProducts.html';
})