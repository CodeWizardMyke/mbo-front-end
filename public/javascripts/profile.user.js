window.addEventListener('load', async () => {
    !user ? window.location = '/singin': ''

    document.querySelector('.month-date').innerText = getMonth()

    const get_transactions = await getTransactions()
    handdlerTransactions(get_transactions[0], get_transactions[1], 'GET')
})

function handdlerTransactions(promisse, response, method){
    const key = `${promisse.status}_${method}`

    switch (key) {
        case '200_GET':
            insertDataInView(response)
            defineBalanceUser(response)
            break;
        default:
            break;
    }
}

function defineBalanceUser(response){
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

    let balance = (revenue + gift) - ( expense + card)

    const domDivBalanceTransactions = document.querySelector('.transactions-balance')

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

function insertDataInView(response){
    const divExpense = document.querySelector('.m-expense')

    const expense = []
    
    response.forEach(element => {
        if(element.type == 'despesa'){
            expense.push(element)
        }
    })

    expense.forEach(element => {
        const ul = document.createElement('ul')
        const li = document.createElement('li')

        li.innerText = `Conta: ${element.category.category_name} | valor: R$ ${element.amount}`

        ul.appendChild(li)
        divExpense.appendChild(ul)
    })
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