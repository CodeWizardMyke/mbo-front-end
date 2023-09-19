
document.querySelector('#btn-transaction').addEventListener('click', e =>{
    const divTransactionOption = document.querySelector('.transaction-option')
    
    if(divTransactionOption.classList.contains('d-off')){
        divTransactionOption.classList.remove('d-off')
    }else{
        divTransactionOption.classList.add('d-off')
    }
})

const selectCategory = document.querySelector('#category')
const formTransaction = document.querySelector("#transactionForm")
const formData = new FormData(formTransaction)

/* pesquise no banco de dados se existe categorias */
async function getAllCategoryUser(){
    const url = `${urlBase}/category`
    const opt = {
        method:"GET",
        headers:{
            "Authorization": `Baerer ${token}`
        }
    }

    const promisse = await fetch(url, opt)
    const resposne = await promisse.json();

    handderCategoryUser(promisse, resposne)
}
/* se tiver categorias entao crie um select e o adicione como option valor = id e texte = category_name */

function handderCategoryUser(promisse, resposne) {
    switch (promisse.status) {
        case 200:
            /* insira no dom o array de categorias */
            domInsertCategory(resposne);
            break;
        default:
            console.log(`Erro inesperado ao receber categorias do servidor cod: ${promisse.status}`)
            break;
    }
}

function domInsertCategory(resposne){
    if(resposne.length > 0){
        const phaterDivSelect = document.querySelector("#category_select");
        const createSelect = document.createElement('select');
        const createLabelSelect = document.createElement('label')
        
        createLabelSelect.innerText = 'Suas Categorias'
        createLabelSelect.for = 'select'
        createSelect.id = 'select'

        resposne.forEach(element => {
            const createOption = document.createElement('option')
            createOption.value = element.id
            createOption.innerText = element.category_name
            createSelect.appendChild(createOption);
        });

        createSelect.classList.add('form-select')
        phaterDivSelect.appendChild(createLabelSelect)
        phaterDivSelect.appendChild(createSelect);
    }
}

/* se o usuario desejar cadastrar uma nova categoria então insira um input text*/
document.querySelector('#btn_add_category').addEventListener('click', () => {
    const formNewCategory = document.querySelector('#new_category');
    const createInputText = document.createElement('input')
    const buttonSubmit = document.createElement('button')

    createInputText.classList.add('form-control')
    createInputText.placeholder = 'Digite o nome para sua categoria'
    createInputText.name = 'category_name'
    createInputText.id = 'category_name_input'
    createInputText.required
    buttonSubmit.classList.add('btn','btn-warning')
    buttonSubmit.type = 'button'
    buttonSubmit.innerText = 'Add nova categoria'
    buttonSubmit.id = 'btn_category_form'

    formNewCategory.appendChild(createInputText)
    formNewCategory.appendChild(buttonSubmit)

    document.querySelector('#btn_category_form').addEventListener('click', evt => {
        evt.preventDefault()
        newCategoryPost () 
    })
})


async function newCategoryPost () {
    const categoryValue = document.querySelector('#category_name_input').value

    const url = `${urlBase}/category`;
    const opt = {
        method:'POST',
        headers:{
            'Authorization': `Baerer ${token}`,
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({category_name: categoryValue})
    };
    const promisse = await fetch(url, opt);
    const response = await promisse.json()
    
}

function newCategoryPostHanddler(promisse, response){
    switch (promisse.status) {
        case 201:
            alert('categoria adicionada com sucesso')
            
            break;
        default:
            console.log(`Erro inesperado ao adicionar uma nova categoria cod: ${response.status}`)
            break;
    }
}


function StartApplicationTransaction(){
    getAllCategoryUser();

}StartApplicationTransaction()