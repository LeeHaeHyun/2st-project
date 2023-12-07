

const HIDDEN_CLASSNAME = "hidden";

window.onload = showImage;

var backgroundImage = [
	'./img/1.gif',
	'./img/2.gif',
	'./img/3.gif',
	'./img/4.gif',
	'./img/5.gif',
	'./img/6.gif',
	'./img/7.gif',
	'./img/8.gif',
	'./img/9.gif',
	'./img/10.gif',

];

function showImage(){
	var randomNum = Math.floor(Math.random() * backgroundImage.length); //이미지 랜덤으로 뽑아냄
	document.getElementById("randomImg").src = backgroundImage[randomNum];
};

function feedback_alert(){
	alert("이용해주셔서 감사합니다 🥰");
}

const feedbackInput = document.querySelector("#feedback input");
const feedbackForm = document.querySelector("#feedback");

feedbackForm.addEventListener("submit", feedbackFn);

function feedbackFn(event){
	event.preventDefault();
	searchForm.classList.add(HIDDEN_CLASSNAME);
	const feedBack = feedbackInput.value;
	localStorage.setItem("feedBack", feedBack);
	console.log(feedBack);
}
