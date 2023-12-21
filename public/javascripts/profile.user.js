window.addEventListener('load', async () => {
    !user ? window.location.href = '/singin': ''

    //função para obter o mes atual e aplicar na view
    getMonth();

    const {promisse, response} = await getTransactions()

    handdlerPromisses(promisse, response);
    
})

//dataArray foi criada para receber os dados da promisse getTransaction
let dataArray = []

function  handdlerPromisses(promisse, response) { 
    switch (promisse.status) {
        case 200:
            //data array recebera os dados da promisse já executada
            dataArray = response
            response.length > 0 ? startAppDrawCharts(response) : '' ;
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
        if(element.type === 'despesa' || element.type === 'cartão'){
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

//aqui sera passado como parametro os dados salvos da promisse getTransaction para serem reutilizados
$("#btn_show_expenses").click(e => { expensesSetInView(dataArray) })

function expensesSetInView(response){
    let display = $("#expenses ul").css('display');
    display === 'none' ? display = 'flex' : display = 'none';
    $("#expenses ul").css({'display': display});
    
    $("#expenses ul").empty()

    let expensesExists = false;

    response.map( element =>{
        writeInDomAllExpenses(element)
    });

    if(expensesExists == false){
        $("#expenses ul").css({'display': display, 'justify-content':'center'});
        $("#expenses ul").append(`
        <li>
            <a>
                <span>Nenhuma despesa cadastrada !</span>
            </a>
        </li>
        `)
    }

    function writeInDomAllExpenses(element){
        if(element.type === 'despesa' || element.type === 'cartão'){
            expensesExists = true
            $("#expenses ul").append(`
                <li>
                    <a href="/dashboard/transaction/${element.id}">
                        <span>${element.category.category_name}: R${element.amount}</span>
                        <span>Mensalidade</span>
                    </a>
                </li>
            `)
        }
    }
}


$('#btn-transaction').click( () => {
    let display = $(".box-form").css("display")

    if(  display === 'none'){
        $(".box-form").css("display","block")
    }else{
        $(".box-form").css("display","none")
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


function startAppDrawCharts(data) { 
    $(".chart-google").show()
    let transactions = [['transações', 'valor']]
    let expensesVal = 0
    data.map(element => {
        let itemName = ''
        
        if(element.type === 'despesa' || element.type === 'cartão'){
            itemName = `Despesa: ${element.category.category_name}`
            expensesVal += Number(element.amount)
        }else{
            itemName = `Receita: ${element.category.category_name}`
        }
        
        let item = [itemName, Number(element.amount)]
        
        transactions.push(item)
        
    })
    writeListTransactions(transactions, expensesVal)

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = google.visualization.arrayToDataTable(transactions);

      var options = {
        title: 'Minhas Movitementações'
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      chart.draw(data, options);
    }
}

function writeListTransactions(array, valExpenses){
    $("#g_list").empty()
    array.map( element => {
        $("#g_list").append(`
        <li>
        <span> ${element[0]}</span>
        <span> valor: R$ ${element[1]}</span>
        </li>
        `)
    })

    $("#t_expenses").append(`Valor total das desepsas: R$ ${valExpenses}`)
}