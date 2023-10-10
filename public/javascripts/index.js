const urlBase = 'https://mbo-backend-app.fly.dev';

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')


//FUNÇÃO PARA DESLOGAR USUARIO / REMOVER TOKEN E USUARIO DO LOCAL STORAGE
function LogoutUser(){
    document.querySelector('#logout').addEventListener('click', e => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    })
}

//PEGAR TODAS AS TRANSAÇOES E ADICIONAR AO LOCAL STORAGE
const transactions_data = localStorage.getItem('transactions')
transactions_data ? '' : GetTransactions();
async function GetTransactions(){
    const opt = {
        method :"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch(`${urlBase}/transactions`, opt);
    const response = await promisse.json()

    handdlerIndexRequests(promisse, response, 'transactions');
}

//PEGAR TODAS AS CATEGORIAS E ADICIONAR AO LOCAL STORAGE
const categorys_data = localStorage.getItem('categorys')
categorys_data ? '' : GetCategorys();
async function GetCategorys(){
    const opt = {
        method :"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch(`${urlBase}/category`, opt);
    const response = await promisse.json()
    
    handdlerIndexRequests(promisse, response, 'categorys');
}

//TRATAMENTO DE STATUS DE REQUISIÇOES
function handdlerIndexRequests(promisse, response, f){
    const key = `${promisse.status}_${f}`

    switch (key) {
        case '200_transactions':
            saveDataLocalStorage(response, f)
            break;

        case '200_categorys':
            saveDataLocalStorage(response, f)
            break;
    
        default:
            console.log(`Error inesperado cod: ${promisse.status}!`)
            break;
    }
}

//FUNÇÃO RESPONSAVEL POR SALVAR OS DADOS NA LOCAL STORAGE
function saveDataLocalStorage(response, f){
    localStorage.setItem( f, JSON.stringify(response))
}

//START DEFALT FUNCTIONS
function StartaApp(){
    LogoutUser()
}