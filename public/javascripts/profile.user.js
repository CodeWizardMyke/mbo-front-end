window.addEventListener('load', async () => {
    !user ? window.location.href = '/singin': ''

    //função para obter o mes atual e aplicar na view
    getMonth();

    const {promisse, response} = await getTransactions()

    handdlerPromisses(promisse, response);
})

let dataArray = []
function  handdlerPromisses(promisse, response) { 
    switch (promisse.status) {
        case 200:
            dataArray = response
            defineBalanceUser(response)
            break;
        case 401:
            console.log(`Erro: ${response.msg}, cod: ${promisse.status}`)
        default:
            console.log(`Error inesperado _cod:${promisse.status}`)
            break;
    }
}

function defineBalanceUser(response){
    let expense = 0
    let revenue = 0

    response.map(element => {
        if(element.type === 'despesa' || element.type === 'card'){
            expense += Number(element.amount);
        }else{
            revenue += Number(element.amount);
        }
    })

    //atribuindo o valor para receita a view
    $("#balance_revenue span").empty();
    $("#balance_revenue span").append(`R$ ${revenue}`);

    //atribuindo o valor de despesa a view
    $("#balance_expense span").empty();
    $("#balance_expense span").append(`R$ ${expense}`);
    
    //atribuindo o valor do saldo final a view
    let balance = revenue - expense;
    let clasName = balance >= 0 ? '' : 'negative';
    $("#last_balance div").empty()
    $("#last_balance div").append(`<span class="${clasName}"> R$ ${balance} </span>`)
}

$("#btn_show_expenses").click(e => { expensesSetInView(dataArray) })
function expensesSetInView(response){
    //action display button on - off
    buttonHanddlerDisplay()
    //clean ul list
    $("#expenses ul").empty()
    //verify is not exists expenses
    const key = response.length > 0 ? true : false ;

    if(key){
        response.map( element =>{
            if(element.type === 'despesa'){
                $("#expenses ul").append(`
                    <li>
                        <a href="/dashboard/transaction/${element.id}">
                            <span>${element.category.category_name}: R${element.amount}</span>
                            <span>Mensalidade</span>
                        </a>
                    </li>
                `)
            }
        })
    }else{
        $("#expenses ul").append(`
        <li>
            <a>
                <span>Nenhuma despesa cadastrada !</span>
            </a>
        </li>
    `)
    }

    function buttonHanddlerDisplay(){
        if( $("#expenses ul").css('display') === 'none'){
            $("#expenses ul").css('display','flex');
        }else{
            $("#expenses ul").css('display','none');
        }
    }

}

$('#btn-transaction').click( () => {
    let display = $(".box-form").css("display")
    if(  display === "" || display === 'none'){
        $(".box-form").show()
    }else{
        $(".box-form").hide()
    }
})

function getMonth(){
    function obterNomeMes(mes) {
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril','Maio', 'Junho', 'Julho', 'Agosto','Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        if (mes >= 1 && mes <= 12) {return meses[mes - 1];} else {return 'Mês inválido';}
    }
    const data = new Date(); 
    const mes = data.getMonth() + 1;

    $("#month_date").append(`<h3>Movimentações do mês</h3><span>de: ${obterNomeMes(mes)}.</span>`)
}