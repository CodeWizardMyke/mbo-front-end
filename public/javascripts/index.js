const urlBase =  'https://mbo-back-end.fly.dev'; //'http://localhost:1515'

const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

window.addEventListener('load', ()=> {
    //logout btn event
    $("#btn-logout").click( ()=> { userLogout() });

    user ? userLogedTrue() : userLogedFalse();

    $("#logo-page").click( ()=> {
        window.location.href ='/'
    })

    main_menu_show_hide ()
})

function userLogout () { 
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location = '/';
}

function userLogedTrue () { 
    $(".sub-menu").css('display','flex')
    $(".btn-singin").remove();
}
function userLogedFalse() { 
    $(".sub-menu").css('display','none')
}

document.addEventListener("DOMContentLoaded", function() {
    var minhaImagem = document.getElementById("boat-image");

    function animarImagem() {
      minhaImagem.style.top = "20px";

      setTimeout(function() {
        minhaImagem.style.top = "0";
      }, 1000);

      setTimeout(animarImagem, 2000);
    }

    minhaImagem ? setTimeout(animarImagem, 400) : '';
});

function main_menu_show_hide () {
    
    $(".div_icon_menu").on( 'mouseenter',   function (param) { 
        $(".inner_main_menu").css('display', 'flex')
        $(".div_icon_menu img").css('background-color','#fff')
    })

    $(".inner_main_menu").on( 'mouseleave',   function (param) { 
        $(".inner_main_menu").css('display', 'none')
        $(".div_icon_menu img").css('background-color','')
    })

    if(!user){  
        $(".hd-menu").css('display', 'flex')
    }else{
        $(".hd-menu").css('display', 'flex')
        $(".hide_show").addClass('div_hd_menu_hide')
    }

}