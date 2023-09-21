const url = `${urlBase}/transactions`

const btn_get_all_transaction = document.querySelector('#bt_get_all_transactions')
btn_get_all_transaction.addEventListener('click', getTransactions)
window.addEventListener('load', getTransactions )
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
    handdlerTransactionsCrud(promisse, response)
}

async function editTransaction(data){
    console.log('Edit')

}
async function deleteTransaction(id){
    console.log('delete')
}

function handdlerTransactionsCrud( promisse ,response ){
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
    const ul = document.querySelector('.transactions-listed ul')
    ul.innerHTML = "";
    if(response.length > 0){
        response.map( element => {
            const li = document.createElement('li');
            const divTitle = document.createElement('div') 
            const div1 = document.createElement('div') 
            const div2 = document.createElement('div') 
            const btnEdit = document.createElement('button')
            const btnDelete = document.createElement('button')
            const spanCategory = document.createElement('span')
            const spanType = document.createElement('span')
            const spanAmount = document.createElement('span')
            const spanInstallment = document.createElement('span')
            const spanDate = document.createElement('span')
            
            divTitle.classList.add('transactions-listed-title')
            btnEdit.innerText = 'Editar'
            btnEdit.classList.add('btn', 'btn-light')
            btnEdit.type = 'button'
            btnEdit.id = 'bt_transaction_edit'
            /*------------------- EVENT BUTTON ADD ----------------------*/
            btnEdit.addEventListener('click', e => {
                editTransaction(element)
            })

            btnDelete.innerText = 'Delete'
            btnDelete.classList.add('btn', 'btn-danger')
            btnDelete.type = 'button'
            btnDelete.id = 'bt_transaction_delete'
            /*------------------- EVENT BUTTON ADD ----------------------*/
            btnDelete.addEventListener('click', e => {
                deleteTransaction(element.id)
            })

            spanCategory.innerText = `Categoria : ${element.category.category_name}`

            spanType.innerText = `Tipo : ${element.type}`
            spanAmount.innerText = `Valor : ${element.amount}`
            spanInstallment.innerText = `Parcelas : ${element.installments}`
            spanDate.innerText = `Data : ${element.date}`
            
            /* insert in dom chields */
            divTitle.appendChild(spanCategory)
            divTitle.appendChild(btnEdit)
            divTitle.appendChild(btnDelete)
            div1.appendChild(spanType)
            div1.appendChild(spanAmount)
            div2.appendChild(spanInstallment)
            div2.appendChild(spanDate)

            li.appendChild(divTitle)
            li.appendChild(div1)
            li.appendChild(div2)
            ul.appendChild(li)
        });
    }
}