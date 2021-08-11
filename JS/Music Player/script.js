let allMusic = [
    {
        name: 'Real Love',
        artist: 'Justatee ft Kimmese',
        img: 'reallove.jpg',
        src: 'RealLove-JustaTee-Kimmese_3p3a9.mp3'
    },
    {
        name: 'Cheap Thrills',
        artist: 'Sia',
        img: 'cheapthrill.jpg',
        src: 'CheapThrills-Sia-5612594.mp3'
    },
    {
        name: '7 Rings',
        artist: 'Ariana Grande',
        img: '7rings.jfif',
        src: '7Rings-ArianaGrande-5880797.mp3'
    },
    {
        name: 'Under',
        artist: 'Alex Hepburn',
        img: 'under.jpg',
        src: 'Under-AlexHepburn-3004614.mp3'
    }
]

const wrapper = document.querySelector(".wrapper")
const musicImg = document.querySelector(".img-area img")
const musicName = document.querySelector(".song-detail .name")
const musicArtist = document.querySelector(".song-detail .artist")
const mainAudio = document.querySelector("#main-audio")
const playPauseMusic = document.querySelector(".play_pause")
const prevBtn = document.querySelector("#previous-music")
const nextBtn = document.querySelector("#next-music")
const progressBar = document.querySelector(".progress-bar")
const progressArea = document.querySelector('.progress-area')

let musicIndex = 1

window.addEventListener('load', () => {
    loadMusic(musicIndex)
})

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name
    musicImg.src = `img/${allMusic[indexNumb - 1].img}`
    musicArtist.innerText = allMusic[indexNumb - 1].artist
    mainAudio.src = `music/${allMusic[indexNumb - 1].src}`
}

function playMusic() {
    wrapper.classList.add('paused')
    playPauseMusic.querySelector('i').innerText = 'pause'
    mainAudio.play()
}

function pauseMusic() {
    wrapper.classList.remove('paused')
    playPauseMusic.querySelector('i').innerText = 'play_arrow'
    mainAudio.pause()
}

playPauseMusic.addEventListener('click', () => {
    const isMusicPaused = wrapper.classList.contains('paused')

    isMusicPaused ? pauseMusic() : playMusic()
})

nextBtn.addEventListener('click', () => {
    musicIndex++
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
})

prevBtn.addEventListener('click', () => {
    musicIndex--
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
})

mainAudio.addEventListener('timeupdate', (e) => {
    // consolelog('e', e)
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100

    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = document.querySelector('.timer .current')
    let musicDurationTime = document.querySelector('.timer .duration')

    mainAudio.addEventListener('loadeddata', () => {

        let audioDuration = mainAudio.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)

        totalSec < 10 ? musicDurationTime.innerText = `${totalMin}:0${totalSec}` : musicDurationTime.innerText = `${totalMin}:${totalSec}`
    })

    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)

    currentSec < 10? musicCurrentTime.innerText=`${currentMin}:0${currentSec}` : musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})

progressArea.addEventListener('click', (e)=>{
    let progressBarWidthVal = progressArea.clientWidth   /*Lay chieu dai cua progress bar*/
    let choosePoint = e.offsetX
    let songDuration = mainAudio.duration

    mainAudio.currentTime = (choosePoint/ progressBarWidthVal)* songDuration

    playMusic() /*Neu dang dung khi chon doan bat ki se chay tiep*/
})

const repeatBtn = document.querySelector('#repeat-music')

repeatBtn.addEventListener('click', () => {
    let getText = repeatBtn.innerText

    switch (getText){
        case 'repeat' :
            repeatBtn.innerText = 'repeat_one'
            break;
        case 'repeat_one' :
            repeatBtn.innerText = 'shuffle'
            break;
        case 'shuffle' :
            repeatBtn.innerText = 'repeat'
            break;
    }
})

mainAudio.addEventListener('ended', () => {
    let getText = repeatBtn.innerText

    switch (getText){
        case 'repeat' :
            musicIndex++
            musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
            loadMusic(musicIndex)
            playMusic()
            break;
        case 'repeat_one' :
            mainAudio.currentTime = 0
            loadMusic(musicIndex)
            playMusic()
            break;
        case 'shuffle':
            // alert('hello')
            let randIndex = Math.floor(Math.random()* allMusic.length + 1)
            do{
                randIndex = Math.floor(Math.random()* allMusic.length + 1)
            }while(musicIndex== randIndex)
            musicIndex = randIndex
            loadMusic(musicIndex)
            playMusic()
            break;
    }
})
