$(document).ready( ()=>{
    //pegar as categorias para serem usadas na criação de uma nova transação
    $(document).ready( async () => {
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
            window.location.reload()
            break;
        default:
            break;
    }
}

function populateSelectCategory(response) {
    if(response.length > 0){
        $("#category_listed").css('display', 'block')
    }else{
        $("#category_listed").css('display', 'none')
    }

    $("#span_list ul").empty();
    response.forEach(element => {
        let listItem = $(`
            <li>${element.category_name}<input type="text" value="${element.id}"></li>
        `);
        listItem.click(() => { clickHandler(element.category_name, element.id) });
        $("#span_list ul").append(listItem);
    });

    function clickHandler(category_name, id) {
        $("#category_name").empty();
        $("#category_name").append(`${category_name}`);
        $("#category_value").append(`${id}`);
    }
}


$('#span_transactions_list ul li').click(function() {
    const selectedValue = $(this).find('input').val();
    const selectedText = $(this).text();
    $('#installments_line').empty()

    if(selectedValue == 'cartão'){
        tableInsertLine()
    }

    $('#type_transaction').text(selectedText);
    $('#type_tr').val(selectedValue);
});

function tableInsertLine(){
    $('#installments_line').append(`
        <td>
            <label for="installments">Parcelas</label>
        </td>
        <td>
            <input type="number"min="1" max="128" name="installments" class="input-group-text" value="0">
        </td>
    `)
}

let dateNow = new Date().toISOString().split('T')[0]
$("#data_set").empty()
$("#date").val(dateNow)
$("#data_set").append(dateNow)

$("#date").blur( () => {
    let value_date = $("#date").val()
    $("#data_set").empty()
    $("#data_set").append(value_date)
})