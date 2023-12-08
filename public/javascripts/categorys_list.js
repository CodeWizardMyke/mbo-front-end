window.addEventListener('load', async () => { 
    const {promisse, response} = await getCategorys()
    handdlerCategory(promisse, response)
})

document.querySelector('#myForm').addEventListener('submit', async (evt)  => {
    evt.preventDefault()
    const {promisse, response} =  await postCategory(('#myForm'))
    handdlerCategory(promisse, response)
})

$('#show_post_form').click( () => {
    let display = $("#myForm").css("display")
    if(  display === "" || display === 'none'){
        $("#myForm").show()
    }else{
        $("#myForm").hide()
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