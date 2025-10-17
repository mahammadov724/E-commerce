document.getElementById('log-out').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = "index.html";
})

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
        document.getElementById('user-name').textContent = data.username;
    })
}

getUserProfile();