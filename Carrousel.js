document.addEventListener("DOMContentLoaded", function() {
    const images = ["img/Flopin.jpg", "img/Hao.jpg", "img/Udyr.jpg", "img/michel.jpg"];
    const carouselImage = document.getElementById('carouselImage');
    let currentIndex = 0;

    function showImage(index) {
        carouselImage.src = images[index];
    }

    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1;
        }
        showImage(currentIndex);
    }

    function nextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        showImage(currentIndex);
    }

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    showImage(currentIndex);
});
