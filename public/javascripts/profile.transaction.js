
async function shootGetCategory(){
    const get_categotys = await getCategorys()
    console.log(get_categotys)
    handdlerPromisses(get_categotys[0], get_categotys[1], 'GET_CATEGORYS')
}shootGetCategory()

document.querySelector('#form-transaction').addEventListener('submit', async evt => {
    showLoader()
    const post_transaction = await postTransaction('#form-transaction')
    handdlerPromisses(post_transaction[0], post_transaction[1], 'POST_TRANSACTION')
})

function handdlerPromisses(promisse, response, method){
    hideLoader()
    const key = `${promisse.status}_${method}`
    switch (key) {
        case '200_GET_CATEGORYS':
            updateCategorySelect()
            populateSelectWhitCategory(response);
            break;
        case '201_POST_TRANSACTION':
            hideElementDom('.box-form')
            shootGetCategory()
            break;
        case '400_POST_TRANSACTION':
            arrayErrorsHanddler(response)
            break;
        default:
            console.log(`Error inesperado cod: ${promisse.key}`)
            break;
    }
}

function populateSelectWhitCategory(response) {
    const select = document.querySelector('#category_select_transaction')
    select.innerHTML=""

    const optionOffValue = document.createElement('option')
    optionOffValue.innerText = 'Selecione...'
    optionOffValue.value=''
    select.appendChild(optionOffValue)

    if(response.length >0){
        response.forEach(element => {
            const optionCreate = document.createElement('option');
            optionCreate.value = element.id
            optionCreate.innerText = element.category_name
            select.appendChild(optionCreate)
        });
    }
}

function updateCategorySelect(){
    const select = document.querySelector('#category_select_transaction')
    select.innerHTML = ''
}

let oldArrError = [];
function arrayErrorsHanddler(response){
    const arrError = []
    response.forEach(element => {
        arrError.push(element.path)
        const getElementDomByErrorName = document.querySelector(`#${element.path}-error`)
        getElementDomByErrorName.innerHTML = ""
        getElementDomByErrorName.innerText = element.msg
    });

    if(!oldArrError.length){ oldArrError = arrError }

    if(oldArrError.length != arrError.length){
        const difference = oldArrError.filter( element => !arrError.includes(element))

        difference.forEach(element => document.querySelector(`#${element}-error`).innerHTML = "")
    }
}