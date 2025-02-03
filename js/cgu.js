const modalCgu = document.getElementById('id01-cgu');
const acceptBtn = document.querySelector('.agreebtn')

if(!localStorage.getItem('cgu-pgcd')){
    setTimeout(() => {
        modalCgu.style.display = "flex";
    }, 1500);
}

acceptBtn.addEventListener('click', function(){
	modalCgu.style.display = "none";
    if(modalCgu.style.display === "none" && !localStorage.getItem('cgu-pgcd')){
    	localStorage.setItem('cgu-pgcd', 'true');
    }
})