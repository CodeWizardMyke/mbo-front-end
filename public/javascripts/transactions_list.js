const url = `${urlBase}/transactions`

window.addEventListener('load', ()=> { 
    getTransactions()
    getAllcategory()
})

const btn_get_all_transaction = document.querySelector('#bt_get_all_transactions')
btn_get_all_transaction.addEventListener('click', ()=> {
    getTransactions()
})

const select_type = document.querySelector('#type')
select_type.addEventListener('change', ()=> {
    getTransactionByType(select_type.value)
})

const select_category = document.querySelector('#category_select_transaction')
select_category.addEventListener('change', ()=> {
    getTransactionByCategory(select_category.value)
})

async function getTransactions(){
    showLoader()
    const opt = {
        method :"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }
    const promisse = await fetch(url, opt);
    const response = await promisse.json();

    hideLoader()
    handdlerTransacionListed(promisse, response)
}

async function getAllcategory(){
    const urlCategory = `${urlBase}/category`
    const opt = {
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch(urlCategory, opt)
    const response = await promisse.json();

    handdlerCategory( promisse, response )
}

async function getTransactionByType (value) {
    showLoader()
    const url_transaction_byType = `${urlBase}/transactions/type/${value}`
    const opt = {
        method :"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        },
    }

    const promisse = await fetch(url_transaction_byType, opt);
    const response = await promisse.json();

    hideLoader()
    handdlerTransacionListed(promisse, response)
}

async function getTransactionByCategory(value){
    console.log(value)
    const url_transaction_byCategory = `${urlBase}/transactions/category/${value}`
    const opt ={
        mehtod:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        },
    }
    const promisse = await fetch(url_transaction_byCategory, opt);
    const response = await promisse.json();

    handdlerTransacionListed(promisse, response)
}

function handdlerCategory(promisse, response){
    switch (promisse.status) {
        case 200:
            setCategoryDataInSelect(response)
            break;  
        default:
            break;
    }
}

function handdlerTransacionListed( promisse ,response ){
    switch (promisse.status) {
        case 200:
            setDataInListAllTransactions(response)
            break;  
        default:
            break;
    }
}

/* functions insert data in view */

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