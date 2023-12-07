var defaultVal = {
    speed: 0.003,
    dataLife: 3,
    dataScore: 0,
};
var Game = {
    speed: 0.003,
    dataLife: 3,
    dataScore: 0,

    words: [],
    timeout: null,

    get life() {
        return Game.dataLife;
    },

    set life(lf) {
        Game.dataLife = lf;
        Game.showLife();

        if (lf <= 0) {
            clearInterval(Game.interval);
            clearTimeout(Game.timeout);
            location.href = "/1_main/main.html";
            alert("여기까지 잘했어요!");
        }
    },

    get score() {
        return Game.dataScore;
    },
    set score(ns) {
        Game.dataScore = ns;
        Game.showScore();
    },

    init(canvas_) {
        Game.handletEvent();
        Game.summonWord();
        Game.showLife();
        Game.showScore();
        Game.draw(canvas_);
    },

    handletEvent() {
        document.querySelector("#type").addEventListener("keydown", function (e) {
            if (e.key == "Enter") Game.submit();
        });
    },

    submit() {
        const text = document.querySelector("#type").value;
        const index = Game.words.findIndex((word) => text.trim() == word.text);
        //const index = Game.words.findIndex((e) => e.word.trim() == text);

        if (index >= 0) {
            const word = Game.words.splice(index, 1)[0];
            switch (word.type) {
                case "heal":
                    Game.life++;
                    break;
                case "explode":
                    const score = Game.words.reduce((a, v) => a + v.text.length, 0) * (Game.speed * 1000);
                    Game.score += Math.ceil(score * 1.5);
                    Game.words = [];
            }
            Game.score += word.text.length * Math.ceil(Game.speed * 1000);
        }
        document.querySelector("#type").value = "";
    },

    draw(canvas_) {
        if (canvas_) {
            Game.interval = setInterval(this.drawFun, 30, canvas_);
        }
    },

    drawFun(canvas_) {
        const ctx = canvas_.getContext("2d");
        ctx.clearRect(0, 0, 1000, 600); // 타이핑하면 글자를 삭제할 수 있는 범위 (시작축:x,y / 범위축: x,y)
        ctx.font = "20px 'Noto Sans KR', sans-serif";
        ctx.textALign = "center";

        Game.speed += Game.speed * 0.0002;
        Game.words.map((word) => {
            word.y += Game.speed * 300;

            switch (word.type) {
                case "heal":
                    ctx.fillStyle = "yellowgreen";
                    break;
                case "explode":
                    ctx.fillStyle = "tomato";
                    break;
                default:
                    ctx.fillStyle = "#fff";
            }
            ctx.fillText(word.text, word.x, word.y);
        });

        Game.words.filter((word) => word.y >= 570).map((_) => Game.life--);
        Game.words = Game.words.filter((word) => word.y < 570);
    },

    Clear(canvas_) {
        //초기화
        console.log("game clear");
        clearInterval(Game.interval);
        clearTimeout(Game.timeout);
        var context2d = canvas_.getContext("2d");
        context2d.clearRect(0, 0, canvas_.width, canvas_.height);
        //Game.words = [];
    },

    summonWord() {
        class Word {
            x = 0;
            y = 0;

            constructor(text, x, y) {
                this.text = text;
                this.x = x;
                this.y = y;
                this.type = ["heal", ...Array(10).fill("normal"), "explode"][Math.floor(Math.random() * 12)];
            }
        }

        var word = [...WORDS].sort((_) => Math.random() - 0.5).shift();

        Game.words.push(new Word(word, Math.random() * 800 + 50, 0)); // 글자가 나오는 범위
        clearTimeout(Game.timeout);
        Game.timeout = setTimeout((_) => Game.summonWord(), 10 / Game.speed);
    },

    showLife() {
        const life = document.querySelector("h1.life");
        life.innerHTML = Array(Game.life).fill("💗").join("");
    },

    showScore() {
        const score = document.querySelector("h1.score");
        score.innerHTML = Game.score.toLocaleString();
    },
};
