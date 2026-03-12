// Created by Looty9397
// Genre(s): Woodland, Existential Horror

// Set up buttons for user interaction
const buttons = { // Names are self-explanatory except for "break" which is take a (permanent) break
    "forward": document.getElementById("forward"),
    "left": document.getElementById("left"),
    "right": document.getElementById("right"),
    "stray": document.getElementById("stray"),
    "break": document.getElementById("break")
}

// Prepare for webpage interaction and set up the game counters
var time = 0; var insanity = 0; var exhaustion = 0; var currentEvent = 0; var currentImage = "";
const main = document.getElementById("main");
const extra = document.getElementById("extra");
const special = document.getElementById("special");
const choices = document.getElementById("choices");
const image = document.getElementById("image")

// Game texts, semi-randomly displayed
const text = {
    "insanity": [
        "Something seems off, yet you cannot identify what.",
        "You feel uneasy after considering the path's nonexistent end.",
        "A quiet voice in your head gets slightly louder.",
        "You stop and stare at a tree that was glaring at you.",
        "The leaves ahead rustle, but you cannot see any change.",
        "You blink, and the world seems slightly different."
    ],
    "exhaustion": [
        "Your legs groan from the pain of walking.",
        "You feel short of breath, and slow down for a second.",
        "You find yourself yawning.",
        "One of your legs gives out, but you manage to recover.",
        "A sharp pain in your side emerges.",
        "You feel a headache coming on."
    ],
    "extra": [
        "You notice a sign with incomprehensible text to your side.",
        "The leaves above and grass below wave gently in the wind.",
        "A light breeze blows by.",
        "One particularly oddly-shaped tree sticks out of the woods.",
        "You smile as you see a tree with a little face in the bark.",
        "You see a speck of gray out of the corner of your eye, but pay it no mind"
    ],
    "main": [
        "You take a step. Then another. And another.",
        "As you walk, the path continues on.",
        "Your journey continues with minimal interruption.",
        "The wind blows through your hair as you walk.",
        "Some raindrops fall through the leaves and land on you.",
        "You wonder if the path truly is endless as you continue walking.",
        "You break up the monotony with some jumping.",
        "Some leaves behind you rustle and you pick up the pace."
    ],
    "end": {
        "endings": {
            "break": [
                "As you sit down, you fall asleep.",
                "You take a seat on a tree trunk and take a deep breath.",
                "Your legs buckle under you as soon as you plan to stop walking."
            ],
            "stray": [
                "You take a step off the path. You turn around to find the path nowhere to be found.",
                "A few hours into your hike, you realize you haven't seen any trace of the path since you left.",
                "While climbing a tree for a vantage point, you fall and knock yourself out."
            ],
            "insanity": [
                "Nothing makes sense to you anymore.",
                "You see a horde of beasts approaching, despite none existing.",
                "The voice in your head tells you to stop, and you obey."
            ]
        },
        "event": []
    },
    "choices": {
        "start": [
            "Ahead, you notice ",
            "Before you lies ",
            "Ahead, there is/are",
        ],
        "end": [
            "one option.",
            "two options.",
            "three options."
        ]
    }
}

const imageFiles = { // "ID": ["FILE", CHOICENUM, ["OPTS"]] || "O" = 1, "T" = 2, "H" = 3
    "NORMAL": ["ONF", "ONR", "ONL", "TNFR", "TNFL", "TNRL", "HNFRL"],
    "EVENT": ["OEF", "TEFR", "TEFL"],
    "ONF": ["1NF", 1, ["F"]],//
    "ONR": ["1NR", 1, ["R"]],//
    "ONL": ["1NL", 1, ["L"]],//
    "TNFR": ["2NFR", 2, ["F", "R"]],//
    "TNFL": ["2NFL", 2, ["F", "L"]],//
    "TNRL": ["2NRL", 2, ["R", "L"]],//
    "HNFRL": ["3NFRL", 3, ["F", "R", "L"]],//
    "OEF": ["1EF", 1, ["E"]],
    "TEFR": ["2EFR", 2, ["E", "R"]],
    "TEFL": ["2EFL", 2, ["E", "L"]],
    "OS": ["1S", 1, ["F"]]
};

// Place the text onto the webpage
function buildText () {
    main.innerHTML = choose(text.main.start) + choose(text.main.end);
    if (Math.random() < 0.25) {
        extra.innerHTML = choose(text.extra);
    } else {
        extra.innerHTML = "";
    }
    let roll = Math.random() * 100;
    if (time <= 33 && roll < 0.2 * (1.1 ** time)) {
        currentEvent += 1; // Same result, probability curve go wonky though.
    } else if (time >= 34 && roll < (-1 * (0.2 * (1.1 ** (-1 *(time - 67.5)))) + 5)) {
        currentEvent += 1;
    } else if (roll < 5 * Math.sqrt(time)) {
        currentEvent += 2;
    }
    if (currentEvent === 3) { // 1 = insanity; 2 = exhaustion; 3 = 50/50 for either
        currentEvent = Math.round(Math.random()) + 1
    }
    switch (currentEvent) {
        default: special.innerHTML = ""; break;
        case 1: special.innerHTML = choose(text.insanity); insanity += 1; break;
        case 2: special.innerHTML = choose(text.exhaustion); exhaustion += 1; break;
    }
    choices.innerHTML = choose(text.choices.start) + text.choices.end[imageFiles[currentImage][1]];
}

// Place the image onto the webpage
function buildImage () {
    if (Math.random() < Math.sqrt(time)) {
        image.src = imageFiles[choose(imageFiles.EVENT)] + ".png";
    } else {
        image.src = imageFiles[choose(imageFiles.NORMAL)] + (Math.round(Math.random()) + 1) + ".png";
    }
    image.style.filter = "blur(" + (Math.random() * exhaustion / 5) + ") invert(" + (Math.random() * insanity / 100) + ")";
}

function choose (list) {
    return list[Math.round(Math.random() * list.length)];
}

function createScene () {
    buildImage();
    buildText();
}

window.addEventListener("load", function () {
    image.src = imageFiles.OS[0] + ".png";
    currentImage = "OS";
    buttons.forward.style.display = "";
})

buttons.forward.addEventListener("click", function () {
    if (currentImage[1] === "E") {

    } else {
        createScene();
    }
})

buttons.left.addEventListener("click", function () {
    createScene();
})

buttons.right.addEventListener("click", function () {
    createScene();
})