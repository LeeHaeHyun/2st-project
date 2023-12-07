$(document).ready(function () {
    let dsggwq = 0;

    $(document).click((e) => {
        let x = e.pageX;
        let y = e.pageY;

        if ($("#change-1").attr("style") == "fill:#ff0000") {
            createImg(x, y);
        }
    });

    function createImg(x, y) {
        let el = document.createElement("img");
        var audio = new Audio("/1_main/img/niaw.mp3");
        audio.play();
        el.setAttribute("id", "imote" + dsggwq);
        el.setAttribute("src", "../assets/img/menu_ani0" + Math.floor(Math.random() * 4 + 1) + ".gif");
        el.setAttribute(
            "style",
            "width:130px; z-index:999; position: absolute; top:" + (y - 100) + "px; left:" + (x - 100) + "px;"
        );

        document.body.appendChild(el);

        dsggwq++;

        // 3초후 삭제
        setTimeout(() => {
            document.body.removeChild(el);
        }, 3000);
    }
});

// $(document).ready(function() {
//     let dsggwq = 0;
//         $(document).click((e) =>{
//             let x = e.pageX
//             let y = e.pageY
//         if($('#change-1').attr('style') == 'fill:#ff0000'){
//             createImg(x, y);
//         }
//     })

//     function createImg(x, y){
//         let el = document.createElement('img')
//         // el.setAttribute("src", "/web/assets/img/menu_ani01.gif")
//         el.setAttribute('id','imote'+dsggwq);
//         el.setAttribute('src','../assets/img/menu_ani0'+Math.floor( ( Math.random() * (5 - 1) + 1 ) )+'.gif');
//         el.setAttribute("style", "width:130px; z-index:999; position: absolute; top:" + (y-100) + "px; left:" + (x-100) + "px;");
//         document.body.appendChild(el)
//         dsggwq++;
//         console.log(dsggwq);
//         // console.log(Math.floor( ( Math.random() * (5 - 1) + 1 ) ));
//     }
// });//end
