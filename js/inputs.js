const btnNumbers = document.querySelector(".clear-button-numbers");
const numbers = document.querySelector(".input-numbers");

btnNumbers.addEventListener("click", function(){
    numbers.value="";
    numbers.focus();
})