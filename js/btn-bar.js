const btnBarPgcd = document.querySelector(".btn-pgcd-bar");
const btnBarPpcm = document.querySelector(".btn-ppcm-bar");
const pgcdInformations = document.querySelector(".pgcd-informations");
const ppcmInformations = document.querySelector(".ppcm-informations");

btnBarPgcd.style.background = "#fff";

btnBarPgcd.addEventListener('click', function(){
    pgcdInformations.classList.remove("hide-pgcd-informations");
    ppcmInformations.classList.add("hide-ppcm-informations");
    btnBarPpcm.style.background = "#f8f7fc";
    btnBarPgcd.style.background = "#fff";
})

btnBarPpcm.addEventListener('click', function(){
    pgcdInformations.classList.add("hide-pgcd-informations");
    ppcmInformations.classList.remove("hide-ppcm-informations");
    btnBarPgcd.style.background = "#f8f7fc";
    btnBarPpcm.style.background = "#fff";
})