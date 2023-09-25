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
}

const startBtnEvents = () => {
    showTransactionAdd(); 
};
startBtnEvents();