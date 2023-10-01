const urlBase = 'http://localhost:1515';
//'http://localhost:1515'
//'https://mbo-backend-app.fly.dev';'

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

if(!user){
    alert('faça login antes de acessar essa rota!')
    window.location = '/singin'
}

async function balanceDataTransactions(){
    const url = `${urlBase}/transactions`
    const opt = {
        method:"GET", 
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch(url, opt);
    const response = await promisse.json();

    handdlerTransactionProfile(promisse, response)
}


function handdlerTransactionProfile(promisse, response){
    switch (promisse.status) {
        case 200:
            handdlerTransactionData(response)
            break;
        default:
            alert(`Error inesperado cod: ${promisse.status}`)
            break;
    }
}


function handdlerTransactionData(response){
    if(!response.length){return false}

    let expense = 0
    let revenue = 0
    let gift = 0
    let card = 0

    response.map(element => {
        switch (element.type) {
            case 'despesa':
                expense +=   Number(element.amount)
                break;
            case 'receita':
                revenue +=   Number(element.amount)
                break;
            case 'despesa':
                gift +=   Number(element.amount)
                break;
            case 'despesa':
                card +=   Number(element.amount)
                break;
            default:
                break;
        }
    })

    let balance = (revenue + gift) - (expense - card)

    const domDivBalanceTransactions = document.querySelector('.transactions-balance')

    if(domDivBalanceTransactions){
        const div = document.createElement('div');
        const span = document.createElement('span');
        const h3 = document.createElement('h3')
        
        span.innerText= `Saldo:`
        h3.innerText = `R$ ${balance}`
        
        if(balance < 0 ){
            h3.classList.add('negative')
        }else{
            h3.classList.remove('negative')
        }
        div.classList.add('balance')

        domDivBalanceTransactions.innerHTML = ""
        div.appendChild(span)
        div.appendChild(h3)
        domDivBalanceTransactions.appendChild(div)
    }
}

const elementDomMonthDate = document.querySelector('.month-date');
if(elementDomMonthDate){
    const span = document.createElement('span');
    span.innerText = getMonth()

    elementDomMonthDate.innerHTML=""
    elementDomMonthDate.appendChild(span)
}

function getMonth(){
    function obterNomeMes(mes) {
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        if (mes >= 1 && mes <= 12) {
            return meses[mes - 1];
        } else {
            return 'Mês inválido';
        }
    }
    
    const data = new Date(); 
    const mes = data.getMonth() + 1;
    
    const nomeDoMes = obterNomeMes(mes);
    return nomeDoMes;
}

const startFunctionsProfileIndex = () => {
    balanceDataTransactions()
};
startFunctionsProfileIndex()