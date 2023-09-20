//verifique se o usuario esta logado
const divUserState = document.querySelector('#user-state')
const isUserLoged = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'))

if(isUserLoged){
    divUserState.innerHTML = ""
    const linkProfile =  document.createElement('a');
    linkProfile.innerHTML = 'Profile'
    linkProfile.href = '/profile'
    linkProfile.classList.add('nav-link')

    divUserState.appendChild(linkProfile)
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