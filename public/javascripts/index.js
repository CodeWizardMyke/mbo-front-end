const urlBase = 'https://mbo-backend-app.fly.dev';

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

const logoutBtn = document.querySelector('#logout')
if(logoutBtn){
    logoutBtn.addEventListener('click', e => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload()
    })
}