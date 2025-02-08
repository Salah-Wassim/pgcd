const btnNumbers = document.querySelector(".clear-button-numbers");
const btnFactors = document.querySelector(".clear-button-factors");
const checkboxSwitch = document.querySelector('.switch-checkbox');
const numbers = document.querySelector(".input-numbers");
const factors = document.querySelector(".input-factor")

btnNumbers.addEventListener("click", function(){
    numbers.value="";
    numbers.focus();
})

if(factors.type === "hidden"){
    btnFactors.classList.remove("clear-button")
    btnFactors.classList.add("active-factors")
}

checkboxSwitch.addEventListener('change', function(){
    if(checkboxSwitch.checked){
        btnFactors.classList.remove("active-factors")
        btnFactors.classList.add("clear-button")
    }
    else{
        btnFactors.classList.remove("clear-button")
        btnFactors.classList.add("active-factors")
    }
})

btnFactors.addEventListener("click", function(){
    factors.value="";
    factors.focus();
})