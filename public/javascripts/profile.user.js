const urlBase = 'https://mbo-backend-app.fly.dev';

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

if(!user){
    alert('faça login antes de acessar essa rota!')
    window.location = '/singin'
}

let headerTitle =  document.querySelector('.header-tt h1')
headerTitle.innerHTML = `Bem vindo ${user.fullname.split(' ')[0]}`

function StartApplicationByTransactions(response){
    if(response.length > 0){
        transactionIsTrue()
    }else{
    }
}
