/* OBTER O ID APARTIR DA URL DA PAGINA */
const arrayString = window.location.pathname.split('/')
const id = arrayString [arrayString.length -1]

/* OBTER DATOS DE UMA TRANSAÇÃO E DE TODAS CATEGORIAS */
window.addEventListener('load', async () =>{
   const get_transaction_id = await getTransactionById(id)
   handdlerPromisses(get_transaction_id[0], get_transaction_id[1], 'GET_TRANSATION')

   const get_categotys = await getCategorys();
   handdlerPromisses(get_categotys[0], get_categotys[1], 'GET_CATEGORYS')
})

/* ATUALIZAÇÃO DE TRANSAÇÃO */
document.querySelector('#put_form').addEventListener('submit', async (evt) => {
    evt.preventDefault()
    const put_transaction = await putTransaction('#put_form', id)
    handdlerPromisses(put_transaction[0], put_transaction[1], 'PUT_TRANSACTION')
})

/* DELETAR UMA TRANSAÇÃO */
document.querySelector('#delete').addEventListener('click', async () => {
    const delete_transaction = await deleteTransaction(id);
    console.log(delete_transaction)
    handdlerPromisses(delete_transaction[0], delete_transaction[1], 'DELETE_TRANSACTION')
})

function handdlerPromisses(promisse, response, mehtod){
    const key = `${promisse.status}_${mehtod}`

    switch (key) {
        case '200_GET_TRANSATION':
            writeDataReceviedInDom(response)
            break;
        case '200_PUT_TRANSACTION':
            alert('Alterado com sucesso!')
            window.location.reload()
            break;
        case '200_DELETE_TRANSACTION':
            alert('Deletado com sucesso!')
            window.location = '/profile/transactions'
            break;
        case '200_GET_CATEGORYS':
            insertCategoryInSelect(response)
            break;
        default:
            console.log(`Error inesperado cod: ${promisse.status}`)
            break;
    }
}

/* INSIRIR DADOS RECEBIDOS DA TRANSACTION NA VIEW */
function writeDataReceviedInDom(response){
    document.querySelector('#category_name').innerHTML = `Nome da conta: ${response.category.category_name}`
    document.querySelector('#amount').innerHTML = `Valor: ${response.amount}`

    let getData = response.date.split('T')[0]
    let dataBr = getData.split('-').reverse().join('/')

    document.querySelector('#data-value').innerHTML = `Data da transação: ${dataBr}`
    document.querySelector('#category-value').innerHTML = `Categoria da conta: ${response.category.category_name}`
    document.querySelector('#type-value').innerHTML = `Tipo da transação: ${response.type}`
    document.querySelector('#amount-value').innerHTML = `Valor da transação: R$${response.amount}`
    document.querySelector('#installments-value').innerHTML = `Quantidades de parcelas: ${response.installments}`
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