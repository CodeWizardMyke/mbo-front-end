const urlBase = 'https://mbo-backend-app.fly.dev';
const urlProject = 'http://localhost:3000'

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

window.addEventListener('load', ()=> {
    //logout btn event
    $("#btn-logout").click( ()=> { userLogout() });

    user ? userLogedTrue() : '';

})

function userLogout () { 
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('transactions')
    localStorage.removeItem('categorys')

    window.location = '/';
}

function userLogedTrue () { 
    $("#navigate-user").css('display','flex')
}