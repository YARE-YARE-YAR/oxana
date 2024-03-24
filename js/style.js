let currentMusic = 0;
const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const pLayBtn = document.querySelector('.play-btn')
const forwardBtn = document.querySelector ('.forward-btn')
const backwardBtn = document.querySelector ('.backward-btn')


pLayBtn.addEventListener('click',()=>{
    
    if(pLayBtn.className.includes('pause')){
        music.play()
    }else{
        music.pause()
    }
    pLayBtn.classList.toggle('pause')
    disk.classList.toggle('play')
})

const setMusic = (i) =>{
    seekBar.value = 0 
    let song = songs[i]
    currentMusic = i
    music.src = song.path

    songName.innerHTML = song.name  
    artistName.innerHTML = song.artist

    disk.style.backgroundImage = `url('${song.cover}')`
    currentTime.innerHTML = '00:00'
    setTimeout(()=>{
        seekBar.max = music.duration 
        musicDuration.innerHTML = normalTimeFormat(music.duration)
    },300)
}
setMusic(0)
const normalTimeFormat = (time) =>{
    let min = Math.floor(time / 60)
    if(min < 10){
        min = `0${min}`
    }
    let sec = Math.floor(time % 60)
    if(sec <10){
        sec = `0${sec}`
    }
    return `${min}:${sec}`
}

setInterval(() =>{
    seekBar.value = music.currentTime
    currentTime.innerHTML = normalTimeFormat(music.currentTime)
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        forwardBtn.click()
    }
},500)
seekBar.addEventListener('change', ()=>{
    music.currentTime = seekBar.value
})

const playMusic = () =>{
    music.play()
    pLayBtn.classList.remove('pause')
    disk.classList.add('play')
}

forwardBtn.addEventListener('click',()=>{
    if(currentMusic >= songs.length - 1){
        currentMusic = 0
    } else {
        currentMusic++
    }
    setMusic(currentMusic)
    playMusic()
})
backwardBtn.addEventListener('click',()=>{
    if(currentMusic <= 0){
        currentMusic = songs.length - 1
    } else {
        currentMusic--
    }
    setMusic(currentMusic)
    playMusic()
})


var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });


  function onEntry(entry){
    entry.forEach(change => {
        if(change.isIntersecting){
            change.target.classList.add('element-show')
        }
    })
  }
  let options = {
    threshold:[0.5] }
let observer = new IntersectionObserver(onEntry, options)
let elements = document.querySelectorAll('.animation')

for(let elm of elements){
    observer.observe(elm)
}

const burger = document.querySelector('.burger')
const navigation = document.querySelector('.navigation')
burger.addEventListener('click', myFunction)
function myFunction(){
    burger.classList.toggle('active')
    navigation.classList.toggle('active')

}
// const navigationPart = document.querySelectorAll('.navigation-part')
navigation.addEventListener('click',delActiveFunction)
function delActiveFunction(){
    burger.classList.remove('active')
    navigation.classList.remove('active')
}