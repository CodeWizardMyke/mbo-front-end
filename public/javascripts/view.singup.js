window.addEventListener('load', () => {
    const urlBase = 'https://mbo-backend-app.fly.dev';

    const formSingIn = document.querySelector('#singup_user');

    formSingIn.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const formData = new FormData(formSingIn);

        // Converte os dados do formulário em um objeto JavaScript
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

        const promisse = await fetch(`${urlBase}/users`, opt);
        const response = await promisse.json();

        ErrorHanddler(response, promisse)
    });

    function ErrorHanddler(response, promisse){
        switch (promisse.status) {
            case 201:
                    SingupSuccessful(response)
                break;
            case 400:
                    SpanErrorUpdate()
                    SpanErrorAdd(response)
                break;
            case 500:
                console.log('erro no servidor cod 500')
                break;
            default:
                alert('error inesperado cod '+ promisse.status)
                break;
        }
    }

    function SingupSuccessful(response){
        window.location = '/'
    }

    function SpanErrorAdd(response){
        response.forEach(error => {
            let span = document.querySelector(`#${error.path}-up-error`)
            span.innerHTML = error.msg
            span.style = 'color:red;'
        })
    }
    function SpanErrorUpdate(){
        const spanCathc = document.querySelectorAll('#singup_user span')
        spanCathc.forEach(element => {
            element.innerHTML = ""
        });
    }
});
