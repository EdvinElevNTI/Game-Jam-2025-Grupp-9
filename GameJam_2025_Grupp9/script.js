function hideIntro() {
    const intro_image = document.querySelector('.intro_image');
    const intro_text = document.querySelector('.intro_text');
    const title_half1 = document.querySelector('.title_half1');
    const title_half2 = document.querySelector('.title_half2');
    const main_content = document.querySelector('.main_content');

    if (intro_image) {
        // Add the fade-out class to trigger the animation
        intro_image.classList.add('fade-out');
        intro_text.style.display = 'none';
        main_content.classList.remove('d-none');

        // Remove the element after the animation completes
        intro_image.addEventListener('animationend', () => {
            intro_image.style.display = 'none';
        });

        if (intro_text) {
            intro_text.style.display = 'none';
        }
        // Add animation classes for the titles
        title_half1.classList.add('slide-in-left');
        title_half2.classList.add('slide-in-right');
    }
}

window.addEventListener('scroll', () => {
    const arrow_image = document.querySelector('.arrow_image');
    if (arrow_image && !arrow_image.classList.contains('arrow_fade-out')) {
        // Add the fade-out class to trigger the fade-out animation
        arrow_image.classList.add('arrow_fade-out');

        // Remove the element after the fade-out animation completes
        arrow_image.addEventListener('animationend', () => {
            arrow_image.classList.add('d-none');
        });
    }
});