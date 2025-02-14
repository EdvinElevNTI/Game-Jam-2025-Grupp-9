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

setInterval(function(){ // Function to read page position from site
    const header = document.getElementsByClassName("header")[0];
    const page = document.getElementsByClassName("page")[0];

    const style1 = header.style;
    const style2 = page.style;

    let distance = document.documentElement.scrollTop || document.body.scrollTop; // Position from top

    // this for header popping out
    if (distance > 5){ // 5 pixels under top
        style1.background = "#222f linear-gradient(#222f, #fff0)";
        style1.transition = "0.4s cubic-bezier(0.19, 1, 0.22, 1)"
    }

    else if (distance < 100){
        style1.background = "linear-gradient(#000a, #fff0)";
        style1.transition = "0.4s cubic-bezier(0.19, 1, 0.22, 1)"
    }

    // for dark effect; to mimic animation, but for position instead of time
    if (distance < 150){style2.background = "#22222208";}
    if (distance > 150 && distance < 155){style2.background = "#2221";}
    if (distance > 155 && distance < 160){style2.background = "#22222218";}
    if (distance > 160 && distance < 165){style2.background = "#22222";}
    if (distance > 165 && distance < 170){style2.background = "#22222228";}
    if (distance > 170 && distance < 175){style2.background = "#2223";}
    if (distance > 175 && distance < 180){style2.background = "#22222238";}
    if (distance > 180 && distance < 175){style2.background = "#2224";}
    if (distance > 185 && distance < 180){style2.background = "#22222248";}
    if (distance > 190 && distance < 185){style2.background = "#2225";}
    if (distance > 195 && distance < 190){style2.background = "#22222258";}
    if (distance > 200 && distance < 195){style2.background = "#2226";}
    if (distance > 205 && distance < 200){style2.background = "#22222268";}
    if (distance > 210){style2.background = "#2227";}

}, 200);

// Player image animation
document.addEventListener('DOMContentLoaded', (event) => {
    const playerImage = document.getElementById('playerImage');
    const images = [
        'player/p1.png', 
        'player/p2.png', 
        'player/p3.png', 
        'player/p4.png', 
        'player/p5.png', 
        'player/p6.png', 
        'player/p7.png', 
        'player/p8.png', 
        'player/p9.png', 
        'player/p10.png', 
        'player/p11.png', 
        'player/p12.png', 
        'player/p13.png', 
        'player/p14.png', 
        'player/p15.png', 
    ];
    let currentIndex = 0;

    function cycleImages() {
        currentIndex = (currentIndex + 1) % images.length;
        playerImage.src = images[currentIndex];
    }

    setInterval(cycleImages, 150); // Change image every 0.15s
});