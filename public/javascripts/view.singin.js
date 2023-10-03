window.addEventListener('load', () => {

    const formSingIn = document.querySelector('#singin_user');
    formSingIn.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const formData = new FormData(formSingIn);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formDataObj) 
        };

        const promisse = await fetch(`${urlBase}/user/login`, opt);
        const response = await promisse.json();

        ErrorHanddler(response, promisse)
    });

    function ErrorHanddler(response, promisse){
        switch (promisse.status) {
            case 200:
                    LoginSucessiful(response)
                    window.location = '/';
                break;
            case 400:
                    SpanErrorUpdate()
                    SpanErrorAdd(response)
                break;
            case 500:
                alert('erro no servidor cod 500')
                break;
            default:
                alert('error inesperado cod '+ promisse.status)
                break;
        }
    }

    function LoginSucessiful(response){
        const keepLoggedIn = document.querySelector('#keepLoggedIn')
        if(keepLoggedIn.checked){
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }else{
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));
        }
    }

    function SpanErrorAdd(response){
        response.forEach(error => {
            const span = document.querySelector(`#${error.path}-error`);
            span.innerHTML = error.msg;
            span.style = 'color:red;'
        })
    }
    function SpanErrorUpdate(){
        const spanCathc = document.querySelectorAll('#singin_user span')
        console.log(spanCathc)
        spanCathc.forEach(element => {
            element.innerHTML = ""
        });
    }
});
