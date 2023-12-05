const url =' https://mbo-backend-app.fly.dev'

$('#auth').submit( async (e) => {
    e.preventDefault()

    const email = $('#inEmail').val()
    email ? '' : alert('email invalido!')
    const pass = $('#inPass').val()
    pass ? '' : alert('senha invalida!')

    const body = {
        email:email,
        password:pass,
    }

    const options ={
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    };

    const promisse = await fetch( `${url}/user/login` ,options);
    const response = await promisse.json();
    
    handlerResponses(response, promisse, true)
})


$('#singUp').submit( async (e) => {
    e.preventDefault()

    const fullname = $('#fullname').val()
    fullname ? '' : alert('Nome de usuário invalido!')
    
    const email = $('#upEmail').val()
    email ? '' : alert('email invalido!')
    
    const pass = $('#upPass').val()
    pass ? '' : alert('senha invalida!')

    const body = {
        fullname:fullname,
        email:email,
        password:pass,
    }

    const options ={
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    };

    const promisse = await fetch( `${url}/users` ,options);
    const response = await promisse.json();
    
    handlerResponses(response, promisse, false)
})

function handlerResponses( response, promisse, key){
    switch (promisse.status) {
        case 200:
            userLogedTrue(response);
            break;
        case 201:
            userCreated(response);
            break;
        case 400:
            errosFind( response, key );
            break;
        case 500:
            alert('erro no servidor cod 500')
            break;
        default:
            alert('error inesperado cod '+ promisse.status)
        break;
    }
}
    
function userLogedTrue(response){
    const isChecked = $('#authSinc').is(':checked');
    
    isChecked ? checkTrue() : checkedFalse() ;
    
    function checkTrue () { 
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
    }

    function checkedFalse () {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
    }
    window.location = '/profile'
}

function userCreated (response) {
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('user', JSON.stringify(response.user));
    window.location = '/profile'
}

function errosFind(response, key){

    function SpanErrorAdd(response){
        let stringErr = ''
        key ? stringErr ='-error' : stringErr= '-up-error';

        response.forEach(error => {
            const span = document.querySelector(`#${error.path}${stringErr}`);
            span.innerHTML = error.msg.substring(0, 22);
            span.style = 'color:red;'
        })
    }SpanErrorAdd(response);

    function SpanErrorUpdate(){
        const spanCathc = document.querySelectorAll('#singin_user span')
        spanCathc.forEach(element => {
            element.innerHTML = ""
        });
    }SpanErrorUpdate();
}