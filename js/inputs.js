const btnNumbers = document.querySelector(".clear-button-numbers");
const btnFactors = document.querySelector(".clear-button-factors");
const checkboxSwitch = document.querySelector('.switch-checkbox');
const numbers = document.querySelector(".input-numbers");
const factors = document.querySelector(".input-factor")

btnNumbers.addEventListener("click", function(){
    numbers.value="";
    numbers.focus();
})

function toggleClass(btn, classToRemove, classToAdd){
    btn.classList.remove(classToRemove);
    btn.classList.add(classToAdd);
}

if(factors.type === "hidden"){
    toggleClass(btnFactors, "clear-button", "active-factors")
}

checkboxSwitch.addEventListener('change', function(){
    if(checkboxSwitch.checked){
        toggleClass(btnFactors, "active-factors", "clear-button")
    }
    else{
        toggleClass(btnFactors, "clear-button", "active-factors")
    }
})

btnFactors.addEventListener("click", function(){
    factors.value="";
    factors.focus();
})