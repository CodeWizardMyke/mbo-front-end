$("window").ready( async () => {
    const {promisse, response } = await GetDataUser()
    handdlerDataUser (promisse, response)
})

function startApplication (param) {
    $("#username").empty()
    $("#username").append(` <span>${param.fullname}</span> `)
    
    $("#config-email").on('click', ()=> {
        $(".content-c").show()

        displayForms ('email')

        $('.now_data').empty()
        $('.now_data').append(`<span>Email: </span> <span>${param.email}</span>`)
        
    })

    $("#config-pass").on('click', ()=> {
        $(".content-c").show()

        displayForms ('password')

        $('.now_data').empty()
        $('.now_data').append(`<span>Aleração de senha! </span>`)
        
    })

    $("#config-name").on('click', ()=> {
        $(".content-c").show()

        displayForms ('fullname')
        
        $('.now_data').append(`<span>Nome: </span> <span>${param.fullname}</span>`)
    })

    $('.btn_delete').on('click', (e)=>{
        $('#popupMessage').show()
        $('#btn_del_false').on('click', ()=> {
            $('#popupMessage').hide()
        })
        
        $("#btn_del_true").on('click', async () => {
            const {promisse, response} = await DeleteUser()

            if(promisse.status == '200'){
                localStorage.clear()
                sessionStorage.clear()

                window.location.href = '/'
            }
        })
    })

    function displayForms (formName) {
        $('.now_data').empty()
        
        if(formName == 'email'){
            $(`#form_email`).show();
            $(`#form_password`).hide();
            $(`#form_name`).hide();
        }
        if(formName == 'password'){
            $(`#form_password`).show();
            $(`#form_email`).hide();
            $(`#form_name`).hide();
        }
        if(formName == 'fullname'){
            $(`#form_name`).show();
            $(`#form_email`).hide();
            $(`#form_password`).hide();
        }
    }

    $("#my_form").on('submit', async (e)=> {
        e.preventDefault();

        const {promisse, response} =  await PutUser('#my_form');
        handdlerPutData(promisse, response);
    });
};


function handdlerDataUser (promisse, response) {
    switch (promisse.status) {
        case 200:
            startApplication(response);
        break;
    
        default:
            alert(`Error inesperado! ${promisse.status}`)
        break;
    }
}

function handdlerPutData (promisse, response) {
    switch (promisse.status) {
        case 200:
            alert('dados atualizados com sucesso!')
            window.location.reload()
        break;
        default:
            alert(`Error inesperado! ${promisse.status}`)
        break;
    }
}