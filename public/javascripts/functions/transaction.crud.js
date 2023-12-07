const urlTransaction = `${urlBase}/transactions`

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

    return {promisse, response}
}

async function postTransaction(id_form){
    const formData = new FormData(document.querySelector(id_form))
    const formDataObj = {};
    formData.forEach((value, key) => {
        if(key == 'date'){
           value = value.replace(/-/g, "/");
        }
        formDataObj[key] = value;
    });

    const opt = {
        method : "POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        },
        body: JSON.stringify(formDataObj)
    }
    const promisse = await fetch(urlTransaction, opt);
    const response = await promisse.json();
    
    return {promisse, response }
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
    
    return {promisse, response }
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

    return {promisse, response }
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

    return {promisse, response}
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

    return {promisse, response}
}
