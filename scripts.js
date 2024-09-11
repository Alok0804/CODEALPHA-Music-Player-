const songs = ["song1.mp3", "song2.mp3", "song3.mp3"]; // List of songs
let songIndex = 0;

const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const title = document.getElementById("title");
const progress = document.getElementById("progress");
const volumeControl = document.getElementById("volume");

function loadSong(song) {
    audio.src = song;
    title.textContent = song.replace(".mp3", ""); // Display song title without .mp3 extension
    console.log(`Loading song: ${song}`);
    
    audio.onerror = () => {
        console.error(`Error loading the song: ${song}`);
        alert(`Error loading the song: ${song}`);
    };
}

function playSong() {
    audio.play().catch(error => {
        console.error('Error trying to play audio:', error);
    });
    playButton.textContent = "Pause";
}

function pauseSong() {
    audio.pause();
    playButton.textContent = "Play";
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress() {
    const { currentTime, duration } = audio;
    progress.value = (currentTime / duration) * 100;
}

function setProgress() {
    const { duration } = audio;
    audio.currentTime = (progress.value * duration) / 100;
}

function setVolume() {
    audio.volume = volumeControl.value / 100;
}

// Event Listeners
playButton.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", setProgress);
volumeControl.addEventListener("input", setVolume);

// Load the first song initially
loadSong(songs[songIndex]);
