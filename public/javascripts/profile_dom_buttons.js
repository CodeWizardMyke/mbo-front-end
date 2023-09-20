function actionDisplayOn_ReActionDisplayOff(DomElement){
    
    if(DomElement.style.display == '' ){
        DomElement.style.display = 'block'
    }else{
        DomElement.style.display = ''
    }
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

}


const startBtnEvents = () => {
    showTransactionAdd(); 
};
startBtnEvents();