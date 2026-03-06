const form = document.getElementById("newsletter")


function limpar (){

    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.querySelectorAll('input[name="interests"]').forEach(cb => cb.checked = false);
    document.querySelector('input[name="promotions"]').checked = false;
    document.getElementById("terms").checked = false;

}


function sendEmail(informacion) {
    const serviceId = 'service_1a8nd1c';
    const templateId = 'template_34n6yz2';
    const apiKey = 'YZ_7OUFlFJdumdsOF';

    emailjs.init(apiKey); 

    emailjs.send(serviceId, templateId, {
        name: informacion.name,
        lastname: informacion.lastname,
        email: informacion.email,
        phone: informacion.phone,
        valores: informacion.valores.join(", "), 
        promotions: informacion.promotions
    })

    .then(() => {
    window.alert("gracias por contactarnos");
    limpar()
})
    .catch(err => console.error("Error al enviar:", err));
}


form.addEventListener("submit",(event) =>{
    event.preventDefault();
    //obtenemos los valores que ingrese el usuario
    const name = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    //obtenemos los elementos seleccionados 
    const marcados = document.querySelectorAll('input[name="interests"]:checked');
    const valores = [];
    marcados.forEach( cb => {
        valores.push(cb.value);
    });

    const terminos = document.getElementById("terms");
    const promotions = document.querySelector('input[name="promotions"]');

    if(terminos.checked){
        console.log("está marcado ")


        let informacion ={
        "name":name,
        "lastname":lastname,
        "email":email, 
        "phone":phone,
        "valores":valores,
        "promotions":promotions
        }
        
        try{
            sendEmail(informacion)

        } catch (e){

            console.log("error al enviar data")
        }


    }else{
        console.log("acepte terminos y condicionedes")
    }
});