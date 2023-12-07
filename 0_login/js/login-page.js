const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const loginking = document.getElementById("login-error-msg-holder");
const boardButton = document.getElementById("board-go");

var opacity = 0;
var intervalID = 0;

document.getElementById("login-error-msg-holder").addEventListener("click", function () {
    intervalID = setInterval(hide, 50);
});
function hide() {
    var div = document.getElementById("login-error-msg-holder");
    opacity = Number(window.getComputedStyle(div).getPropertyValue("opacity"));

    if (opacity > 0) {
        //Fade out 핵심 부분
        opacity = opacity - 0.1;
        div.style.opacity = opacity;
        //img.style.opacity=opacity;
    } else {
        clearInterval(intervalID);
    }
}

boardButton.addEventListener("click", (event) => {
    var audio = new Audio("/0_login/music/login.wav");
    audio.play();

    //     setTimeout(function () {
    //         location.replace("jhc.dothome.co.kr/9_board/index.php");
    //     }, 450);
    // });
});

loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if ((username === "박화진" && password === "930101") || (username === "이해현" && password === "931009")) {
        var audio = new Audio("/0_login/music/login.wav");
        audio.play();
        // var anText_sub1 = document.getElementById('username-field').value;
        // alert("로그인에 성공했습니다!<br>"+ "어서오세요!"+anText_sub1+" 님");
        setTimeout(function () {
            location.href = "/0_login/Start.html";
        }, 450);
    } else {
        loginking.style.opacity = 1;
        loginErrorMsg.style.opacity = 1;
    }
});

function check(box) {
    if (box.checked == true) {
        swal.fire("때론 진중한 사랑을!", "우리는 찐해 커플입니다.", "success");
        view.style.backgroundImage = "url('https://drive.google.com/uc?id=1B7eVN0ArrUcFM7mgc7xeZQJAw31kPPo7')";
    } else {
        swal.fire("때론 다정한 사랑을!", "우리는 찐해 커플입니다.", "warning");
        view.style.backgroundImage = "url('https://drive.google.com/uc?id=1ebvacpSr4bj5JMgyTWDHOOru30b1Oq76')";
    }
}
