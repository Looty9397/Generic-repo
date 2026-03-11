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

// Prepare for webpage interaction and set up the game counters
var time = 0;
var insanity = 0; var exhaustion = 0;
var imageFiles = []; var imageChoices = 0;
const main = document.getElementById("main");
const extra = document.getElementById("extra");
const special = document.getElementById("special");
const choices = document.getElementById("choices");
const image = document.getElementById("image")

// Game texts, randomly displayed to form a(n)... experience
const textInsanity = []; // Text to display in the "special" paragraph in the case of an insanity event
const textExhaustion = []; // Text to display in the "special" paragraph in the case of an exhaustion event
const textRandom = []; // Text to display in the "extra" paragraph
const textGenericStart = []; // Text to display in the "main" paragraph (part 1)
const textGenericEnd = []; // Text to display in the "main" paragraph (part 2)
const textEndings = []; // Text to display in the "main" paragraph upon reaching an ending OR the ending event
const textChoicesStart = []; // Text to display in the "choices" paragraph once per image (part 1)
const textChoicesEnd = []; // Text to display in the "choices" paragraph once per image (part 2)

// Place the text onto the webpage
function buildText () {
    main.innerHTML = choose(textGenericStart) + choose(textGenericEnd);
    extra.innerHTML = choose(textRandom);
    let eventChoice = 0;
    let roll = Math.random() * 100;
    if (time <= 33 && roll < 0.2 * (1.1 ** time)) {
        eventChoice += 1; // Same result, probability curve go wonky though.
    } else if (time >= 34 && roll < (-1 * (0.2 * (1.1 ** (-1 *(time - 67.5)))) + 5)) {
        eventChoice += 1;
    } else if (roll < 5 * Math.sqrt(time)) {
        eventChoice += 2;
    }
    if (eventChoice === 3) { // 1 = insanity; 2 = exhaustion; 3 = 50/50 for either
        eventChoice = Math.round(Math.random()) + 1
    }
    switch (eventChoice) {
        default: special.innerHTML = ""; break;
        case 1: special.innerHTML = choose(textInsanity); insanity += 1; break;
        case 2: special.innerHTML = choose(textExhaustion); exhaustion += 1; break;
    }
    choices.innerHTML = choose(textChoicesStart) + textChoicesEnd[imageChoices];
}

// Place the image onto the webpage
function buildImage () {
    image.src = choose(imageFiles);
    imageChoices = image.src[0];
    endingEvent = image.src[1] === "E";
    image.style.filter = "blur(" + exhaustion / 5 + ") invert(" + insanity/100 + ")";
}

function choose (list) {
    return list[Math.round(Math.random() * list.length)];
}

function left () {
}

function right () {
}