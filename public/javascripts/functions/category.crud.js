const urlCategory = `${urlBase}/category`

function formDataTransformJson (id_form){
    const form = document.querySelector(id_form);
    const formData = new FormData(form);

    const object = {};
    formData.forEach( (value, key) => object[key] = value );
    const objectJson = JSON.stringify(object);

    return objectJson;
};

async function getCategorys(){
    const opt = {
        method :"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch(urlCategory, opt);
    const response = await promisse.json()

    return [promisse, response]
}

async function postCategory(id_form){
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

    const promisse = await fetch(urlCategory, opt);
    const response = await promisse.json();
    
    return [promisse, response]
}

async function putCategory( id_form, id_item ){
    const formData = formDataTransformJson(id_form)

    const opt = {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        },
        body: formData
    }

    const promisse = await fetch( `${urlCategory}/${id_item}`, opt );
    const response = await promisse.json();

    return [ promisse, response]
}

async function deleteCategory( id_item ){

    const url = `${urlBase}/category/${id_item}`
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

async function getCategoryById( id_item ){

    const opt = {
        merhod:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch( `${urlCategory}/${id_item}`, opt );
    const response = await promisse.json();

    return [ promisse, response]
}