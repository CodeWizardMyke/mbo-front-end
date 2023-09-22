function actionDisplayOn_ReActionDisplayOff(DomElement){
    
    if(DomElement.style.display == '' ){
        DomElement.style.display = 'block'
    }else{
        DomElement.style.display = ''
    }
}

function hideElementDom(idElement){
    const domElement = document.querySelector(idElement)
    actionDisplayOn_ReActionDisplayOff(domElement)

}

function showTransactionAdd (){

    const btn = document.querySelector('#btn-transaction')
    btn.addEventListener('click', () => {
        const box_form = document.querySelector('.box-form')
        actionDisplayOn_ReActionDisplayOff(box_form)
    })

    const btnShowNewCategoryForm = document.querySelector('#btn-category-add')
    btnShowNewCategoryForm.addEventListener('click', e => {
        const div_category = document.querySelector('.div-category')
        actionDisplayOn_ReActionDisplayOff(div_category)
    })

    const btnManagerCategory  = document.querySelector('#btnManagerCategory')
    btnManagerCategory.addEventListener('click', ()=> {
        const user_category_list = document.querySelector('.user_category')
        actionDisplayOn_ReActionDisplayOff(user_category_list)
    })

    const btn_form_transaction_show_form = document.querySelector('#transaction_show_form')
    btn_form_transaction_show_form.addEventListener('click', () => {
        const elementHTML = document.querySelector('#form-transaction')
        actionDisplayOn_ReActionDisplayOff(elementHTML)
    })
}

const startBtnEvents = () => {
    showTransactionAdd(); 
};
startBtnEvents();