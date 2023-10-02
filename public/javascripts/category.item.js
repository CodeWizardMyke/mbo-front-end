/* OBTER O ID APARTIR DA URL DA PAGINA */
const params_id = window.location.pathname.split('/')
const id = params_id [params_id.length -1]

window.addEventListener('load', async () => {
    const get_category =  await getCategoryById(id)
    handdlerCategoryItem(get_category[0], get_category[1], 'GET')
})

const put_category_form = document.querySelector('#form_put')
put_category_form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const put_category = await putCategory("#form_put", id);
    handdlerCategoryItem(put_category[0], put_category[1], 'PUT')
})

/* DELETAR UMA TRANSAÇÃO */
document.querySelector('#delete').addEventListener('click', async () => {
    const delete_category = await deleteCategory(id);
    handdlerCategoryItem(delete_category[0], delete_category[1], "DELETE")
})

function handdlerCategoryItem (promisse, response , method ){
    const key = `${promisse.status}_${method}`

    switch (key) {
        case '200_GET':
            insertCategoryInSelect(response)
            break;

        case '200_PUT':
            alert('item atualizado com sucesso');
            window.location.reload()
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

/* INSIRIR DADOS RECEBIDOS DA CATEGORIAS NO SELECT */
function insertCategoryInSelect(response){
    const phater_description = document.querySelector('.tr-head')
    const span = document.createElement('span')

    span.innerText= response.category_name.toUpperCase()
    phater_description.appendChild(span)

    document.querySelector('#category_name').value = response.category_name
}