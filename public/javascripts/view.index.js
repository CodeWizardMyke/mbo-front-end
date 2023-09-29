//verifique se o usuario esta logado
const divUserState = document.querySelector('#user-state')
const isUserLoged = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'))

console.log(isUserLoged)

if(isUserLoged == null){
    userOfline()
}

if(isUserLoged){
    changeToNavigateHeader()
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

function changeToNavigateHeader (){
    const publicNavigate = document.querySelector('#navigate-public')
    const privateNavigate = document.querySelector('#navigate-private')
    
    publicNavigate.style.display = 'none'
    privateNavigate.style.display = 'flex'
}

function userOfline(){
    const publicNavigate = document.querySelector('#navigate-public')
    const privateNavigate = document.querySelector('#navigate-private')
    
    publicNavigate.style.display = 'flex'
    privateNavigate.style.display = 'none'
}