const transactions = JSON.parse(transactions_data)
transactions ? setDataInListAllTransactions(transactions) : GetTransactions() ;

document.querySelector('#type').addEventListener('change', async ()=> {
    const value = document.querySelector('#type').value
    const get_transactions = value ? await getTransactionByType(value) : [];
    
    handdlerPromisses(get_transactions[0], get_transactions[1], 'GET_TRANSACTIONS')
})

document.querySelector('#bt_get_all_transactions').addEventListener('click', () => {
    transactions ? setDataInListAllTransactions(transactions) : GetTransactions() ;
})

async function getBalance(){
    const url = `${urlBase}/data/balance`
    const opt = {
        "method":"GET",
        "headers":{
            "Authorization":`Baerer ${token}`,
        }
    }

    const promisse = await fetch( url, opt );
    return await promisse.json();
}

function handdlerPromisses(promisse, response, f){
    const key = `${promisse.status}_${f}`

    switch (key) {
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

    response.map(element => {
        const li = document.createElement('li')
        const anchor = document.createElement('a')
        const div = document.createElement('div')
        const spanCategory = document.createElement('span')
        const spanType = document.createElement('span')
        const spanValue = document.createElement('span')

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
}


function insertDomBalance(){
    getBalance()
        .then(data => {
            const div_balance = document.querySelector('.transactions-balance')
            div_balance.innerText = `Balanco das contas: R$ ${data.balance}`
        })
        .catch(err => console.log(err))

}insertDomBalance()

