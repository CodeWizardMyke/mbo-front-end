$(document).ready( ()=>{
    startAppTransactionFromEvents();
});

function startAppTransactionFromEvents() {
    getCategoryList();
    formTransactionPost();
    setDateNow();
    $('#span_transactions_list ul li').click( show_tr_installments );
    $("#category_value").blur( writeInCategorySpan );
    $("#new_category").blur( writeInCreateCategorySpan );
    $("#amount").blur( writeInAmountSpan );
    $("#date").blur( selectdate );
};

async function getCategoryList(){
    const {promisse, response} = await getCategorys();
    handdlerTransaction( promisse, response, 'categorys' );
};

async function formTransactionPost(){
    $("#form-transaction").submit( async (evt) => {
        evt.preventDefault();
        const {promisse, response} = await postTransaction('#form-transaction');
        handdlerTransaction(promisse, response, 'transaction');
    });
};

function handdlerTransaction(promisse, response, when){
    const key = `${promisse.status}_${when}`
    switch (key) {
        case '200_categorys':
            populateSelectCategory(response);
                break;
        case '201_transaction':
            alert('Transação criada com sucesso!');
            window.location.reload();
                break;
        case '400_transaction':
            handdlerErrorsTransaction(response);
            break;
        default:
            break;
    }
};

function populateSelectCategory(response) {

    if(response.length > 0 ){
        insert_table_td();
        $("#span_list ul").empty();

        response.forEach(element => {
            let listItem = $(`<li>${element.category_name}<input type="text" value="${element.id}"></li>`);
            listItem.click(() => { clickHandler(element.category_name, element.id) });
            
            $("#span_list ul").append(listItem);
        });
        
        function clickHandler(category_name, id) {
            $("#category_id_select").empty();
            $("#category_id_select").append(`${category_name}`);
            $("#category_value").val(id);
        };
    };

    function insert_table_td() {  
        $("#category_listed").append(`
            <td>
                <span class="span_list" id="span_list">Categorias
                    <ul></ul>
                </span>
            </td>
            <td>
                <span id="category_id_select">Selecione uma categoria</span>
                <input type="text" id="category_value" name="category_id" value="">
            </td>
        `)
    };
};

function writeInCategorySpan(){
    const category_name = $("#category_value").val();
    $("#category_id_select").css('color','#fff');
    $("#category_id_select").empty();
    $("#category_id_select").append(category_name);
}
function writeInCreateCategorySpan(){
    const category_name = $("#new_category").val();
    $("#category_id_set").css('color','#fff');
    $("#category_id_set").empty();
    $("#category_id_set").append(category_name);
};
function writeInAmountSpan(){
    const amountValue = $("#amount").val();
    $("#amount_set").empty();
    $("#amount_set").css("color",'#fff');
    $("#amount_set").append(amountValue);
}

function show_tr_installments(){
    const selectedValue = $(this).find('input').val();
    const selectedText = $(this).text();
    $('#installments_line').empty()

    if(selectedValue == 'cartão'){
        tableInsertLine()
    }
    $('#type_set').css('color','#fff');

    $('#type_set').text(selectedText);
    $('#type_tr').val(selectedValue);
};

function tableInsertLine(){
    $('#installments_line').append(`
        <td>
            <label for="installments">Parcelas</label>
        </td>
        <td>
            <input type="number"min="1" max="128" name="installments" class="input-group-text" value="0">
        </td>
    `)
};

function setDateNow () {
    let dateNow = new Date().toISOString().split('T')[0];
    $("#data_set").empty();
    $("#date").val(dateNow);
    $("#data_set").append(dateNow);
};

function selectdate(){
    let value_date = $("#date").val();
    $("#data_set").empty();
    $("#data_set").append(value_date);
};

function handdlerErrorsTransaction(response) {

    response.map(element => {
        if(element.path === 'category_id'){
            writeErrorsInSpan(element, 'category_name' )
        }else{
            writeErrorsInSpan(element)
        }
    })
    
    function writeErrorsInSpan(element, html_id){
        if(html_id){
            $(`#${element.path}_select`).empty()
            $(`#${element.path}_select`).append(element.msg)
            $(`#${element.path}_select`).css('color','#D30C0C')
        }

        $(`#${element.path}_set`).empty()
        $(`#${element.path}_set`).append(element.msg)
        $(`#${element.path}_set`).css('color','#D30C0C')
    };
};
