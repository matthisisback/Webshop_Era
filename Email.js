document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const emailInput = document.getElementById('inputEmail');
    const emailError = document.getElementById('emailError');

    form.addEventListener('submit', function (event) {
        const emailValue = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regex pour valider l'email

        // Vérifie que l'email est valide et qu'il y a au moins 5 caractères avant le symbole @
        const isValidEmail = emailPattern.test(emailValue) && emailValue.split('@')[0].length >= 5;

        if (!isValidEmail) {
            emailInput.classList.add('is-invalid');
            emailError.style.display = 'block';
            event.preventDefault(); // Empêche l'envoi du formulaire
        } else {
            emailInput.classList.remove('is-invalid');
            emailError.style.display = 'none';
        }
    });
});
