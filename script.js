console.log("Welcome to my clone spotify");
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");

let songs = [
  { songName: "Kaise-Bataye-Kyun-Tujhko-Chahe", filePath: "song1.mp3", cover: "cover1.jpeg" },
  { songName: "Perfect", filePath: "song2.mp3", cover: "cover2.jpeg" },
  { songName: "Jekhane-Shimanto-Tomar", filePath: "song3.mp3", cover: "cover3.jpeg" },
  { songName: "Ma", filePath: "song4.mp3", cover: "cover4.jpeg" },
  { songName: "Ore-Nil-Doriya", filePath: "song5.mp3", cover: "cover5.jpeg" },
  { songName: "Kuch-To-Hua-Hai", filePath: "song6.mp3", cover: "cover6.jpeg" },
  { songName: "Safe & Sound", filePath: "song7.mp3", cover: "cover7.jpeg" },
  { songName: "I-Love-You-More-Than-I-Can-Say", filePath: "song8.mp3", cover: "cover8.jpeg" },
  { songName: "Zootopia-Try-Everything", filePath: "song9.mp3", cover: "cover9.jpeg" },
];

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-play-circle");
    e.target.classList.add("fa-pause-circle");
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    document.querySelector(".songInfo img").src = songs[songIndex].cover;
    document.querySelector(".songInfo span").textContent = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  });
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("input", () => {

  const seekTime = (myProgressBar.value * audioElement.duration) / 100;
  audioElement.currentTime = seekTime;
});



document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSongAtIndex(songIndex);
});

document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSongAtIndex(songIndex);
});

function playSongAtIndex(index) {
  if (index < 0 || index >= songs.length) {
    return;
  }

  makeAllPlays();
  let element = document.getElementById(index.toString());
  element.classList.remove("fa-play-circle");
  element.classList.add("fa-pause-circle");
  masterSongName.innerText = songs[index].songName;
  audioElement.src = songs[index].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;

  document.querySelector(".songInfo img").src = songs[index].cover;
  document.querySelector(".songInfo span").textContent = songs[index].songName;
}
