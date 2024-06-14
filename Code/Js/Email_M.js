document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const emailInput = document.getElementById('inputEmail');
    const nameInput = document.getElementById('inputName');
    const emailError = document.getElementById('emailError');

    function generateTemporaryPassword(length = 8) {
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomPassword = '';
        for (let i = 0; i < length; i++) {
            randomPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomPassword;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value;
        const name = nameInput.value;

        if (email.length < 5 || !email.includes('@')) {
            emailError.style.display = 'block';
            return;
        } else {

            emailError.style.display = 'none';
        }

        const temporaryPassword = generateTemporaryPassword();

        emailjs.send('service_7nxvsgj', 'template_ozi9obu', {
            to: email,
            user_name: name, 
            temporary_password: temporaryPassword,
        })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                window.location.href = 'registration_successful.html';
            }, function(error) {
                console.log('FAILED...', error);
                alert('Registration failed. Please try again.');
            });
    });
});
