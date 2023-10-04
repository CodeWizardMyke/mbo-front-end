window.addEventListener('load', async () => { 
    const category_list = await getCategorys()
    handdlerCategory(category_list[0], category_list[1])
})

document.querySelector('#myForm').addEventListener('submit', async (evt)  => {
    evt.preventDefault()
    const post_category =  await postCategory(('#myForm'))
    handdlerCategory(post_category [0], post_category [1])
})

document.querySelector('#show_post_form').addEventListener('click', e => {
    const myFormPost = document.querySelector('#myForm')

    if(myFormPost.style.display == 'none'){
        myFormPost.style.display = 'block'
    }else{
        myFormPost.style.display = 'none'
    }
})

function handdlerCategory(promisse, response){
    switch (promisse.status) {
        case 200:
            setCategoryDataInSelect(response)
            break;
        case 201:
            alert('categoria criada com sucesso!')
            window.location.reload()
        default:
            console.log(`Erro inesperado cod: ${promisse.status}`)
            break;
    }
}

function setCategoryDataInSelect(response){
    const div = document.querySelector('.list_items')
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