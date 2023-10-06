async function shootGetTransactions(){
    const get_transactions = await getTransactions()
    handdlerPromisses(get_transactions[0], get_transactions[1], 'GET_TRANSACTIONS')
}

async function shootGetTransactionByType(type){
    const get_transactions = await getTransactionByType(type)
    handdlerPromisses(get_transactions[0], get_transactions[1], 'GET_TRANSACTIONS')
}

async function shootGetTransactionByCategory(category){
    const get_categotys = await getCategorys(category)
    handdlerPromisses(get_categotys[0], get_categotys[1], 'GET_TRANSACTIONS')
}

const btn_get_all_transaction = document.querySelector('#bt_get_all_transactions')
btn_get_all_transaction.addEventListener('click', ()=> {
    shootGetTransactions()
})

const select_type = document.querySelector('#type')
select_type.addEventListener('change', ()=> {
    shootGetTransactionByType(select_type.value)
})

function handdlerPromisses(promisse, response, method){
    const key = `${promisse.status}_${method}`

    switch (key) {
        case '200_GET_CATEGORYS':
            setCategoryDataInSelect(response)
            break;
        case '200_GET_TRANSACTIONS':
            setDataInListAllTransactions(response)
            break;
        default:
            console.log(`Error inesperado cod: ${response.status}`)
            break;
    }
}

function setDataInListAllTransactions(response) {
    const div_list = document.querySelector('.list_items')
    div_list.innerHTML ="";
    const ul = document.createElement('ul')
    
        let despesa=0
        let receita=0
        let cartao=0
        let presente=0
        let balance=0

    response.map(element => {
        const li = document.createElement('li')
        const anchor = document.createElement('a')
        const div = document.createElement('div')
        const spanCategory = document.createElement('span')
        const spanType = document.createElement('span')
        const spanValue = document.createElement('span')

        switch (element.type) {
            case 'despesa' :
                despesa = Number(element.amount)
            break;
            case 'receita' :
                receita = Number(element.amount)
            break;
            case 'cartão' :
                cartao = Number(element.amount)
            break;
            case 'presente' :
                presente = Number(element.amount)
            break;
        }
        
        spanCategory.innerText = element.category.category_name
        spanType.innerText = element.type
        spanValue.innerText = `R$: ${element.amount}`
        
        anchor.href= `/profile/transaction/${element.id}`

        anchor.appendChild(div)
        anchor.appendChild(spanValue)
        div.appendChild(spanCategory)
        div.appendChild(spanType)
        li.appendChild(anchor)
        ul.appendChild(li)
    })
    div_list.appendChild(ul)

    balance = (receita + presente) - (despesa + cartao)

    const div_balance = document.querySelector('.transactions-balance')
    div_balance.innerText = `Balanco das contas: R$ ${balance}`
}


function autoStartFunctions(){
    shootGetTransactions()
}autoStartFunctions()


function calculateBalance(values, type){
    let balance = 0
    console.log(balance)

    switch (type) {
        case 'despesa' :
            balance = - Number(values)
        break;
        case 'receita' :
            balance = Number(values)
        break;
        case 'cartão' :
            balance = - Number(values)
        break;
        case 'presente' :
            balance = Number(values)
        break;
        default:
            break;
    }
    return balance
}