console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
document.querySelector('.masterSongName').innerText = "Kaun Faya Kaun";
document.querySelector('#khalchiIMG').src = 'covers/1.jpg';

// console.log(audioElement.currentTime);
let masterPlay = document.getElementById('masterPlay');
let myProgressionBar = document.getElementById('myProgressionBar');
let gif = document.getElementById('gif');
let Previous = document.getElementById('Previous');
let next = document.getElementById('next');
let songsItems = Array.from(document.getElementsByClassName('songItem'));
let SongTimes = document.querySelector('.songDuration');

let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));


let songs = [
    {songName : "Kaun Faya Kaun",   filePath : 'songs/1.mp3',  coverPath : "covers/1.jpg"},
    {songName : "Saibo",            filePath : 'songs/2.mp3',  coverPath : "covers/2.jpg"},
    {songName : "Subha Hone Na De", filePath : 'songs/3.mp3',  coverPath : "covers/3.jpg"},
    {songName : "Tum Sath Ho",      filePath : 'songs/4.mp3',  coverPath : "covers/4.jpg"},
    {songName : "Tum Se Hi",        filePath : 'songs/5.mp3',  coverPath : "covers/5.jpg"},
    {songName : "Main Ager Kahoon", filePath : 'songs/6.mp3',  coverPath : "covers/6.jpg"},
    {songName : "Ajab si",          filePath : 'songs/7.mp3',  coverPath : "covers/7.jpg"},
    {songName : "Jashn E Bahaara",  filePath : 'songs/8.mp3',  coverPath : "covers/8.jpg"},
    {songName : "Balam Pichkari",   filePath : 'songs/9.mp3',  coverPath : "covers/9.jpg"},
    {songName : "Badtameez Dil",    filePath : 'songs/10.mp3', coverPath : "covers/10.jpg"},
]

// give a duration to list

let sound_paths = [];
for(let i = 0; i < songs.length; i++){
    sound_paths[i] = songs[i].filePath;
}
// console.log(sound_paths);

let str;
sound_paths.forEach((src, i) => {
    const audio = new Audio();
    audio.addEventListener("loadeddata", ()=>{
        let minutes = ~~(audio.duration / 60);
        let seconds = ~~(audio.duration % 60);
        str = minutes + ':' + seconds;
        let timestamp = songsItems[i].querySelector('.timestamp');
        // duration of music
        timestamp.innerText = str;
        // console.log(strrrr);
        SongTimes.innerText = str;
        // console.log(timestamp.innerText);
    });
    // console.log(str);
    audio.src = src;
});

// name and image
songsItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    
})
// handling the play / pause (click)
masterPlay.addEventListener('click', () =>{
    // 1 if audio is not played or not started yet
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

// listen to events
audioElement.addEventListener('timeupdate', () =>{
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressionBar.value = progress;
})

myProgressionBar.addEventListener('change', () =>{
    audioElement.currentTime = ((myProgressionBar.value * audioElement.duration) / 100);
})

const makeAllPlays = () =>{
    songItemPlay.forEach((element) =>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        console.log(e.target.id);
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        // console.log(e.target.classList);
        // console.log('songs/${songIndex}.mp3');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.play();
        gif.style.opacity = 1;
        document.querySelector('.masterSongName').innerText = songs[songIndex].songName;
        document.querySelector('#khalchiIMG').src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

Previous.addEventListener('click', () =>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;
    document.querySelector('.masterSongName').innerText = songs[songIndex].songName;
    document.querySelector('#khalchiIMG').src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

next.addEventListener('click', () => {
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;
    document.querySelector('.masterSongName').innerText = songs[songIndex].songName;
    document.querySelector('#khalchiIMG').src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})