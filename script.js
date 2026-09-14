// ===============================
// PAGE NAVIGATION
// ===============================

const pages = document.querySelectorAll(".page");

// Page pertama
document.getElementById("opening").classList.add("active");


// ===============================
// OPEN LETTER + MUSIC
// ===============================

function openLetter() {

    // Tukar ke letter
    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("letter").classList.add("active");

    // Scroll ke atas
    window.scrollTo(0, 0);


    // Play music
    const music = document.getElementById("birthdaySong");

    if (music) {

        music.play().catch(error => {

            console.log(
                "Music could not play:",
                error
            );

        });

    }
}