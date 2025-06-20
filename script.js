console.log("Welcome to spotify");

//Intialize the variables
let songIndex = 0;
let audioElement = new Audio('songs1/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  { songName: "Apna Bana Le", filePath: "songs1/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Heeriye", filePath: "songs1/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Agar Tum Saath Ho", filePath: "songs1/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Tum Hi Ho", filePath: "songs1/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Shayad", filePath: "songs1/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Tujhe Kitna Chahne Lage", filePath: "songs2/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Pal Pal Dil Ke Pass", filePath: "songs2/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Ghungroo", filePath: "songs2/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Khairiyat", filePath: "songs2/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Nashe Si Chadh Gayi", filePath: "songs2/10.mp3", coverPath: "covers/10.jpg" },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("songItemPlay")[0].id = i; // ✅ assign index as ID
});

// Handle Play/Pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play icons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
};

// Individual song click
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src = songs[songIndex].filePath; // ✅ from correct folder
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});
