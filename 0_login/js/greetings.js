$(document).ready(function () {
 
  greet();

  setTimeout(hide, 4200);

  function hide() {
    $('#intro')
  }

  function greet() {
    setTimeout(typeWriter1, 500);
    setTimeout(typeWriter2, 2400);

    var i = 0;
    var j = 0;
    var speed = 123;
    var introSpan = document.getElementById('introSpan1');
    var introSpan = document.getElementById('introSpan2');

    var txt = '천생연분이 만난'
    var txt2 = '    찐한 이야기♬'

    function typeWriter1() {
      type1();

      function type1() {
        if (i < txt.length) {
          introSpan1.innerHTML += txt.charAt(i);
          i++;
          setTimeout(typeWriter1, speed);
        }
      }
    }

    function typeWriter2() {
      type2();

      function type2() {
        if (j < txt2.length) {
          introSpan2.innerHTML += txt2.charAt(j);
          j++;
          setTimeout(typeWriter2, speed);
        }
      }
    }
  }


});
