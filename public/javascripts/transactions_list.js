$(document).ready( async () => {
    //ao carregar a pagina me traga todas as transações do usuario
    getAllTransacitons();

    //ao clicar em pegar todas transações me retornar a lista completa
    $("#btn-all-transactions").click( ()=> { getAllTransacitons() } );
    
    //ao clicar em tipo de categoria a transação pertence me filtre e me traga o resultado
    $("#transaction-type").change( async () => {
            const value = $('#transaction-type').val();
            const {promisse, response} = await getTransactionByType(value);
            handdlerPromisses(promisse, response);
    });
});

async function getAllTransacitons() {
    const { promisse, response} = await getTransactions();
    handdlerPromisses(promisse, response);
    handdlerBalanceUser(response);
};

function insertDataInList(response) { 
    $(".list_items ul").empty();

    if(response.length > 0 ){
        response.map( element => {
            $(".list_items ul").append(`
            <li>
                <a href="/profile/transaction/${element.id}">
                    <div>
                        <span>${element.category.category_name}</span>
                        <span>${element.type}</span>
                    </div>
                    <span>R$: ${element.amount}</span>
                </a>
            </li>`) 
        });
    }else{
        $(".list_items ul").append(`
        <li>
            <a>
                <div>
                    <span>nenhuma transação encontrada!</span>
                    <span></span>
                </div>
                <span></span>
            </a>
        </li>`);
    };
};

function handdlerPromisses(promisse, response){
    switch (promisse.status) {
        case 200:
            insertDataInList(response);
            break;
        case 400:
            alert("Error pagina não encontrada!");
        case 500:
            alert("Erro no lado do servidor!");
        default:
            alert(`Erro inesperado cod:_${promisse.status}`);
            break;
    };
};

function handdlerBalanceUser(response){
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
        <span>Balanco das contas: R$ <span class="${clasName}">${balance}</span></span>
    `)
};