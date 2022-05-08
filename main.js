const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playList = $('.music__playlist')
const iconPlayList = $('.icon-playlist')
const heading = $('.dashboard__header h2')
const audio = $('#audio')
const playBtn =  $('.btn__toggle-play')
const cdThumb = $('.cd__thumb')
const dashBoard = $('.dashboard')
const pauseBtn = $('.btn__toggle-play .icon-pause')
const progess = $('#progess')
const timeStart = $('.time__start')
const timeEnd = $('.time__end')
const quitBtn = $('.load__playlist .load__heading .icon-quit')
const playlistBtn = $('.btn__playlist')
const loadPlaylist = $('.load__playlist')
const nextBtn = $('.btn__next')
const prevBtn = $('.btn__prev')
const randomBtn = $('.btn__random')
const volumeBtn = $('.volume__icon .icon-volume')
const volumeBar = $('.volume__bar')
const volumeProgess = $('#volume')
const muteVolume = $('.volume .icon-mute')


const app = {
    currentIndex: 0,
    isHiden: true,
    isPlaying: false,
    isRandom: false,
    isReapeat: false,
    isVolume: false,
    songs: [
        {
            name: 'Ngày Đầu Tiên',
            singer:'Đức Phúc',
            path:'./assets/music/song1.mp3',
            image: './assets/img/img9.jpg',
        },
        {
            name: 'Nevada',
            singer:'Vicetone',
            path:'./assets/music/song2.mp3',
            image: './assets/img/img2.jpg',

        },
        {
            name: 'Muốn Em Là',
            singer:'Keyo',
            path:'./assets/music/song3.mp3',
            image: './assets/img/img1.jpg',

        },
        {
            name: 'Như Ngày Hôm Qua',
            singer:'Sơn Tùng MTP',
            path:'./assets/music/song4.mp3',
            image: './assets/img/img10.jpg',

        },
        {
            name: 'Cưới Thôi',
            singer:'Masew',
            path:'./assets/music/song6.mp3',
            image: './assets/img/img6.jpg',
        }
        ,
        {
            name: 'Lemon Tree',
            singer:'Fools Garden',
            path:'./assets/music/song5.mp3',
            image: './assets/img/img4.jpg',

        },
        {
            name: 'The Nigths',
            singer:'Avici',
            path:'./assets/music/song7.mp3',
            image: './assets/img/img7.jpg',

        },
        {
            name: 'Wake Me Up',
            singer:'Avici',
            path:'./assets/music/song8.mp3',
            image: './assets/img/img8.jpg',
        },
        {
            name: 'Đế Vương',
            singer:'Đinh Dũng, AVC',
            path:'./assets/music/song9.mp3',
            image: './assets/img/img11.jpg',
        }
        ,
        {
            name: 'Đám Cưới Nha',
            singer:'Hồng Thanh, DJ Mie',
            path:'./assets/music/song10.mp3',
            image: './assets/img/img12.jpg',
        },
        {
            name: 'Cầu Vòng Khuyết',
            singer:'Tuấn Hưng',
            path:'./assets/music/song11.mp3',
            image: './assets/img/img13.jpg',
        },
        {
            name: 'Thanh Xuân',
            singer:'Da LAB',
            path:'./assets/music/song12.mp3',
            image: './assets/img/img14.jpg',
        },
        {
            name: 'Sài Gòn Hôm Nay Mưa',
            singer:'JSOL, Hoàng Duyên',
            path:'./assets/music/song13.mp3',
            image: './assets/img/img15.jpg',
        }
        
        
        
        
        
        
        
    ],

    // Render ra danh sách bài hát
    render: function(){
        const htmls = this.songs.map((song,index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                <div class="thumb" style="background-image: url('${song.image}');">
    
                </div>
                <div class="body">
                    <div class="title">
                        ${song.name}
                    </div>
                    <div class="singer">
                        ${song.singer}
                    </div>
                </div>
            </div>
            `
        })
        playList.innerHTML = htmls.join('')
    },

    // Khởi tạo phương thức lấy bài hát đầu tiên
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    // Hàm xử lý các sự kiện của app
    handleFunction: function(){

        // Xử lý quay CD
        const cdThumbAnimation = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimation.pause()

        // Khi click nút play
        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }

            // Xử lý cd quay khi play nhạc
            
            audio.onplay = function(){
                app.isPlaying = true
                dashBoard.classList.add('playing')
                cdThumbAnimation.play()
            }

            // Khi bài hát pause
            audio.onpause = function(){
                app.isPlaying = false
                dashBoard.classList.remove('playing')
                cdThumbAnimation.pause()
            }

            // Xử lý thanh progess khi bài hát play
            audio.ontimeupdate = function(){
                const duration = audio.duration
                const currentTime = audio.currentTime

                const minutes = Math.floor(duration/60)
                const seconds = Math.floor(duration - minutes * 60)
                const timeResult = `0${minutes}:${seconds}`

                const progessPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progess.value = progessPercent
                // console.log(timeResult)
                if(!duration){
                    timeEnd.textContent = '00:00'
                }else{
                    timeEnd.textContent = timeResult
                }
                
                const minutesCurrent = Math.floor(currentTime/60)
                const secondesCurrent  = Math.floor(currentTime - (minutesCurrent*60))
                
               
                const result = `0${minutesCurrent}:${secondesCurrent}`
                
  
                timeStart.textContent = result
                console.log(result)
                
            }

            // Xử lý khi hết bài hát tự sang bài tiếp theo
            audio.onended = function(){
                nextBtn.click()
            }

            // Xử lý khi click nút nextSong
            nextBtn.onclick = function(){
                if(app.isRandom){
                    app.randomSong()
                }else{
                    app.nextSong()
                }
                audio.play()
                app.render()
            }

            // Xử lý khi click nút prev
            prevBtn.onclick = function(){
                if(app.isRandom){
                    app.randomSong()
                }else{
                    app.prevSong()
                }
                audio.play()
                app.render()
            }

           

            
            // Xử lý progess khi tua bài hát
            progess.onchange = function(e){
                const changeTime = Math.floor(e.target.value * audio.duration / 100)
                audio.currentTime = changeTime
            }
            


        }

         // Xử lý ẩn hiện play list
        quitBtn.onclick = function(){
            loadPlaylist.style.visibility = 'hidden'
        }

        playlistBtn.onclick = function(){
            loadPlaylist.style.visibility = 'unset'
            // console.log(123)
        }

         // Xử lý khi click vào nút random
        randomBtn.onclick = function(){
            app.isRandom =  !app.isRandom

            randomBtn.classList.toggle('active')

        }

        // Xử lý khi click trực tiếp vào song trong play list
        playList.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            // console.log(songNode)
            if(songNode){
                app.currentIndex = Number(songNode.dataset.index)
                // console.log(app.currentIndex)

                app.loadCurrentSong()
                app.render()
                audio.play()
            }
        }

        // Xử lý khi click vào loa
        volumeBtn.onclick = function(){
            // if(app.isVolume){
            //     $('.volume__bar').classList.remove('active')
            // }else{
            //     $('.volume__bar').classList.add('active')

            // }

            app.isVolume = !app.isVolume

            volumeBar.classList.toggle('active')

        }

        // Xử lý tăng giảm âm lượng
        volumeProgess.onchange= function(e){
            const valueVolume = e.target.value / 100
            audio.volume = valueVolume
            console.log(valueVolume)
        }
       
      
    },

    // Hàm load bài hát đầu tiên trong danh sách
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
        timeEnd.textContent = this.currentSong.time
    },

    // Hàm tải bài hát tiếp theo
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    
    randomSong: function(){
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length)
        } while (randomIndex === this.currentIndex)

        this.currentIndex = randomIndex
        this.loadCurrentSong()
      
    },

    scrollToActive: function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: smooth,
                inline: nearest
            })
        })
     
    },

    start: function(){
        this.render()

        this.handleFunction()

        this.defineProperties()

        this.loadCurrentSong()
    }
}

app.start()