
async function getTransactionItem (){

    const arrayString = window.location.pathname.split('/')
    const id = arrayString [arrayString.length -1]

    url = `${urlBase}/transactions/${id}`
    const opt = {
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Baerer ${token}`,
        },
    }

    const promisse = await fetch(url, opt)
    const response = await promisse.json()
    
    console.log(response)
}
getTransactionItem()