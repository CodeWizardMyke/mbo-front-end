/* OBTER O ID APARTIR DA URL DA PAGINA */
const arrayString = window.location.pathname.split('/')
const id = arrayString [arrayString.length -1]

/* OBTER DATOS DE UMA TRANSAÇÃO E DE TODAS CATEGORIAS */
window.addEventListener('load',()=>{
    getCategory()
})

/* PEGAR UMA TRANSAÇÃO PELO ID*/
async function getCategory (){
    url = `${urlBase}/category/${id}`
    const opt = {
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Baerer ${token}`,
        },
    }
    const promisse = await fetch(url, opt)
    const response = await promisse.json()
    
    validateRequest (promisse, response, 'GET')
      
}

/* ATUALIZAÇÃO DE TRANSAÇÃO */
const form_put = document.querySelector('#form_put')
form_put.addEventListener('submit', async (evt) => {
    evt.preventDefault()
    const category_name = document.querySelector('#category_name').value

    const url = `${urlBase}/category/${id}`
    const opt = {
        method:"PUT",
        headers:{
            "Authorization": `Baere ${token}`,
            "Content-Type":"application/json"
        },
        body: JSON.stringify({category_name:category_name})
    }

    const promisse = await fetch(url, opt)
    const response = await promisse.json()

    validateRequest (promisse, response, 'PUT')
})

/* DELETAR UMA TRANSAÇÃO */
document.querySelector('#delete').addEventListener('click', async () => {
    const url = `${urlBase}/category/${id}`
    const opt = {
        method:"DELETE",
        headers:{
            "Authorization":`Baerer ${token}`,
            "Content-type":"application/json"
        },
    } 

    const promisse = await fetch(url, opt);
    const response = await promisse.json();

    validateRequest( promisse, response, 'DELETE')
})

/* TRATAMENTO DE STATUS PARA PROMISSES DA CATEGORIA */
function validateRequest (promisse, response , method ){
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