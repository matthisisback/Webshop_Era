document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const emailInput = document.getElementById('inputEmail');
    const nameInput = document.getElementById('inputName');
    const emailError = document.getElementById('emailError');

    function generateTemporaryPassword(length = 8) {
        console.log('Début du password généré');
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomPassword = '';
        for (let i = 0; i < length; i++) {
            randomPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log('fin du password');
        console.log(randomPassword);
        return randomPassword;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const email = emailInput.value;
        const name = nameInput.value;

        // Validation simple de l'e-mail
        console.log('début validation email');
        if (email.length < 5 || !email.includes('@')) {
            emailError.style.display = 'block';
            console.log('Email valider');
            return;
        } else {
            console.log('email pas valider');
            emailError.style.display = 'none';
        }

        const temporaryPassword = generateTemporaryPassword();
        console.log('avant envoie email');
        console.log(email)
        console.log(name)
        console.log(temporaryPassword)
        emailjs.send('service_7nxvsgj', 'template_ozi9obu', {
            to: email, // Utilise 'to' pour spécifier l'e-mail du destinataire
            user_name: name, // Utilise directement la variable 'name'
            temporary_password: temporaryPassword,
        })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                console.log('succes plus go sur une autre page');
                alert('Registration success');
                window.location.href = 'registration_successful.html';
            }, function(error) {
                console.log('FAILED...', error);
                alert('Registration failed. Please try again.');
            });
    });
});
