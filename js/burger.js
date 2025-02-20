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

const historyContent = document.querySelector(".history-section")
const indexContent = document.querySelector(".index-content")
const btnSideBarHeader = document.querySelector(".btn-sidebar-header")
const btnSideBarClose = document.querySelector(".btn-sidebar-close");

function toggleSidebar(show) {
    historyContent.classList.toggle("sidebar-show", show);
    indexContent.style.marginLeft = "0";
    btnSideBarHeader.style.display = show ? "none" : "block";
    historyContent.style.left = show ? (window.innerWidth <= 600 ? "0" : "50px") : "-100%";
}

btnSideBarHeader.addEventListener("click", () => toggleSidebar(true));
btnSideBarClose.addEventListener("click", () => toggleSidebar(false));

window.addEventListener("resize", () => {
    if (window.innerWidth > 940) {
        indexContent.style.marginLeft = "200px";
        btnSideBarHeader.style.display = "none";
        historyContent.style.left = "50px"
    }
    else{
        indexContent.style.marginLeft = "0";
        btnSideBarHeader.style.display = "block";
        historyContent.style.left = "-100%";
    }
});