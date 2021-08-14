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

const musicImg = wrapper.querySelector(".img-area img")
const musicName = wrapper.querySelector(".song-detail .name")
const musicArtist = wrapper.querySelector(".song-detail .artist")

const mainAudio = wrapper.querySelector("#main-audio")
const playPauseMusic = wrapper.querySelector(".play_pause")
const prevBtn = wrapper.querySelector("#previous-music")
const nextBtn = wrapper.querySelector("#next-music")

const progressBar = wrapper.querySelector(".progress-bar")
const progressArea = wrapper.querySelector('.progress-area')

const listMusic = wrapper.querySelector('.music-list')
const showListMusicBtn = wrapper.querySelector('#list-music')
const hideListMusicBtn = wrapper.querySelector("#close")


let musicIndex = 1

window.addEventListener('load', () => {
    loadMusic(musicIndex)
    playingNow()
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

    currentSec < 10 ? musicCurrentTime.innerText = `${currentMin}:0${currentSec}` : musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})

progressArea.addEventListener('click', (e) => {
    let progressBarWidthVal = progressArea.clientWidth   /*Lay chieu dai cua progress bar*/
    let choosePoint = e.offsetX
    let songDuration = mainAudio.duration

    mainAudio.currentTime = (choosePoint / progressBarWidthVal) * songDuration

    playMusic() /*Neu dang dung khi chon doan bat ki se chay tiep*/
})

const repeatBtn = document.querySelector('#repeat-music')

repeatBtn.addEventListener('click', () => {
    let getText = repeatBtn.innerText

    switch (getText) {
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

    switch (getText) {
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
            let randIndex = Math.floor(Math.random() * allMusic.length + 1)
            //Không phát lại chính bài hát đó
            do {
                randIndex = Math.floor(Math.random() * allMusic.length + 1)
            } while (musicIndex == randIndex)
            musicIndex = randIndex
            loadMusic(musicIndex)
            playMusic()
            break;
    }
})

showListMusicBtn.addEventListener('click', () => {
    listMusic.classList.toggle('show')
})

hideListMusicBtn.addEventListener('click', () => {
    showListMusicBtn.click()
})

const ulTag = wrapper.querySelector('ul')

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `
    <li li-index="${i}">
      <div class="row">
        <span>${allMusic[i].name}</span>
          <p>${allMusic[i].artist}</p>
      </div>
      <audio class="music-${i}" src="music/${allMusic[i].src}"></audio>
      <span id="music-${i}" class="audio-duration"></span>
    </li>
    `
    ulTag.insertAdjacentHTML("beforeend", liTag)
    //Hien thoi gian cua audio
    let liAudioDuration= ulTag.querySelector(`#music-${i}`)
    //Lay thoi gian cua audio
    let liAudioTag= ulTag.querySelector(`.music-${i}`)

    liAudioTag.addEventListener('loadeddata', () => {
        let audioDuration = liAudioTag.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        totalSec < 10 ? liAudioDuration.setAttribute("t-duration", `${totalMin}:0${totalSec}`)  : liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`)
        totalSec < 10 ? liAudioDuration.innerText =`${totalMin}:0${totalSec}` : liAudioDuration.innerText =`${totalMin}:${totalSec}`
    })
}

const allLiTags= ulTag.querySelectorAll('li')

function playingNow(){
    for (let j=0; j< allLiTags.length; j++){
        let audioTag = allLiTags[j].querySelector('.audio-duration')

        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing")
            let addDuration = audioTag.getAttribute("t-duration")
            audioTag.innerText = addDuration
        }

        if(allLiTags[j].getAttribute("li-index") == (musicIndex-1)){
            allLiTags[j].classList.add('playing')
            audioTag.innerText = "playing"
        }

        allLiTags[j].setAttribute("onclick", "clicked(this)")
    }
}

function clicked(element){
    let getLiIndex = element.getAttribute('li-index')
    musicIndex = +getLiIndex+1 //+1 dung voi index
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}
