const url = `${urlBase}/category`

//**************// FUNCTION POST CATEGORY //**************//
document.querySelector('#form_category').addEventListener('submit', async (evt)  => {
    evt.preventDefault()
    const myForm = document.querySelector('#category_name');
    showLoader() 

    const opt = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Baerer ${token}`,
        },
        body: JSON.stringify({category_name:myForm.value})
    }

    const promisse = await fetch(url, opt);
    const response = await promisse.json();
    hideLoader()

    handdlerResquests(promisse, response, 'POST')
})

//**************// FUNCTION GET CATEGORY //**************//
document.querySelector('#btnManagerCategory').addEventListener('click', categoryGet)
async function categoryGet(){
    showLoader()
    const opt ={
        method:"GET",
        headers:{
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch(url, opt);
    const response = await promisse.json()
    hideLoader()
    handdlerResquests(promisse, response, 'GET')
}

//**************// FUNCTION EDIT CATEGORY //**************//
async function categoryEdit(element){
    console.log(element)
}

//**************// FUNCTION DELTE CATEGORY //**************//
async function categoryDelete(element){
    showLoader()
    const opt = {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Baerer ${token}`
        },
        body: JSON.stringify({id:element.id})
    }

    const promisse = await fetch(url, opt);
    const response = await promisse.json();

    hideLoader()
    handdlerResquests(promisse, response, 'DELETE')
}


function handdlerResquests(promisse, response, method){
    switch (promisse.status && method) {
        case 200 && 'GET' :
            updateList()
            listUserCategorys(response)
            break;
        case 201 && 'POST':
            hideElementDom('.div-category')
            break;
        case 201 && 'DELETE':
            updateList()
            categoryGet()
            break;
        default:
            alert(`Error inesperado cod: ${promisse.status}`)
            break;
    }
}


function listUserCategorys(response){
    const ul = document.querySelector('#category_list')
    if(response.length > 0){
        response.forEach(element => {
            const li = document.createElement('li');
            const input = document.createElement('input')
            const btnEdit = document.createElement('button')
            const btnDelet = document.createElement('button')

            input.value = element.category_name
            input.name= 'category_name'
            input.classList.add('input-group-text')

            btnDelet.classList.add('btn','border')
            btnEdit.classList.add('btn','border')
            btnDelet.innerText = 'Apagar'
            btnEdit.innerText = 'Editar'
            btnDelet.type = 'button'
            btnEdit.type = 'button'

            btnDelet.addEventListener('click', ()=> {
                categoryDelete(element);
            })
            btnEdit.addEventListener('click', () => {
                categoryEdit(element);
            })

            li.appendChild(input)
            li.appendChild(btnEdit)
            li.appendChild(btnDelet)
            ul.appendChild(li)
        });
    }
}

function updateList(){
    const ul = document.querySelector('#category_list')
    ul.innerHTML = ''
}