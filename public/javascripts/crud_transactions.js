
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

/* devo pegar do servidor todas as categorias existentes se tiver 
alguma mude a  configuração da view para exibir um select para 
poder selecionar a categoria, caso não exista não crie um campo 
select e mostre ao usuario um campo de texto para criar uma nova 
categoria, a categoria deve ser adicionada antes da transaction e 
linkar o id*/

function selectCategoryIsValue (){
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.name = 'category_name';

    if(selectCategory.value !== '' ){
        inputText.value = selectCategory.value
    }else{
        const domNewCategory = document.querySelector('#new_category')
        inputText.placeholder = 'Insira um nonme para a nova categoria'
        inputText.classList.add('form-select')
        domNewCategory.appendChild(inputText)
    }

selectCategoryIsValue()