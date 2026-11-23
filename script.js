
/* ==========================================
   LITTLE CORNER ♡
   Main JavaScript
   ========================================== */


/* ==========================================
   1. PASSWORD PAGE
   ========================================== */

// CUSTOMIZE PASSWORD & HINT HERE

const SECRET_PASSWORD = "04-02-2026";

const SECRET_HINT = "Ha, Cuba teka. kalau betui, hanan memang paduww";


// Check password
function checkPassword() {

    const input = document.getElementById("password");
    const message = document.getElementById("message");
    const card = document.getElementById("main-card");

    if (!input || !message || !card) return;

    const enteredPassword = input.value.trim();

    if (enteredPassword.toLowerCase() === SECRET_PASSWORD.toLowerCase()) {

        message.innerText = "Uyyo betui betui padu ni";

        setTimeout(() => {

            const passwordScreen =
                document.getElementById("password-screen");

            const successScreen =
                document.getElementById("success-screen");

            if (passwordScreen && successScreen) {

                passwordScreen.style.display = "none";
                successScreen.style.display = "block";

                createConfetti();

            }

        }, 500);

    } else {

        message.innerText =
            "Hmm... SALAH !! ";

        card.classList.remove("shake");

        void card.offsetWidth;

        card.classList.add("shake");

        input.value = "";
        input.focus();

    }

}


// Show / hide password
function togglePassword() {

    const input = document.getElementById("password");
    const button = document.getElementById("show-button");

    if (!input || !button) return;

    if (input.type === "password") {

        input.type = "text";
        button.innerText = "HIDE";

    } else {

        input.type = "password";
        button.innerText = "SHOW";

    }

}


// Show hint
function showHint() {

    const hint = document.getElementById("hint");

    if (!hint) return;

    if (hint.style.display === "block") {

        hint.style.display = "none";

    } else {

        hint.innerText = SECRET_HINT;
        hint.style.display = "block";

    }

}


// Restart password screen
function restartPage() {

    const successScreen =
        document.getElementById("success-screen");

    const passwordScreen =
        document.getElementById("password-screen");

    const input =
        document.getElementById("password");

    const message =
        document.getElementById("message");

    if (successScreen) successScreen.style.display = "none";

    if (passwordScreen) passwordScreen.style.display = "block";

    if (input) input.value = "";

    if (message) message.innerText = "";

}


/* ==========================================
   2. CONFETTI
   ========================================== */

function createConfetti() {

    const emojis = [
        "💗", "✨", "🌸", "⭐",
        "🎀", "🦋", "💌", "🌷"
    ];

    for (let i = 0; i < 45; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.innerText =
            emojis[Math.floor(Math.random() * emojis.length)];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.fontSize =
            (Math.random() * 20 + 12) + "px";

        confetti.style.animationDuration =
            (Math.random() * 2 + 2) + "s";

        confetti.style.animationDelay =
            Math.random() + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.remove();

        }, 5000);

    }

}


/* ==========================================
   3. GAME NAVIGATION
   ========================================== */

function scrollToGame(id) {

    const section = document.getElementById(id);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ==========================================
   4. FRIENDSHIP QUIZ
   ========================================== */

// EDIT YOUR QUESTIONS HERE

const quizQuestions = [

    {
        question: "What's my favourite colour?",
        answers: ["Pink", "Blue", "Purple", "Black"],
        correct: 0
    },

    {
        question: "What's my favourite food?",
        answers: ["Pizza", "Chicken", "Ice cream", "Sushi"],
        correct: 1
    },

    {
        question: "What do I usually do when I'm bored?",
        answers: ["Sleep", "Scroll my phone", "Eat", "Study"],
        correct: 1
    },

    {
        question: "Which describes me the best?",
        answers: ["Quiet", "Chaotic", "Sleepy", "All of the above"],
        correct: 3
    },

    {
        question: "What's my dream?",
        answers: ["Travel the world", "Be successful", "Be happy", "All of these"],
        correct: 3
    }

];


let currentQuestion = 0;
let quizScore = 0;
let quizPlaying = false;


// Start quiz
function startQuiz() {

    currentQuestion = 0;
    quizScore = 0;
    quizPlaying = true;

    const startButton =
        document.getElementById("quiz-start");

    if (startButton) {
        startButton.style.display = "none";
    }

    showQuestion();

}


// Display question
function showQuestion() {

    const questionElement =
        document.getElementById("question");

    const progressElement =
        document.getElementById("quiz-progress");

    const answersContainer =
        document.getElementById("answers");

    const feedback =
        document.getElementById("quiz-feedback");

    if (!questionElement ||
        !progressElement ||
        !answersContainer ||
        !feedback) return;


    const q = quizQuestions[currentQuestion];

    progressElement.innerText =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;

    questionElement.innerText = q.question;

    feedback.innerText = "";

    answersContainer.innerHTML = "";


    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.innerText = answer;

        button.onclick = () => checkAnswer(index, button);

        answersContainer.appendChild(button);

    });

}


// Check answer
function checkAnswer(index, button) {

    if (!quizPlaying) return;

    quizPlaying = false;

    const q = quizQuestions[currentQuestion];

    const allButtons =
        document.querySelectorAll(".answer-btn");

    allButtons.forEach(btn => {
        btn.disabled = true;
    });


    if (index === q.correct) {

        quizScore++;

        button.classList.add("correct");

        document.getElementById("quiz-feedback")
            .innerText = "OMG you know me so well! 💗";

    } else {

        button.classList.add("wrong");

        allButtons[q.correct].classList.add("correct");

        document.getElementById("quiz-feedback")
            .innerText = "Wronggg! But I'll forgive you hehe 🤭";

    }


    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {

            quizPlaying = true;

            showQuestion();

        } else {

            showQuizResult();

        }

    }, 1300);

}


// Quiz result
function showQuizResult() {

    const progress =
        document.getElementById("quiz-progress");

    const question =
        document.getElementById("question");

    const answers =
        document.getElementById("answers");

    const feedback =
        document.getElementById("quiz-feedback");

    const startButton =
        document.getElementById("quiz-start");


    if (!progress || !question || !answers ||
        !feedback || !startButton) return;


    progress.innerText = "Quiz completed!";

    question.innerText =
        `You got ${quizScore} out of ${quizQuestions.length}!`;

    answers.innerHTML = "";


    let resultMessage;

    if (quizScore === quizQuestions.length) {

        resultMessage =
            "PERFECT SCORE!! Are you secretly me? 🥹💗";

    } else if (quizScore >= 3) {

        resultMessage =
            "Pretty good! You know me quite well hehe ✨";

    } else {

        resultMessage =
            "It's okay... we need more lore sessions 😭💕";

    }


    feedback.innerText = resultMessage;

    startButton.innerText = "Play Again ↻";

    startButton.style.display = "inline-block";

}


/* ==========================================
   5. CATCH THE STAR GAME
   ========================================== */

let catchScore = 0;
let catchTime = 15;
let catchInterval = null;
let catchPlaying = false;


// Start game
function startCatchGame() {

    const star = document.getElementById("star");

    const startButton =
        document.getElementById("catch-start");

    const message =
        document.getElementById("catch-message");

    if (!star || !startButton) return;


    catchScore = 0;
    catchTime = 15;
    catchPlaying = true;


    document.getElementById("score").innerText = 0;

    document.getElementById("time").innerText = 15;

    if (message) message.innerText = "GO GO GO!! ⭐";

    startButton.style.display = "none";

    star.style.display = "block";


    moveStar();


    clearInterval(catchInterval);


    catchInterval = setInterval(() => {

        catchTime--;

        document.getElementById("time").innerText =
            catchTime;


        if (catchTime <= 0) {

            endCatchGame();

        }

    }, 1000);

}


// Move star
function moveStar() {

    const area = document.getElementById("catch-area");

    const star = document.getElementById("star");

    if (!area || !star) return;


    const maxX = area.clientWidth - 50;

    const maxY = area.clientHeight - 50;


    star.style.left =
        Math.random() * Math.max(maxX, 0) + "px";

    star.style.top =
        Math.random() * Math.max(maxY, 0) + "px";

}


// Catch star
function catchStar() {

    if (!catchPlaying) return;

    catchScore++;

    const scoreElement =
        document.getElementById("score");

    if (scoreElement) {
        scoreElement.innerText = catchScore;
    }

    moveStar();

}


// End game
function endCatchGame() {

    catchPlaying = false;

    clearInterval(catchInterval);


    const star =
        document.getElementById("star");

    const startButton =
        document.getElementById("catch-start");

    const message =
        document.getElementById("catch-message");


    if (star) star.style.display = "none";

    if (startButton) {

        startButton.style.display = "inline-block";

        startButton.innerText = "Play Again ↻";

    }


    let result;

    if (catchScore >= 15) {

        result = "WOW you're fast!! 🏆";

    } else if (catchScore >= 8) {

        result = "Pretty impressive!! ⭐";

    } else {

        result = "Cute try! Let's go again hehe 💗";

    }


    if (message) {

        message.innerText =
            `Time's up! You caught ${catchScore} stars! ${result}`;

    }

}


/* ==========================================
   6. THIS OR THAT
   ========================================== */

const choices = [

    ["Sunrise 🌅", "Sunset 🌇"],
    ["Ice cream 🍦", "Chocolate 🍫"],
    ["Beach 🏖️", "Mountains ⛰️"],
    ["Cats 🐱", "Dogs 🐶"],
    ["Call 📞", "Text 💬"],
    ["Stay home 🏠", "Go out 🌈"],
    ["Sweet 🍰", "Savoury 🍟"],
    ["Summer ☀️", "Rainy days 🌧️"],
    ["Movie 🎬", "Music 🎧"],
    ["Books 📚", "Games 🎮"],
    ["Sleep 😴", "Eat 🍜"],
    ["Pastel 🎀", "Dark colours 🖤"]

];


let choiceIndex = -1;


// Generate new question
function nextChoice() {

    let randomIndex;

    do {

        randomIndex =
            Math.floor(Math.random() * choices.length);

    } while (
        randomIndex === choiceIndex &&
        choices.length > 1
    );


    choiceIndex = randomIndex;


    const question =
        document.getElementById("choice-question");

    const option1 =
        document.getElementById("option1");

    const option2 =
        document.getElementById("option2");

    const feedback =
        document.getElementById("choice-feedback");


    if (!question || !option1 || !option2) return;


    question.innerText = "Which one would you choose?";

    option1.innerText = choices[choiceIndex][0];

    option2.innerText = choices[choiceIndex][1];

    if (feedback) feedback.innerText = "";

}


// Select choice
function chooseOption(option) {

    if (choiceIndex < 0) return;

    const selected =
        choices[choiceIndex][option - 1];

    const feedback =
        document.getElementById("choice-feedback");

    if (feedback) {

        feedback.innerText =
            `You chose ${selected}! Interesting choice hehe 💛`;

    }

}


/* ==========================================
   7. INITIALIZE PAGE
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {


    // Password page: enter key
    const passwordInput =
        document.getElementById("password");

    if (passwordInput) {

        passwordInput.addEventListener("keydown", function(event) {

            if (event.key === "Enter") {

                checkPassword();

            }

        });

    }


    // Games page: load first This or That question
    if (document.getElementById("choice-question")) {

        nextChoice();

    }


});
// ==============================
// WISHES PAGE
// ==============================

// Open letter
function openLetter() {

    const envelope = document.getElementById("envelope");

    if (!envelope) return;

    envelope.classList.add("opened");

    const instruction = document.getElementById("envelope-instruction");

    if (instruction) {
        instruction.textContent = "A little letter just for you ♡";
    }

    const closeButton = document.getElementById("close-letter-button");

    if (closeButton) {
        closeButton.style.display = "inline-block";
    }

}


// Close letter
function closeLetter() {

    const envelope = document.getElementById("envelope");

    if (!envelope) return;

    envelope.classList.remove("opened");

    const instruction = document.getElementById("envelope-instruction");

    if (instruction) {
        instruction.textContent = "Click the envelope to open your letter! 💌";
    }

    const closeButton = document.getElementById("close-letter-button");

    if (closeButton) {
        closeButton.style.display = "none";
    }

}


// Random wishes
const littleWishes = [

    "I hope something unexpectedly good happens to you today. 🌷",

    "May your days be filled with laughter that makes your stomach hurt. 💗",

    "I hope you always find reasons to keep going and things to look forward to. ⭐",

    "May you meet people who appreciate the little things about you. 🧸",

    "I hope your favourite songs always find you at the right moment. 🎧",

    "May you have more good days than bad ones. ☀️",

    "I hope you achieve things that once felt impossible. 🌈",

    "Remember that taking a break is okay too. You don't need to rush everything. ☁️",

    "May your future be filled with things that make you genuinely happy. 🌻",

    "I hope you laugh a little extra today. 🍀",

    "May you always feel appreciated for who you are. 🎀",

    "I hope life surprises you with beautiful things. 💌"

];


function generateWish() {

    const display = document.getElementById("random-wish-display");

    if (!display) return;

    const randomIndex = Math.floor(
        Math.random() * littleWishes.length
    );

    display.innerHTML = `
        <span class="wish-sparkle">✨</span>
        <p>${littleWishes[randomIndex]}</p>
        <span class="wish-sparkle">✨</span>
    `;

    display.classList.remove("wish-animate");

    void display.offsetWidth;

    display.classList.add("wish-animate");

}


// Flip wish cards
function flipWishCard(card) {

    card.classList.toggle("flipped");

}
// ==============================
// EXISTING VOICE NOTES PLAYER
// ==============================

const voiceNotes = [

    {
        file: "audio/voice1.mp3",
        title: "Voice Note #1",
        subtitle: "A little memory",
        description: "💌"
    },

    {
        file: "audio/voice2.mp3",
        title: "Voice Note #2",
        subtitle: "Something to remember",
        description: "🌷"
    },

    {
        file: "audio/voice3.mp3",
        title: "Voice Note #3",
        subtitle: "One more little moment",
        description: "⭐"
    }

];

let currentAudioIndex = 0;

let audioPlayer;


// Initialize audio player
document.addEventListener("DOMContentLoaded", function () {

    audioPlayer = document.getElementById("main-audio");

    if (!audioPlayer) return;

    loadAudio(0, false);

    audioPlayer.addEventListener("timeupdate", updateProgress);

    audioPlayer.addEventListener("loadedmetadata", updateDuration);

    audioPlayer.addEventListener("ended", function () {
        nextAudio();
    });

});


// Load audio
function loadAudio(index, autoplay = false) {

    if (!audioPlayer) return;

    currentAudioIndex = index;

    const note = voiceNotes[index];

    audioPlayer.src = note.file;

    document.getElementById("audio-title").textContent =
        note.title;

    document.getElementById("audio-subtitle").textContent =
        note.subtitle;

    document.getElementById("audio-progress").value = 0;

    document.getElementById("current-time").textContent = "0:00";

    document.getElementById("duration").textContent = "0:00";

    document.getElementById("play-button").textContent = "▶";

    document.getElementById("audio-status").textContent =
        "press play to listen ♡";

    updatePlaylist();

    if (autoplay) {
        audioPlayer.play()
            .then(() => {
                document.getElementById("play-button").textContent = "❚❚";
                document.getElementById("audio-status").textContent = "now playing ♡";
            })
            .catch(error => {
                console.log("Audio playback error:", error);
            });
    }

}


// Select audio from playlist
function selectAudio(index) {

    if (!audioPlayer) return;

    loadAudio(index, true);

}


// Play and pause
function toggleAudio() {

    if (!audioPlayer) return;

    if (audioPlayer.paused) {

        audioPlayer.play()
            .then(() => {

                document.getElementById("play-button").textContent = "❚❚";

                document.getElementById("audio-status").textContent =
                    "now playing ♡";

            })
            .catch(error => {

                console.log("Audio playback error:", error);

                document.getElementById("audio-status").textContent =
                    "please check your audio file 🎧";

            });

    }

    else {

        audioPlayer.pause();

        document.getElementById("play-button").textContent = "▶";

        document.getElementById("audio-status").textContent =
            "paused ♡";

    }

}


// Next audio
function nextAudio() {

    const nextIndex =
        (currentAudioIndex + 1) % voiceNotes.length;

    loadAudio(nextIndex, true);

}


// Previous audio
function previousAudio() {

    const previousIndex =
        (currentAudioIndex - 1 + voiceNotes.length)
        % voiceNotes.length;

    loadAudio(previousIndex, true);

}


// Update progress bar
function updateProgress() {

    if (!audioPlayer || !audioPlayer.duration) return;

    const progress =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    document.getElementById("audio-progress").value = progress;

    document.getElementById("current-time").textContent =
        formatAudioTime(audioPlayer.currentTime);

}


// Update duration
function updateDuration() {

    if (!audioPlayer) return;

    if (!isNaN(audioPlayer.duration)) {

        document.getElementById("duration").textContent =
            formatAudioTime(audioPlayer.duration);

    }

}


// Format time
function formatAudioTime(seconds) {

    if (!seconds || isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" +
        String(remainingSeconds).padStart(2, "0");

}


// Seek audio
document.addEventListener("DOMContentLoaded", function () {

    const progressBar = document.getElementById("audio-progress");

    if (!progressBar) return;

    progressBar.addEventListener("input", function () {

        if (audioPlayer && audioPlayer.duration) {

            audioPlayer.currentTime =
                (progressBar.value / 100) * audioPlayer.duration;

        }

    });

});


// Update active playlist item
function updatePlaylist() {

    const items = document.querySelectorAll(".playlist-item");

    items.forEach((item, index) => {

        item.classList.remove("active");

        if (index === currentAudioIndex) {

            item.classList.add("active");

        }

    });

}