const $ = document;
let audioElem = $.querySelector(".audioElem");
let currentTime = $.querySelector(".current-time");
let duration = $.querySelector(".end-time");
let title = $.querySelector(".song-name");
let singer = $.querySelector(".song-autor");
let playBtn = $.querySelector(".play");
let playIcon = $.querySelector(".play-icon");
let nextBtn = $.querySelector(".next");
let prevBtn = $.querySelector(".prev");
let cover = $.querySelector(".cover");
let playList = $.querySelector(".play-list");

const progressBar = $.querySelector("#timeline");
const playhead = $.querySelector("#playhead");

let musicSrc = [
    {
        src: "assets/musics/music1.mp3",
        title: "Look At Me Habibi",
        singer: "Rakhim Abramov",
        imgSrc: "assets/images/images.jpg",
        duration: "1:40",
        isPlaying: false

    },
    {
        src: "assets/musics/music3.mp3",
        title: "Headlights",
        singer: "Alan Walker",
        imgSrc: "assets/images/image3.jpg",
        duration: "2:38",
        isPlaying: false
    },
    {
        src: "assets/musics/music2.mp3",
        title: "Sugar & Brownies",
        singer: "DHARIA",
        imgSrc: "assets/images/image2.jpg",
        duration: "3:17",
        isPlaying: false
    },
    {
        src: "assets/musics/music4.mp3",
        title: "The Spectre",
        singer: "Alan Walker",
        imgSrc: "assets/images/image4.jpg",
        duration: "3:26",
        isPlaying: false
    },
]



musicSrc.forEach(function (music, index) {
    const track = document.createElement("div");
    track.className = "track";
    track.dataset.index = index;
    track.innerHTML = `
        <img class="track-img" src="${music.imgSrc}">
        <div class="track-discr">
            <span class="track-name">${music.title}</span>
            <span class="track-author">${music.singer}</span>
        </div>
        <span class="track-duration">${music.duration}</span>
    `;

    track.addEventListener("click", function () {
        const index = this.dataset.index;
        audioIndex = parseInt(index, 10);
        audioElem.setAttribute("src", musicSrc[audioIndex].src);
        playHandler();
    });

    playList.appendChild(track);
});

let audioIndex = 0;

function playHandler() {

    if (audioElem.paused) {
        audioElem.play();

        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        
    } else {
        audioElem.pause();

        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }

    duration.innerHTML = musicSrc[audioIndex].duration;
    cover.src = musicSrc[audioIndex].imgSrc;

    const tracks = document.querySelectorAll('.track');
    tracks.forEach(track => {
        track.classList.remove('current-audio');
    });

    // Add the "current-audio" class to the currently playing track
    const currentTrack = document.querySelector(`.track[data-index="${audioIndex}"]`);
    currentTrack.classList.add('current-audio');

    setInterval(function () {
        let currentMin = Math.floor(audioElem.currentTime / 60);
        let currentSecond = Math.floor(audioElem.currentTime - currentMin * 60);

        if (currentSecond < 10 && currentMin < 10) {
            currentMin = "0" + currentMin;
            currentSecond = "0" + currentSecond;
            currentTime.innerHTML = currentMin + ":" + currentSecond;
        } else if (currentMin < 10) {
            currentMin = "0" + currentMin;
            currentTime.innerHTML = currentMin + ":" + currentSecond;
        }
        else {
            currentTime.innerHTML = currentMin + ":" + currentSecond;
        }

        title.innerHTML = musicSrc[audioIndex].title;
        singer.innerHTML = musicSrc[audioIndex].singer;

    }, 1000)
}


function nextHandler() {
    audioIndex++;

    if (audioIndex > musicSrc.length - 1) {
        audioIndex = 0;
    }

    audioElem.setAttribute("src", musicSrc[audioIndex].src);
    playHandler();
}

function previousHandler() {
    audioIndex--;

    if (audioIndex < 0) {
        audioIndex = 2;
    }

    audioElem.setAttribute("src", musicSrc[audioIndex].src);
    playHandler();
}

function currentHandler(event) {
    const track = event.target.closest('.track');
    if (track) {
        const index = track.dataset.index;
        audioIndex = parseInt(index, 10);
        audioElem.setAttribute("src", musicSrc[audioIndex].src);
    }
    playHandler();
}


function updateProgressBar() {
    const duration = audioElem.duration;
    const currentTime = audioElem.currentTime;
    const progress = (currentTime / duration) * 100;
    playhead.style.width = progress + "%";
}

function seek(event) {
    const progressBarRect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - progressBarRect.left;
    const progressBarWidth = progressBarRect.width;
    const seekTime = (clickX / progressBarWidth) * audioElem.duration;
    audioElem.currentTime = seekTime;
}

playBtn.addEventListener("click", playHandler);
nextBtn.addEventListener("click", nextHandler);
prevBtn.addEventListener("click", previousHandler);
audioElem.addEventListener("timeupdate", updateProgressBar);
progressBar.addEventListener("click", seek);
