const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('.input-form-contact');
const btnFormContactSubmit = document.querySelector('.btn-form-contact');
const messageInfo = document.querySelector(".message-info-form-contact");
const emailInput = document.querySelector(".input-form-contact-email");
const nameInput = document.querySelector(".input-form-contact-name");

btnFormContactSubmit.addEventListener('submit', function(e){
    e.preventDefault();
    let inputsFilled = false;

    inputs.forEach(input => {
        if(!input.checkValidity()){
            messageInfo.innerHTML = "Veuillez renseignez tous les champs";
            input.style.border = "1px solid red";
            inputsFilled = false;
        }
        else{
            messageInfo.innerHTML = "";
            input.style.border = "1px solid #000";
            inputsFilled = true;
        }
    })

    if(inputsFilled){
        let regexEmail = /^[\p{L}0-9._%+-]+@[\p{L}0-9.-]+\.[\p{L}]{2,}$/u
        if(!regexEmail.test(emailInput.value.trim())){
            messageInfo.innerHTML = "Le format est incorrecte";
            emailInput.style.border = "1px solid red";
        }
    
        let regexName = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
        if(regexName.test(nameInput.value.trim())){
            messageInfo.innerHTML = "Le format est incorrecte";
            nameInput.style.border = "1px solid red";
        }
    }
})