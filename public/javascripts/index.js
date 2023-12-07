const urlBase = 'https://mbo-backend-app.fly.dev';

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

window.addEventListener('load', ()=> {
    //logout btn event
    $("#btn-logout").click( ()=> { userLogout() });

    user ? userLogedTrue() : userLogedFalse();

})

function userLogout () { 
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('transactions')
    localStorage.removeItem('categorys')

    window.location = '/';
    
}

function userLogedTrue () { 
    $(".sub-menu").css('display','flex')
    $(".btn-singin").remove();
}
function userLogedFalse() { 
    $(".sub-menu").css('display','none')
}
