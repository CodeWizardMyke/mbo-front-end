window.addEventListener('load', async ()=> {
    const urlCategory = `${urlBase}/category`
    const opt = {
        method:"GET",
        headers:{
            "Authorization":`Baerer ${token}`
        }
    }
    
    const promisse = await fetch(urlCategory, opt);
    const response = await promisse.json();
    
    handdlerTransaction(promisse, response)
})


const myForm = document.querySelector('#form-transaction')
myForm.addEventListener('submit',async evt => {
    showLoader()
    evt.preventDefault()
    const urlTransaction = `${urlBase}/transactions`

    const formData = new FormData(myForm)
    const formDataObj = {};
    formData.forEach((value, key) => {
        if(key == 'date'){
           value = value.replace(/-/g, "/");
        }
        formDataObj[key] = value;
    });

    const opt = {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Baerer ${token}`
        },
        body:  JSON.stringify(formDataObj)
    }
    
   const promisse = await fetch(urlTransaction, opt);
   const response = await promisse.json()

   hideLoader()
    handdlerTransaction(promisse, response)
})


function handdlerTransaction(promisse, response){
    switch (promisse.status) {
        case 200:
            updateCategorySelect()
            populateSelectWhitCategory(response);
            break;
        case 201:
            hideElementDom('.box-form')
            break;
        case 400:
            arrayErrorsHanddler(response)
            break;
        default:
            break;
    }
}

function populateSelectWhitCategory(response) {
    const select = document.querySelector('#category_select_transaction')
    select.innerHTML=""

    const optionOffValue = document.createElement('option')
    optionOffValue.innerText = 'Selecione...'
    optionOffValue.value=''
    select.appendChild(optionOffValue)

    if(response.length >0){
        response.forEach(element => {
            const optionCreate = document.createElement('option');
            optionCreate.value = element.id
            optionCreate.innerText = element.category_name
            select.appendChild(optionCreate)
        });
    }
}

function updateCategorySelect(){
    const select = document.querySelector('#category_select_transaction')
    select.innerHTML = ''
}

function arrayErrorsHanddler(response){
    response.forEach(element => {
        const getElementDomByErrorName = document.querySelector(`#${element.path}-error`)
        getElementDomByErrorName.innerHTML = ""
        getElementDomByErrorName.innerText = element.msg
    });
}