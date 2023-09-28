window.addEventListener('load', getTransactionItem )
async function getTransactionItem (){

    const arrayString = window.location.pathname.split('/')
    const id = arrayString [arrayString.length -1]

    url = `${urlBase}/transactions/${id}`
    const opt = {
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Baerer ${token}`,
        },
    }

    const promisse = await fetch(url, opt)
    const response = await promisse.json()
    
    handdlerTransaction(promisse, response)
}

function handdlerTransaction(promisse, response){
    switch (promisse.status) {
        case 200:
            insertDataInDom(response)
            break;
    
        default:
            break;
    }
}

function insertDataInDom(response){
    /* adicione no header da transaaction item */
    const divHead = document.querySelector(".tr-head")
    divHead.innerHTML = ''

    const spanName = document.createElement('span')
    const spanValue = document.createElement('span')

    spanName.innerHTML = `Nome da conta: ${response.category.category_name}`
    spanValue.innerHTML = `Valor: ${response.amount}`

    divHead.appendChild(spanName)
    divHead.appendChild(spanValue)

    /* acicione no body da transaction item */
    const dateSpan = document.querySelector('#date-write')
    const category = document.querySelector('#category')
    const type = document.querySelector('#type')
    const amount = document.querySelector('#amount')
    const installments = document.querySelector('#installments')

    dateSpan.innerHTML = "Data:"
    dateSpan.innerHTML = `Data: ${response.date}`
    category.value = response.category.category_name
    type.value = response.type
    amount.value = response.amount
    installments.value = response.installments
}
