// Written by Looty9397 according to the requirements of the assignment.

let scene = 1;
let contbtn = document.getElementById("continue");
let brekbtn = document.getElementById("break");
let caption = document.getElementById("caption");

function advance () {
    scene += 1;
    document.getElementById("image").src = "img/img" + ((scene % 3) + 1)+ ".png";
    switch ((scene % 3) + 1) {
        case 1: caption.innerHTML = "Your trudge through the woods continues. You have travelled " + (scene - 1) + " miles."; break;
        case 2: caption.innerHTML = "You continue walking through the woods. You have travelled " + (scene - 1) + " miles."; break;
        case 3: caption.innerHTML = "You continue to walk. You step on a stick. You have travelled " + (scene - 1) + " miles."; break;
    }
}

contbtn.addEventListener("click", function () {
    if (this.className != "btndisable") {
        advance();
        brekbtn.className = "btn";
        this.innerHTML = "Continue on";
    }
});
brekbtn.addEventListener("click", function () {
    if (this.className != "btndisable") {
        contbtn.className = "btndisable"; brekbtn.className = "btndisable";
        document.getElementById("endbox").className = "";
        caption.innerHTML = "";
    }
})
document.getElementById("reset").addEventListener("click", function () {
    window.location.reload();
})