/* OBTER O ID APARTIR DA URL DA PAGINA */
const params_id = window.location.pathname.split('/')
const id = params_id [params_id.length -1]

window.addEventListener('load', async () => {
    get_category();
    get_transactions();
})
async function get_category() {
    const {promisse, response} = await getCategoryById(id);
    handdlerPromisses (promisse, response, 'GET');
};

async function get_transactions() {
    const {promisse, response} = await getTransactions();
    handdlerPromisses (promisse, response, 'GET_TRANSACTIONS');
};

const put_category_form = document.querySelector('#form_put')
put_category_form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const {promisse, response} = await putCategory("#form_put", id);
    handdlerPromisses( promisse, response, 'PUT')
})

/* DELETAR UMA TRANSAÇÃO */
document.querySelector('#delete').addEventListener('click', async () => {
    const {promisse, response } = await deleteCategory(id);
    handdlerPromisses( promisse, response, "DELETE")
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
            window.location = '/dashboard/categorys'
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
    $('.list_items ul').empty();
    let trExists = false;
    response.map(element => {
        if(element.category.id == id){
            console.log(element)
            trExists = true;
           $(".list_items ul").append(`
                <li>
                    <a href="/dashboard/transaction/${element.id}">
                        <div>
                            <span>${element.category.category_name}</span>
                            <span>${element.type}</span>
                        </div>
                        <span>R$: ${element.amount}</span>
                    </a>
                </li>
           `);
        };
    });

    if(!trExists){
        $(".list_items ul").append(`<li>Nenhuma transação registrada para esssa categoria</li>`)
        $(".list_items ul").css({'color':'#fff', 'text-align':'center'});
    }
}