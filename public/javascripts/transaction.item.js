const id = window.location.href.match(/\/(\d+)$/)[1];

window.addEventListener('load', async () =>{
    getDataTransaction();
    getDataCategorys();
})

async function getDataTransaction () {
    const {promisse, response} = await getTransactionById(id)
    handdlerPromisses(promisse, response, "get_transaction")
}

async function getDataCategorys() {
    const {promisse, response} = await getCategorys();
    handdlerPromisses(promisse, response, 'get_categorys');
}

/* ATUALIZAÇÃO DE TRANSAÇÃO */
$("#put_form").submit( async (evt) => {
    evt.preventDefault();
    const {promisse, response} = await put_transaction() ;
    handdlerPromisses(promisse, response, 'put_transaction');
})

/* DELETEANDO UMA TRANSAÇÃO */
$("#delete").click(  async ()=> {
    const {promisse, response} = await deleteTransaction(id);
    handdlerPromisses(promisse, response, 'delete_transaction');
});

function handdlerPromisses(promisse, response, mehtod){
    const key = `${promisse.status}_${mehtod}`

    switch (key) {
        case '200_get_transaction':
            writeDataReceviedInDom(response)
            break;
        case '200_put_transaction':
            alert('Alterado com sucesso!')
            window.location.reload()
            break;
        case '200_get_categorys':
            insertCategoryInSelect(response)
            break;
        case '200_delete_transaction':
            alert('Deletado com sucesso!')
            window.location = '/profile/transactions'
            break;
        default:
            console.log(`Error inesperado cod: ${promisse.status}`)
            break;
    }
}

/* INSIRIR DADOS RECEBIDOS DA TRANSACTION NA VIEW */
function writeDataReceviedInDom(response){
    for(const item in response){
        let item_value = response[item]
    
        item === 'date' ? item_value = item_value.match(/\d{4}-\d{2}-\d{2}/)[0] : '';
        item === 'category' ? item_value = response[item].category_name : '';
    
        $(`#${item}-value`).append(`<span>Valor atual da ${item}: ${item_value}</span>`)
    }
}

/* INSIRIR DADOS RECEBIDOS DA CATEGORIAS NO SELECT */
function insertCategoryInSelect(response){
    response.map(element => {
        $("#category-list").append(`
            <option value="${element.id}">${element.category_name}</option>
        `)
    })
}