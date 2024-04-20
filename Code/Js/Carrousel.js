document.querySelector('.fleche.gauche').addEventListener('click', function() {
    document.querySelector('.images').style.transform = 'translateX(-100%)';
});

document.querySelector('.fleche.droite').addEventListener('click', function() {
    document.querySelector('.images').style.transform = 'translateX(0)';
});
