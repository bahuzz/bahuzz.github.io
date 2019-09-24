let game = {
    user: '',
    winner: '',
    date: '',
    userScore: 0,
    computerScore: 0,
    usedFields: [],
    time: 0,
    delay: 1500,
    field: 3,
    fields: 9,
    self: this,
    gameBrd: document.querySelector('.gameboard'),
    playBtn: document.querySelector('.play'),
    modeSelect: document.querySelector('.mode'),
    msg: document.querySelector('.message'),
    userInput: document.getElementById('userName'),

    async getSettings(mode) {
        await fetch("https://starnavi-frontend-test-task.herokuapp.com/game-settings")
            .then(res => res.json())
            .then(data => {
                if(mode == 'easy') {
                    this.delay = data.easyMode.delay;
                    this.field = data.easyMode.field;
                }
                if(mode == 'normal') {
                    this.delay = data.normalMode.delay;
                    this.field = data.normalMode.field;
                }
                if(mode == 'hard') {
                    this.delay = data.hardMode.delay;
                    this.field = data.hardMode.field;
                }
                
                this.gameBoard(this.field);
                this.fields = this.field * this.field;
                this.canPlay()
            })
    },

    async sendResults() {
        let data = JSON.stringify({winner:this.winner, date:this.date});
        console.log(data);
        await fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: data
        }).then(res => res.json());
        await this.getWinners();
    },

    canPlay() {
        if(this.modeSelect.value != 'default' && this.user.length > 0) {
            this.playBtn.disabled = false;
            if(this.playBtn.innerText == 'Play') {
                this.sendMsg(`Hello, ${this.user}! Click PLAY and GO!`)
            }
         }
        else { this.playBtn.disabled = true }
    },

    sendMsg(message) {
        this.msg.innerHTML = message
    },

    gameBoard(field) {
        let board = '';
        let id = 1;
        for (let i = 0; i < field; i++) {
            board += '<div class="gameboard__row">';
            for (let j = 0; j < field; j++) {
                board += `<div class="gameboard__item" id="${id}"></div>`;
                id++;
            }
            board += '</div>';
        }
        document.getElementById('gameBoard').innerHTML = board;
    },

    getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1; 
      },

    idGen(num) {
        var active = document.querySelector('.gameboard__item--active');
        do {
            var id = this.getRandomInt(num); 
            var item = document.getElementById(id);
        } while(this.usedFields.includes(id))
        
        try {
            if(!active.classList.contains('gameboard__item--hit')) {
                active.classList.add('gameboard__item--miss');
                this.computerScore++;
                this.sendMsg(`${this.user} - ${this.userScore}       Computer - ${this.computerScore}`);
                if(this.computerScore > Math.floor(this.fields/2)) {
                    this.stop();
                    this.winner = 'Computer';
                    this.winTime();
                    this.sendResults();
                    this.sendMsg('Oooops :( Game over. Lets play again!');
                    this.playAgain();
                };
            }
            active.classList.remove('gameboard__item--active');
        } catch {}
    
        item.classList.add('gameboard__item--active');
        this.usedFields.push(id);
        console.log(this.usedFields, this.userScore, this.computerScore);
    } ,

    winTime() {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = new Date();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        let str = `${hours}:${minutes}; ${day} ${monthNames[month]} ${year}`;
        this.date = str;
    },

    disableSettings() {
        this.modeSelect.disabled = true;
        this.userInput.disabled = true;
        this.playBtn.disabled = true;
    },

    hit(elem) {
        elem.classList.add('gameboard__item--hit');
        this.userScore++;
        this.sendMsg(`${this.user} - ${this.userScore}       Computer - ${this.computerScore}`);
        if(this.userScore > Math.floor(this.fields/2)) {
            this.stop();
            this.sendMsg(`Congratulations, ${this.user}! You WIN!`);
            this.winner = this.user;
            this.winTime();
            this.sendResults();
            this.playAgain();
        };
    },

    play() {
        this.gameBrdListener(true);
        this.userScore = 0;
        this.computerScore = 0;
        this.usedFields = [];
        this.gameBoard(this.field);
        this.time = setInterval(() =>  this.idGen(this.fields), this.delay);
        this.sendMsg(`${this.user} - ${this.userScore}       Computer - ${this.computerScore}`);
        this.disableSettings();
    },

    playAgain() {
        this.playBtn.innerText = 'Play again';
        this.canPlay();
        this.modeSelect.disabled = false;
        this.userInput.disabled = false;
    },

    stop() {
        clearTimeout(this.time);
        this.gameBrdListener(false);
    },

    userName() {
        this.user = this.userInput.value;
        this.canPlay()
    },

    itemClick(e) {
        var elem = e.target;
        if(elem.classList.contains('gameboard__item--active'))  game.hit(elem);
    },

    gameBrdListener(flag) {
        if(flag) {
            this.gameBrd.addEventListener('click', this.itemClick)
        } else {
            this.gameBrd.removeEventListener('click', this.itemClick)
        }
    },



    listeners() {
        this.playBtn.addEventListener('click', () => this.play());
        this.modeSelect.addEventListener('change', () => this.getSettings(this.modeSelect.value));
        this.userInput.addEventListener('input', () => this.userName());
    },

    getWinners() {
        let table = document.querySelector('.leaders');
        let leaders ='';
        fetch("https://starnavi-frontend-test-task.herokuapp.com/winners")
            .then(res => res.json())
            .then(data => { data.map(item => {
                leaders += `<tr><td>${item.winner}</td><td>${item.date}</td></tr>`
            });
            table.innerHTML = leaders;
        })
    },


    init() {
        this.listeners();
        this.getWinners();
        this.userName();
    }

}

game.init();







