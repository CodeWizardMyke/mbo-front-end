/* OBTER O ID APARTIR DA URL DA PAGINA */
const params_id = window.location.pathname.split('/')
const id = params_id [params_id.length -1]

window.addEventListener('load', async () => {

    const get_category =  await getCategoryById(id)
    handdlerPromisses(get_category[0], get_category[1], 'GET')

    const get_transactions = await getTransactions()
    handdlerPromisses(get_transactions[0], get_transactions[1], 'GET_TRANSACTIONS')

})



const put_category_form = document.querySelector('#form_put')
put_category_form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const put_category = await putCategory("#form_put", id);
    handdlerPromisses(put_category[0], put_category[1], 'PUT')
})

/* DELETAR UMA TRANSAÇÃO */
document.querySelector('#delete').addEventListener('click', async () => {
    const delete_category = await deleteCategory(id);
    handdlerPromisses(delete_category[0], delete_category[1], "DELETE")
})

function handdlerPromisses (promisse, response , method ){
    const key = `${promisse.status}_${method}`

    switch (key) {
        case '200_GET':
            insertDataCategory(response)
            break;

        case '200_PUT':
            alert('item atualizado com sucesso');
            window.location.reload()
            break;

        case '200_GET_TRANSACTIONS':
            setDataInListAllTransactions(response)
            break;

        case '200_DELETE':
            alert('item deletado com sucesso')
            window.location = '/profile/categorys'
            break;
            
        case '500_DELETE':
            let dataError = response.index

            if(dataError == 'transactions_category_id_fkey'){
                alert('Remova antes todas transações, que tem relaçao com esta categoria')
            }

            break;
        default:
            console.log(`Erro inesperado cod:${promisse.status}`)
            break;
    }
}

let category_value ='' 
function insertDataCategory(response){
    const phater_description = document.querySelector('.content-value')
    const span = document.createElement('span')
    category_value = response.category_name
    span.innerText= response.category_name.toUpperCase()
    phater_description.appendChild(span)

    document.querySelector('#category_name').value = response.category_name
}

function setDataInListAllTransactions(response) {
    const div_list = document.querySelector('.list_items')
    div_list.innerHTML ="";
    const ul = document.createElement('ul')

    response.map(element => {
        if(element.category.category_name == category_value){
            const li = insertDataList(element)
            ul.appendChild(li)
        }
    })
    div_list.appendChild(ul)

    if(ul.innerHTML == ""){
        ul.innerHTML = `Nenhuma transação registrada para esssa categoria`
        ul.style.color= '#fff'
        ul.style.textAlign= 'center'
    }
}

function insertDataList(element){
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
    return li
}