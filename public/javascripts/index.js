const urlBase = 'https://mbo-backend-app.fly.dev';
//const urlBase = 'http://localhost:1515';
const urlProject = 'http://localhost:3000'


const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

//FUNÇÃO PARA DESLOGAR USUARIO / REMOVER TOKEN E USUARIO DO LOCAL STORAGE
function LogOutUser(){
    document.querySelector('#logout').addEventListener('click', e => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    })
}
window.addEventListener('load', e => {
    if(user && token){
        const secoundNav = document.querySelector('#secound-nav')
        secoundNav.innerHTML = ""

        const div_buttons = document.createElement('div')
        const btn_profile = document.createElement('button')
        const btn_transactions = document.createElement('button')
        const btn_categorys = document.createElement('button')

        btn_profile.innerText = 'Profile';
        btn_transactions.innerText = "Transactions";
        btn_categorys.innerText = "Categorys";

        btn_categorys.classList.add('btn', 'btn-secondary')
        btn_transactions.classList.add('btn', 'btn-secondary')
        btn_profile.classList.add('btn', 'btn-secondary')
        div_buttons.classList.add('div_buttons')

        btn_profile.addEventListener('click',e =>{
            window.location.href =`${urlProject}/profile`
        })
        btn_transactions.addEventListener('click',e =>{
            window.location.href =`${urlProject}/profile/transactions`
        })
        btn_categorys.addEventListener('click',e =>{
            window.location.href =`${urlProject}/profile/categorys`
        })

        div_buttons.appendChild(btn_profile)
        div_buttons.appendChild(btn_transactions)
        div_buttons.appendChild(btn_categorys)
        secoundNav.appendChild(div_buttons)
    }else{
        document.querySelector('#btn_singIn').addEventListener('click', e => {
            window.location.href = `${urlProject}/singin`
        })
    }
})

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
    LogOutUser()
}