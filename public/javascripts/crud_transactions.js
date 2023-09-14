/* IMPORTANT  - script file difined var => profile.user.js
    const token
    const user
*/

//button show and hide form transaction
function buttonActiveForm(){
    document.querySelector('#btn-transaction').addEventListener('click', e =>{
        const divTransactionOption = document.querySelector('.transaction-option')
        
        if(divTransactionOption.classList.contains('d-off')){
            divTransactionOption.classList.remove('d-off')
        }else{
            divTransactionOption.classList.add('d-off')
        }
    })
}

async function getAllTransactions (){
    const url = `${urlBase}/transactions`
    const opt = {
        method:'GET',
        headers:{
            "Authorization" : `Baerer ${token}`
        }
    };
    console.log(opt)

    const promisse = await fetch(url, opt);
    const response = await promisse.json();

    divExpenseGraphcs(response)
}

async function postNewTransaction(){
    const getFormHtml = document.querySelector('#transactionForm')
    const formData = new FormData(getFormHtml)

    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    const url = `${urlBase}/transactions`;
    const opt = {
        method:"POST",
        headers:{
            "Authorization": `Baerer ${token}`
        },
        body:JSON.stringify(formDataObj)
    }

    const promisse = await fetch(url, opt);
    const response = await promisse.json();

    console.log(response)
}

function startCrudTransactionsFunctions(){

    //auto start functions
    buttonActiveForm();
    getAllTransactions();

    //start by state in page or button active
    document.querySelector('#transactionForm').addEventListener('submit', e => {
        e.preventDefault();
        postNewTransaction();
    })

}startCrudTransactionsFunctions();

// functions to add the received data to page

function divExpenseGraphcs(response){
    const expense_ul = document.querySelector('.m-expense ul')
    expense_ul.innerHTML = "" //clear html and insert
    response.forEach(element => {
        const create_li = document.createElement('li');
        const span_name = document.createElement('span');
        const span_value = document.createElement('span');

        span_name.innerText = element.category.category_name;
        span_value.innerText = `R$ ${element.amount}`

        create_li.appendChild(span_name)
        create_li.appendChild(span_value)
        expense_ul.appendChild(create_li)
    });
}