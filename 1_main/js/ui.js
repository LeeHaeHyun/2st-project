window.addEventListener("DOMContentLoaded", function () {
    gnb();
    popup();
    animation();
});

// gnb
function gnb() {
    const openGnb = document.querySelector(".btn_open_gnb");
    const closeGnb = document.querySelector(".btn_close_gnb");
    const gnb = document.querySelector(".gnb");
    const header = document.querySelector(".header");
    const couple = document.querySelector(".couple");

    openGnb.addEventListener("click", function () {
        header.classList.add("active");
        gnb.classList.add("is_opened");
    });
    closeGnb.addEventListener("click", function () {
        header.classList.remove("active");
        gnb.classList.remove("is_opened");
    });
    couple.addEventListener("click", function () {
        header.classList.remove("active");
        gnb.classList.remove("is_opened");
    });
}

function popup() {
    if (document.querySelector(".popup") == null) return;

    const popup = document.querySelector(".popup");
    const openPopup = document.querySelector(".open_popup");
    const closePopup = document.querySelector(".close_popup");
    let isVideo = false;

    openPopup.addEventListener("click", function () {
        popup.style.display = "flex";
        let videoId = this.dataset.videoid;
        if (videoId !== undefined && videoId.length > 0) {
            isVideo = true;
            popup.querySelector(".video-container").innerHTML =
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
                videoId +
                '?&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        }
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
        if (isVideo) {
            popup.querySelector(".video-container").innerHTML = "";
        }
    });
}

function animation() {
    if (document.querySelector(".ani") == null) return;

    const controller = new ScrollMagic.Controller({ globalSceneOptions: { duration: 100 } });

    const target = document.querySelectorAll(".ani");

    for (let i = 0; i < target.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: target[i],
            triggerHook: 0.7,
        })
            .on("enter", function () {
                target[i].classList.add("play");
            })
            // .addIndicators()
            .addTo(controller);
    }
}
