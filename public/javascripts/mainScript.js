"use strict";
(() => {
    let player = videojs('mainVideo');
    let elem = document.querySelector(".playerMenuItem.active")
    if (elem)
        initPlayer(elem.getAttribute("iframe"))

    document.querySelectorAll(".modalMenuItem").forEach(elem => {
        elem.addEventListener("click", () => {
            closeMobileMenu();
            let el = document.querySelector('#' + elem.getAttribute("href"));
            var bodyRect = document.body.getBoundingClientRect(),
                elemRect = el.getBoundingClientRect(),
                top = elemRect.top - bodyRect.top;
            scrollToSmoothly(top - 100, 300)
        })
    })

    document.querySelectorAll(".logoToTop").forEach(e => {
        e.addEventListener("click", (e) => {
            closeMobileMenu();
            scrollToSmoothly(0, 300)
        })

    })
    document.getElementById("closeMobileMenu").addEventListener("click", (e) => {
        closeMobileMenu();

    })
    document.getElementById("mobileHamburger").addEventListener("click", (e) => {

        document.getElementById("modalMenu").classList.remove("hidden");
        document.body.classList.add("overflowHidden")
    })
    document.getElementById("playerMenuItem1").addEventListener("click", (e) => {
        if (e.target.classList.contains("active"))
            return
        e.target.classList.toggle("active");
        document.getElementById("playerMenuItem2").classList.toggle("active");

        initPlayer(e.target.getAttribute("iframe"))
    })
    document.getElementById("playerMenuItem2").addEventListener("click", (e) => {
        if (e.target.classList.contains("active"))
            return
        e.target.classList.toggle("active");
        document.getElementById("playerMenuItem1").classList.toggle("active");
        initPlayer(e.target.getAttribute("iframe"))
    })
    document.querySelectorAll(".mainMenuItem").forEach(elem => {
        elem.addEventListener("click", () => {
            let el = document.querySelector('#' + elem.getAttribute("href"));
            var bodyRect = document.body.getBoundingClientRect(),
                elemRect = el.getBoundingClientRect(),
                top = elemRect.top - bodyRect.top;
            scrollToSmoothly(top - 100, 300)
        })
    })

})();

function scrollToSmoothly(pos, time) {
    var currentPos = window.pageYOffset;
    var start = null;
    if (time == null) time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        var progress = currentTime - start;
        if (currentPos < pos) {
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        if (progress < time) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, pos);
        }
    });
}

function closeMobileMenu() {
    document.getElementById("modalMenu").classList.add("hidden");
    document.body.classList.remove("overflowHidden")

}

function initPlayer(iframeUrl) {
    return;
    document.querySelector(".videoWrapper").innerHTML = iframeUrl;
}

