// =====================================
// ELEMENTS
// =====================================

const musicBtn = document.getElementById("musicBtn");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

const toggleMusicBtn = document.getElementById("toggleMusicBtn");

const volumeSlider = document.getElementById("volumeSlider");
const progressBar = document.getElementById("progressBar");

const trackSelect = document.getElementById("trackSelect");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const audio = document.getElementById("ambientAudio");


// =====================================
// VARIABLES
// =====================================

let isPlaying = false;
let isDragging = false;


// =====================================
// LOAD SAVED SETTINGS
// =====================================

const savedVolume = localStorage.getItem("ambientVolume");
const savedTrack = localStorage.getItem("ambientTrack");

if (savedVolume !== null) {
    volumeSlider.value = savedVolume;
    audio.volume = savedVolume;
}

if (savedTrack) {
    trackSelect.value = savedTrack;
    audio.src = savedTrack;
}

audio.loop = true;


// =====================================
// OPEN / CLOSE POPUP
// =====================================

musicBtn.addEventListener("click", () => {
    overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.classList.remove("active");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        overlay.classList.remove("active");
    }
});


// =====================================
// PLAY / PAUSE
// =====================================

toggleMusicBtn.addEventListener("click", () => {

    if (!isPlaying) {

        audio.play();

        isPlaying = true;

        toggleMusicBtn.innerHTML = "⏸ Pause";
        toggleMusicBtn.classList.remove("play");
        toggleMusicBtn.classList.add("pause");

    } else {

        audio.pause();

        isPlaying = false;

        toggleMusicBtn.innerHTML = "▶ Play";
        toggleMusicBtn.classList.remove("pause");
        toggleMusicBtn.classList.add("play");

    }

});


// =====================================
// CHANGE TRACK
// =====================================

trackSelect.addEventListener("change", () => {

    audio.src = trackSelect.value;

    localStorage.setItem(
        "ambientTrack",
        trackSelect.value
    );

    if (isPlaying) {
        audio.play();
    }

});


// =====================================
// VOLUME
// =====================================

volumeSlider.addEventListener("input", () => {

    audio.volume = volumeSlider.value;

    localStorage.setItem(
        "ambientVolume",
        volumeSlider.value
    );

});


// =====================================
// FORMAT TIME
// =====================================

function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;

}


// =====================================
// DURATION
// =====================================

audio.addEventListener("loadedmetadata", () => {

    duration.textContent = formatTime(audio.duration);

});


// =====================================
// UPDATE PROGRESS
// =====================================

audio.addEventListener("timeupdate", () => {

    if (!isDragging) {

        progressBar.value =
            (audio.currentTime / audio.duration) * 100 || 0;

    }

    currentTime.textContent =
        formatTime(audio.currentTime);

});


// =====================================
// DESKTOP DRAG
// =====================================

progressBar.addEventListener("mousedown", () => {

    isDragging = true;

});

document.addEventListener("mouseup", () => {

    if (isDragging) {

        audio.currentTime =
            (progressBar.value / 100) * audio.duration;

        isDragging = false;

    }

});


// =====================================
// MOBILE DRAG
// =====================================

progressBar.addEventListener("touchstart", () => {

    isDragging = true;

});

document.addEventListener("touchend", () => {

    if (isDragging) {

        audio.currentTime =
            (progressBar.value / 100) * audio.duration;

        isDragging = false;

    }

});


// =====================================
// LIVE DRAG
// =====================================

progressBar.addEventListener("input", () => {

    if (isDragging) {

        currentTime.textContent = formatTime(
            (progressBar.value / 100) * audio.duration
        );

    }

});


// =====================================
// RESET BUTTON IF MUSIC ENDS
// =====================================

audio.addEventListener("ended", () => {

    isPlaying = false;

    toggleMusicBtn.innerHTML = "▶ Play";

    toggleMusicBtn.classList.remove("pause");
    toggleMusicBtn.classList.add("play");

});


// =====================================
// MOBILE AUDIO INITIALIZATION
// =====================================

document.body.addEventListener(
    "click",
    () => {
        audio.load();
    },
    { once: true }
);



document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        overlay.classList.remove("active");

        musicBtn.blur();   // Remove focus

    }

});
