let oldDataSingUp = {}; //Armazena dados do usuário para efetuar o login e redirecioná-lo após a criação de sua conta

$('#auth').submit( async (e) => {
    e.preventDefault();

    const email = $('#inEmail').val();
    email ? '' : alert('email invalido!');
    const pass = $('#inPass').val();
    pass ? '' : alert('senha invalida!');

    const body = {email:email, password:pass,};

   loginUser(body);
});

$('#singUp').submit( async (e) => {
    e.preventDefault()

    const fullname = $('#fullname').val();
    const email = $('#upEmail').val();
    const pass = $('#upPass').val();

    const body = {fullname:fullname, email:email, password:pass,};

    //Envie os dados de registro para realizar o login com base na resposta bem-sucedida na criação de um novo usuário
    oldDataSingUp = {email:email, password:pass};

    const options ={
        method:'POST',
        headers: {'Content-Type': 'application/json'},      
        cors:'no-cors',
        body: JSON.stringify(body),
    };

    const promisse = await fetch( `${urlBase}/users` ,options);
    const response = await promisse.json();

    handdlerPromisses(promisse, response, 'singUp');
});

const handdlerPromisses = (promisse, response, key) => {
    const k = `${key}:${promisse.status}`;

    switch (k) {
        case 'login:200':
            logionSucessful(response);
            break;
        case 'singUp:201':
            loginUser(oldDataSingUp);
            break;
        case 'login:400':
            loginErrosHanddler (response);
            break;
        case 'singUp:400':
            singUpErrosHanddler (response);
            break;
        default:
            console.log(`Error inesperado cod: ${promisse.status}`);
            break;
    };
};

async function loginUser (body) {
    const options ={
        method:'POST',
        headers: {'Content-Type': 'application/json'},      
        body: JSON.stringify(body),
    };
    const promisse = await fetch( `${urlBase}/user/login` ,options);
    const response = await promisse.json();

    handdlerPromisses(promisse, response, 'login');
};

function loginErrosHanddler (response) {
    response.map( element => {
        $(`#${element.path}-error`).empty()
        $(`#${element.path}-error`).append(`${element.msg  == "Cannot read properties of null (reading 'password')" ? '' : element.msg}`)
    })
};
function singUpErrosHanddler (response) {
    response.map( element => {
        $(`#${element.path}-up-error`).empty()
        $(`#${element.path}-up-error`).append(`${element.msg}`)
    })
};

function logionSucessful(response){
    const bt_auto_login = $("#authSinc").prop('checked');
    console.log(response.token)
    if(bt_auto_login){
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', JSON.stringify(response.token));
    }else{
        sessionStorage.setItem('user', JSON.stringify(response.user));
        sessionStorage.setItem('token', JSON.stringify(response.token));
    };
    window.location.href = '/dashboard';
};