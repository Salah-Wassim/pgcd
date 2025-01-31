const cpBtn = document.querySelector(".copy");
const copyText = document.querySelectorAll(".cp");

cpBtn.addEventListener('click', function(){
    let textToCopy='';

    copyText.forEach(elements => {
        textToCopy += elements.textContent + "\n";
    })

    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log("Texte copié : " + textToCopy);
    }).catch(err => {
        console.error("Erreur lors de la copie", err);
    });
})