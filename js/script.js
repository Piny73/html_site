function getCurrentTime() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    if (hour<10) hour="0"+hour;
    if (minute<10) minute="0"+minute;
    return hour + ":" + minute;
}

function showNavBar(vis) {
    if (vis == 0) {
        document.querySelector(".navbar").style.display = "none";
        document.querySelector(".menu-toggle").style.display = "block";
        document.querySelector(".menu-x").style.display = "none";
    }
    if (vis == 1) {
        document.querySelector(".navbar").style.display = "block";
        document.querySelector(".menu-toggle").style.display = "none";
        document.querySelector(".menu-x").style.display = "block";


    }

}