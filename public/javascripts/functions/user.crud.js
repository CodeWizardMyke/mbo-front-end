const url_user = `${urlBase}/users`;

async function GetDataUser() { 
    const option = {
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Baerer ${token}`
        }
    };
    const promisse = await fetch(url_user, option);
    const response = await promisse.json();

    return {promisse, response};
};

async function PutUser( id_form ) {
    const elementHtml = document.querySelector(id_form);
    const formData = new FormData(elementHtml)

    const formDataObj = {};
    formData.forEach((value, key) => {
        if(value){
            formDataObj[key] = value;
        }
    });

    const opt = {
        method:"PUT",
        headers:{
            "Authorization": `Baere ${token}`,
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formDataObj)
    }

    const promisse = await fetch(url_user, opt)
    const response = await promisse.json()
    
    return { promisse, response }
}

async function DeleteUser(){
    const opt = {
        method:"DELETE",
        headers:{
            "Authorization":`Baerer ${token}`,
            "Content-type":"application/json"
        },
    } 

    const promisse = await fetch(url_user, opt);
    const response = await promisse.json();

    return { promisse, response }
}