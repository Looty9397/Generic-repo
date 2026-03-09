// Created by Looty9397
// Genre(s): Woodland, Existential Horror

// Set up buttons for user interaction
const buttons = { // Names are self-explanatory except for "break" which is take a (permanent) break
    "forward": document.createElement("button"),
    "left": document.createElement("button"),
    "right": document.createElement("button"),
    "read": document.createElement("button"),
    "stray": document.createElement("button"),
    "break": document.createElement("button")
}

buttons.forward.id = "forward";
buttons.left.id = "left";
buttons.right.id = "right";
buttons.read.id = "read";
buttons.stray.id = "stray";
buttons.break.id = "break";

// Prepare for webpage interaction and set up the game loop
var time = 0;
var imageFile = "";
const main = document.getElementById("main");
const extra = document.getElementById("extra");
const special = document.getElementById("special");
const choices = document.getElementById("choices");
const image = document.getElementById("image")

// Game texts, randomly displayed to form a(n)... experience
const textInsanity = [];
const textExhaustion = [];
const textRandom = [];
const textGenericStart = [];
const textGenericEnd = [];
const textEndings = [];
const textEvent = [];
const textChoices = [""];

// Place the text onto the webpage
function buildText () {
    main.innerHTML = choose(textGenericStart) + choose(textGenericEnd);
    let roll = Math.random() * 100
    if () { // Not a joke, the formula used reaches 2.5 between 67 and 68
        if (0.1(1.1 ** (time/2)) > roll) {
            doEvent("insanity");
        }
    } 
}

// Place the image onto the webpage
function buildImage () {
}

function choose (list) {
    return list[Math.round(Math.random() * list.length)];
}

function doEvent (type) {
    if (type === "insanity") {

    }
}

function left () {
}

function right () {
}