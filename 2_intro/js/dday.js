var inputStartDay = "2023-03-17";

var tday = new Date();
var startDay = new Date(inputStartDay);
var years = startDay.getFullYear();
var month = startDay.getMonth() + 1;
var day = startDay.getDate();
document.querySelector("#startDay").innerHTML = years + "년 " + month + "월 " + day + "일 ";

var startMilli = startDay.getTime();
var todayMilli = tday.getTime();
var calcDay = 24*60*60*1000;
var passedDay = Math.round((todayMilli - startMilli) / calcDay);
document.querySelector("#today").innerHTML = "<h2>" + "[" + passedDay + "일째😘]</h2>";

calcDate(300);
calcDate(500);
calcDate(700);
calcDate(1000);

function calcDate(number){
    var futureMilli = startMilli + (calcDay * number);
    var dDay = Math.round((futureMilli - todayMilli) / calcDay);
    if(number == 365){
        years = startDay.getFullYear() +1;
        month = startDay.getMonth() + 1;
        day = startDay.getDate;
    }
    else{
        var futureDate = new Date(futureMilli);
        years = futureDate.getFullYear();
        month = futureDate.getMonth() +1;
        day = futureDate.getDate();
    }
    document.querySelector("#dday"+number).innerHTML = dDay +"일 남음<br>" + years + "년 " + month + "월 " + day + "일 ";
}
