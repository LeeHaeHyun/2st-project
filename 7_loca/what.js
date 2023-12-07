// var googleSubmitBtn = $('#google-submit');
var today = new Date();

var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);
var hours = ('0' + today.getHours()).slice(-2); 
var minutes = ('0' + today.getMinutes()).slice(-2);
var seconds = ('0' + today.getSeconds()).slice(-2);

var dateString = year + '-' + month  + '-' + day + '-' + hours + '-' + minutes + '-' + seconds;


var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    console.log(dateString);
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "위치공유에 실패했습니다.(지원하지 않는 브라우저)";
  }
}

function showPosition(position) {
  $.ajax({
    type: "GET",
    url: "https://script.google.com/macros/s/AKfycbwW5Ec_SgFyKfhu71WQX5wJFsiYP1BT2YvjeN1fwXhpZOL0tP8BLW4tY-6tJOmr9UkUsw/exec",
    data: {
      "전송시간": dateString,
      "위도": position.coords.latitude,
      "경도": position.coords.longitude
    },
    success: function(response){
       alert('전송 완료.');
    }
  })
};

