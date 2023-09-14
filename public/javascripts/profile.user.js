const urlBase = 'https://mbo-backend-app.fly.dev';

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

if(!user){
    alert('faça login antes de acessar essa rota!')
    window.location = '/singin'
}

let headerTitle =  document.querySelector('.header-tt h1')
headerTitle.innerHTML = `Bem vindo ${user.fullname.split(' ')[0]}`

window.addEventListener('load', e => {

    async function getTransactions(){
        const url = `${urlBase}/transactions`
        const opt =  {
            method:'GET',
            headers:{
                "Authorization":`Baerer ${token}`
            }
        }
        const promisse = await fetch(url, opt);
        const response = await promisse.json();
    
        transactionsHanddler(response, promisse)
    }
    getTransactions()
})

function transactionsHanddler (response, promisse){
    switch (promisse.status) {
        case 200:
            StartApplicationByTransactions(response)   
            break;
        default:
            alert('error inesperado! '+ promisse.status)
            break;
    }
}

function StartApplicationByTransactions(response){
    if(response.length > 0){
        transactionIsTrue()
        console.log('transaction existente')
    }else{
    }
}

function transactionIsTrue(){
    const divBalance = document.querySelector('#balance-card')
    divBalance.style = 'display:block;'
}

document.querySelector('#btn-transaction').addEventListener('click', e =>{

    const divTransactionOption = document.querySelector('.transaction-option')
    
    if(divTransactionOption.classList.contains('d-off')){
        divTransactionOption.classList.remove('d-off')
    }else{
        divTransactionOption.classList.add('d-off')
    }
})