const urlBase = 'https://mbo-backend-app.fly.dev';

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

if(!user){
    alert('faça login antes de acessar essa rota!')
    window.location = '/singin'
}

function changeToNavigateHeader (){
    const div_nav = document.querySelector('#nav-public');
    div_nav.innerHTML = '';

    const transactionNav =document.createElement('a');
    transactionNav.innerText = 'Transações'
    transactionNav.href = '/profil/transactions'    
    transactionNav.classList.add('nav-link')

    div_nav.appendChild(transactionNav)
}

const startFunctionsProfileIndex = () => {
    changeToNavigateHeader()
};
startFunctionsProfileIndex()