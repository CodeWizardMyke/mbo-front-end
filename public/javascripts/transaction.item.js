/* OBTER O ID APARTIR DA URL DA PAGINA */
const arrayString = window.location.pathname.split('/')
const id = arrayString [arrayString.length -1]

/* OBTER DATOS DE UMA TRANSAÇÃO E DE TODAS CATEGORIAS */
window.addEventListener('load',()=>{
    getTransactionItem()
    getCategorys()
})

/* PEGAR UMA TRANSAÇÃO PELO ID*/
async function getTransactionItem (){
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
    
    handdlerTransaction(promisse, response, 'GET')
}

/* ATUALIZAÇÃO DE TRANSAÇÃO */
const transaction_form = document.querySelector('#tr-form')
transaction_form.addEventListener('submit', async (evt) => {
    evt.preventDefault()
    
    const formData = new FormData(transaction_form)
    const formDataObj = {};
    formData.forEach((value, key) => {
        if(key == 'date'){
           value = value.replace(/-/g, "/");
        }
        if(value){
            formDataObj[key] = value;
        }
    });
    formDataObj.id = id
    console.log(formDataObj)

    const url = `${urlBase}/transactions`
    const opt = {
        method:"PUT",
        headers:{
            "Authorization": `Baere ${token}`,
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formDataObj)
    }

    const promisse = await fetch(url, opt)
    const response = await promisse.json()

    console.log(promisse)
    handdlerTransaction(promisse, response, 'PUT')
})

/* DELETAR UMA TRANSAÇÃO */
document.querySelector('#delete').addEventListener('click', async () => {
    const url = `${urlBase}/transactions`
    const opt = {
        method:"DELETE",
        headers:{
            "Authorization":`Baerer ${token}`,
            "Content-type":"application/json"
        },
        body: JSON.stringify({id: id})
    } 

    const promisse = await fetch(url, opt);
    const response = await promisse.json();

    handdlerTransaction(promisse, response, 'DELETE')
})

/* PEGAR TODAS CATEGORIAS DO USUARIO */
async function getCategorys (){
    const url = `${urlBase}/category`
    const opt = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Baerer ${token}`
        },
    }

    const promisse = await fetch(url, opt);
    const response = await promisse.json()
    handdlerCategory(promisse, response)
}

/* TRATARMENTO DE STATUS PARA PROMISSES DAS TRANSACTIONS */
function handdlerTransaction(promisse, response, method){
    switch (promisse.status && method) {
        case 200 && 'GET':
            insertDataInDom(response)
            break;
        case 200 && 'PUT':
            window.location.reload()
            break;
        case 200 && 'DELETE':
            alert('item deleteado');
            window.location = '/profile/transactions'
            break;
        default:
            break;
    }
}

/* TRATAMENTO DE STATUS PARA PROMISSES DA CATEGORIA */
function handdlerCategory(promisse, response){
    switch (promisse.status) {
        case 200:
            insertCategoryInSelect(response)
            break;
        default:
            break;
    }
}

/* INSIRIR DADOS RECEBIDOS DA TRANSACTION NA VIEW */
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
    const dateSpan = document.querySelector('#data-value')
    const category = document.querySelector('#category-value')
    const type = document.querySelector('#type-value')
    const amount = document.querySelector('#amount-value')
    const installments = document.querySelector('#installments-value')

    let getData = response.date.split('T')[0]
    let dataBr = getData.split('-').reverse().join('/')
    

    dateSpan.innerHTML = "Data:"
    dateSpan.innerHTML = `Data da transação: ${dataBr}`
    category.innerHTML = `Categoria da conta: ${response.category.category_name}`
    type.innerHTML = `Tipo da transação: ${response.type}`
    amount.innerHTML = `Valor da transação: R$${response.amount}`
    installments.innerHTML = `Quantidades de parcelas: ${response.installments}`
}

/* INSIRIR DADOS RECEBIDOS DA CATEGORIAS NO SELECT */
function insertCategoryInSelect(response){
    if(response.length){
        const select = document.querySelector('#category-list')
        response.map(element => {
            const option = document.createElement('option');

            option.value = element.id
            option.innerText = element.category_name

            select.appendChild(option)
        })
    }
}