const urlTransaction = `${urlBase}/transactions`

function formDataTransformJson (id_form){
    const object = {};

    const formData = new FormData( document.querySelector(id_form) );
    formData.forEach( (value, key) => object[key] = value );

    return JSON.stringify(object);;
};

async function getTransactions(){
    const opt = {
        method :"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch(urlTransaction, opt);
    const response = await promisse.json()

    return [ promisse, response ]
}

async function postTransaction(id_form){
    const form = document.querySelector(id_form);

    const formData = new FormData(form)
    const object = {}

    formData.forEach( (value, key) => object[key] = value );

    const opt = {
        method : "POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        },
        body: JSON.stringify(object)
    }

    const promisse = await fetch(urlTransaction, opt);
    const response = await promisse.json();
    
    return [promisse, response ]
}

async function putTransaction( id_form, id_item ){
    const elementHtml = document.querySelector(id_form);

    const formData = new FormData(elementHtml)

    const formDataObj = {};
    formData.forEach((value, key) => {
        if(key == 'date'){
           value = value.replace(/-/g, "/");
        }
        if(value){
            formDataObj[key] = value;
        }
    });
    formDataObj.id = id

    const url = `${urlBase}/transactions/${id_item}`
    const opt = {
        method:"PUT",
        headers:{
            "Authorization": `Baere ${token}`,
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formDataObj)
    }

    const promisse = await fetch(url, opt)
    const response = await promisse.json()
    
    return [promisse, response ]
}

async function deleteTransaction( id_item ){

    const url = `${urlTransaction}/${id_item}`
    const opt = {
        method:"DELETE",
        headers:{
            "Authorization":`Baerer ${token}`,
            "Content-type":"application/json"
        },
    } 

    const promisse = await fetch(url, opt);
    const response = await promisse.json();

    return [ promisse, response ]
}

async function getTransactionById( id_item ){

    const opt = {
        merhod:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch( `${urlTransaction}/${id_item}`, opt );
    const response = await promisse.json();

    return [ promisse, response ]
}

async function getTransactionByType (value) {
    const url_transaction_byType = `${urlBase}/transactions/type/${value}`
    const opt = {
        method :"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        },
    }

    const promisse = await fetch(url_transaction_byType, opt);
    const response = await promisse.json();

    return [ promisse, response ]
}

async function getTransactionByCategory(value){
    console.log(value)
    const url_transaction_byCategory = `${urlBase}/transactions/category/${value}`
    const opt ={
        mehtod:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        },
    }
    const promisse = await fetch(url_transaction_byCategory, opt);
    const response = await promisse.json();

    return [ promisse, response ]
}