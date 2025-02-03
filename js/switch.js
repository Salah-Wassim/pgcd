const checkbox = document.querySelector('.switch-checkbox');
const inputFactor = document.querySelector('.input-factor');

checkbox.addEventListener('change', function(){
    checkbox.checked ? inputFactor.type = "text" : inputFactor.type = "hidden";
})