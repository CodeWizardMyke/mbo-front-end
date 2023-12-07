window.addEventListener('load', async () => {
    !user ? window.location.href = '/singin': ''

    const elementMonth =document.querySelector('.month-date')
    elementMonth ? elementMonth.innerText = getMonth(): ''

    const {promisse, response} = await getTransactions()

    handdlerPromisses(promisse, response);
})

function  handdlerPromisses(promisse, response) { 
    switch (promisse.status) {
        case 200:
            insertDataTransactionsInDom(response)
            defineBalanceUser(response)
            break;
        default:
            alert(`Error inesperado _cod:${promisse.status}`)
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

    let balance = revenue - expense;
    let clasName = balance > 0 ? 'positive' : 'negative';

    $(".transactions-balance").empty()
    $(".transactions-balance").append(`
        <div>
            <span>Meu saldo</span>
            <h3 class='${clasName}' >R$: ${balance}</h3>
        </div>
    `)
}

function insertDataTransactionsInDom(response){
    response.map( element =>{
        if(element.type === 'despesa'){
            $(".m-expense ul").append(`
                <li>
                    <span>Conta: ${ element.category.category_name }</span>
                    <span class='negative' >Valor: R$ ${element.amount}</span>
                </li>
            `)
        }
    })
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
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril','Maio', 'Junho', 'Julho', 'Agosto','Setembro', 'Outubro', 'Novembro', 'Dezembro';
        if (mes >= 1 && mes <= 12) {return meses[mes - 1];} else {return 'Mês inválido';}
    }
    const data = new Date(); 
    const mes = data.getMonth() + 1;
    const nomeDoMes = obterNomeMes(mes);
    return nomeDoMes;
}