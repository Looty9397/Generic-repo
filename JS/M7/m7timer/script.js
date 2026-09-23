let timerV;
const time = document.getElementById("time");

function start () {
    timerV = setInterval(advance, 1000)
    advance();
}

function stop () {
    clearInterval(timerV);
    timerV = undefined;
}

function reset () {
    stop();
    time.innerHTML = "0"
}

function advance () {
    time.innerHTML = Number(time.innerHTML) + 1;
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("reset").addEventListener("click", reset);