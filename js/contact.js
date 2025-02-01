window.onload = function() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        emailjs.sendForm('service_uhgn27n', 'contactForm', this)
            .then(() => {
                console.log('SUCCESS!');
                document.querySelector(".confirmation").textContent =
                    "Votre message a bien été envoyé !";
            }, (error) => {
                console.log('FAILED...', error);
                document.querySelector(".confirmation").textContent =
                    "Une erreur est survenue. Veuillez réessayer.";
            });
    });
}