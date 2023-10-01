const url = `${urlBase}/categorys`

window.addEventListener('load', ()=> { 
    getAllcategory()
})

const btn_get_all_transaction = document.querySelector('#bt_get_all_transactions')
btn_get_all_transaction.addEventListener('click', ()=> {
    getAllcategory()
})

async function getAllcategory(){
    const urlCategory = `${urlBase}/category`
    const opt = {
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer ${token}`
        }
    }

    const promisse = await fetch(urlCategory, opt)
    const response = await promisse.json();

    handdlerCategory( promisse, response )
}

function handdlerCategory(promisse, response){
    switch (promisse.status) {
        case 200:
            setCategoryDataInSelect(response)
            break;  
        default:
            break;
    }
}

function setCategoryDataInSelect(response){
 
        const div = document.querySelector('.box_list')
        div.innerHTML = ""
        const ul  = document.createElement('ul')
        ul.classList.add('list-items')
        response.forEach(element => {
            const li = document.createElement('li')
            const anchor = document.createElement('a')
            const div = document.createElement('div')
            const spanCategory = document.createElement('span')
    
            spanCategory.innerText = element.category_name
            anchor.href= `/profile/category/${element.id}`
    
            anchor.appendChild(div)
            div.appendChild(spanCategory)
            li.appendChild(anchor)
            ul.appendChild(li)
        })
        div.appendChild(ul)
}