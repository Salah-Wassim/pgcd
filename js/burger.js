const burger = document.querySelector(".btn-burger");
const menu = document.querySelector('.header-right-content');

burger.addEventListener("click", function(){
    menu.classList.toggle('show')
    if(menu.classList.contains('show')){
        burger.classList.remove("fa-bars");
        burger.classList.add("fa-xmark")
    }
    else{
        burger.classList.remove("fa-xmark");
        burger.classList.add("fa-bars")
    }
})