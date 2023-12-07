function Nmap() {
window.open("https://map.naver.com/p/directions/-/-/-/transit");
}

function Kmap() {
    let start1 = document.getElementById("start1").value;
    let final1 = document.getElementById("final1").value;
    window.open("https://map.kakao.com/?sName="+start1+"&eName="+final1);
   }

function Omap() {
    window.open("https://whereurl.com/");
  }

function Sms() {
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    let gota = document.getElementById("gota").value;
    let ota = document.getElementById("ota").value;
    
    if (varUA.indexOf('android') > -1) {    // 안드로이드
        var url = "sms:15882504?body=" + encodeURIComponent(gota+" "+ota);
        location.href = url;
    } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1 || varUA.indexOf('ios') > -1) {    // IOS
        var url = "sms:15882504&body=" + encodeURIComponent(gota+" "+ota);
        location.href = url;
    } 
}



