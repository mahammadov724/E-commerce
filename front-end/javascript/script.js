document.getElementById('log-out').addEventListener('click', () => {
    localStorage.removeItem('token');
})