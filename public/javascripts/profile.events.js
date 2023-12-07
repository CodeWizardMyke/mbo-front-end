$(document).ready( ()=>{
    //pegar as categorias para serem usadas na criação de uma nova transação
    $('#btn-transaction').click( async () => {
        const {promisse, response} = await getCategorys()
        handdlerTransaction( promisse, response, 'categorys' )
    } );
    //postar nova transação no banco de dados
    $("#form-transaction").submit( async (evt) => {
        evt.preventDefault();
        const {promisse, response} = await postTransaction('#form-transaction');
        handdlerTransaction(promisse, response, 'transaction')
    })
})

function handdlerTransaction(promisse, response, when){
    const key = `${promisse.status}_${when}`
    switch (key) {
        case '200_categorys':
            populateSelectCategory(response);
            break;
        case '201_transaction':
            alert('Transação criada com sucesso!');
            $('.box-form').hide();
            break;
        default:
            break;
    }
}

function populateSelectCategory(response) {
    $("#categorys-t:not(:first)").remove()
    response.forEach(element => {
        $("#categorys-t").append(`<option value="${element.id}">${element.category_name}</option>`)
    });
}