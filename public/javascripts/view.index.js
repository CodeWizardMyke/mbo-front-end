//verifique se o usuario esta logado
const divUserState = document.querySelector('#user-state')
const isUserLoged = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'))

if(isUserLoged == null){
    userOfline()
}

if(isUserLoged){
    console.log('isUserLoged')
}


// Função para mostrar o loader
function showLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "flex";
}

// Função para esconder o loader
function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
}

function userOfline(){
    const publicNavigate = document.querySelector('#navigate-public')
    const privateNavigate = document.querySelector('#navigate-private')
    
    publicNavigate.style.display = 'flex'
    privateNavigate.style.display = 'none'
}