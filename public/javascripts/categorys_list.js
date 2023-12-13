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
    $(".list_items ul").empty();
    
    if(response.length > 0){
        response.map(element => {
            $(".list_items ul").append(`
                <li>
                    <a href="/dashboard/category/${element.id}">
                        <div><span>${element.category_name}</span></div>
                    </a>
                </li>
            `)
        });
    }else{
        $(".list_items ul").empty();
        $(".list_items ul").append(`
                <li>
                    <a href="#">
                        <div><span>Nenhuma categoria encontrada!</span></div>
                    </a>
                </li>
            `)
    }
}