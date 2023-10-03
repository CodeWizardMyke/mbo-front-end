async function shootGetTransactions(){
    const get_transactions = await getTransactions()
    handdlerPromisses(get_transactions[0], get_transactions[1], 'GET_TRANSACTIONS')
}

async function shootGetCategorys(){
    const get_categotys = await getCategorys()
    handdlerPromisses(get_categotys[0], get_categotys[1], 'GET_CATEGORYS')
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

const select_category = document.querySelector('#category_select_transaction')
select_category.addEventListener('change', ()=> {
    shootGetTransactionByCategory(select_category.value)
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

function setCategoryDataInSelect(response){
    if(response.length){
        const select = document.querySelector('#category_select_transaction')
        select.innerHTML = ""
        response.forEach(element => {
            const option = document.createElement('option');

            option.value = element.id;
            option.id = `${element.category_name}:${element.id}`
            option.innerText =element.category_name

            select.appendChild(option)
        })
    }
}

function autoStartFunctions(){
    shootGetTransactions()
    shootGetCategorys()
}autoStartFunctions()