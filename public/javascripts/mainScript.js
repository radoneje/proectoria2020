"use strict";
(() => {

    initPlayer()
   // updateStatus();
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

        initPlayer()
    })
    document.getElementById("playerMenuItem2").addEventListener("click", (e) => {
        if (e.target.classList.contains("active"))
            return
        e.target.classList.toggle("active");
        document.getElementById("playerMenuItem1").classList.toggle("active");
        initPlayer()
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

    document.querySelectorAll(".playerMenu2Item").forEach(elem => {
        elem.addEventListener("click", (e) => {
            let id=e.target.getAttribute("playerid")
;           document.querySelector(".playerMenu2").setAttribute("activeplayer", id)
            initPlayer()
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
function initPlayer() {
    let playerSect=1;
    if(document.getElementById("playerMenuItem2").classList.contains("active"))
        playerSect=2;
    let playerId=1;
    try {
        playerId = parseInt(document.querySelector(".playerMenu2").getAttribute("activeplayer")) + 1;
    }
    catch (e){
        console.warn(e);
    }
    document.querySelector(".videoWrapper").innerHTML = status["player"+playerId+''+playerSect];
    console.log("update player")
}
async function updateStatus(){
    let response=await fetch("/getJson");
    if (response.ok) {
        let json = await response.json();
        if(json.player11!=status.player11 ||
            json.player12!=status.player12 ||
            json.player21!=status.player21 ||
            json.player22!=status.player22
        ){
            status=json;
            initPlayer();
        }

    } else {
        console.warn("HTTP error: " + response.status);
    }
    setTimeout(async ()=>{await updateStatus()},60*1000);
}


