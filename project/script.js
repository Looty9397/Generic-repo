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
var time = 0; var insanity = 0; var exhaustion = 0; var currentEvent = 0; var currentImage = ""; var stage = 0;
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
        "event": {
            "discover": [
                "You see an odd structure up ahead.",
                "An ancient building lays in the road.",
            ],
            "entered": [
                "Inside the building you see numerous inscriptions.",
                "You cannot read the text, but something feels familiar.",
                "You suddenly feel very drowsy, and close your eyes.",
                "You wake up with a headache, at the beginning of the path.",
                "It must've all been a dream."
            ]
        }
    },
    "choices": {
        "start": [
            "Ahead, you notice ",
            "Before you lies ",
            "Ahead, there is/are ",
        ],
        "end": [
            "one option.",
            "two options.",
            "three options."
        ]
    }
}

const imageFiles = { // "ID": ["FILE", CHOICENUM, ["OPTS"]] || "O" = 1, "T" = 2, "H" = 3
    "NORMAL": ["ONF", "ONR", "ONL", "TNFR", "TNFL", "TNRL", "HNFRL"],//
    "EVENT": ["OEF", "TEFR", "TEFL"],
    "ONF": {"name": "images/1NF", "count": 1, "choices": ["F"]},//
    "ONR": {"name": "images/1NR", "count": 1, "choices": ["R"]},//
    "ONL": {"name": "images/1NL", "count": 1, "choices": ["L"]},//
    "TNFR": {"name": "images/2NFR", "count": 2, "choices": ["F", "R"]},//
    "TNFL": {"name": "images/2NFL", "count": 2, "choices": ["F", "L"]},//
    "TNRL": {"name": "images/2NRL", "count": 2, "choices": ["R", "L"]},//
    "HNFRL": {"name": "images/3NFRL", "count": 3, "choices": ["F", "R", "L"]},//
    "OEF": {"name": "images/1EF", "count": 1, "choices": ["E"]},
    "TEFR": {"name": "images/2EFR", "count": 2, "choices": ["E", "R"]},
    "TEFL": {"name": "images/2EFL", "count": 2, "choices": ["E", "L"]},
    "BEF": {"name": "images/BEF", "count": 1, "choices": ["F"]},
    "OS": {"name": "images/1S", "count": 1, "choices": ["F"]}//
};

// Place the text onto the webpage
function buildText () {
    main.innerHTML = choose(text.main);
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
    }
    roll = Math.random() * 100;
    if (roll < 5 * Math.sqrt(time)) {
        currentEvent += 2;
    }
    if (currentEvent === 3) { // 1 = insanity; 2 = exhaustion; 3 = 50/50 for either
        currentEvent = Math.floor(Math.random()) + 1
    }
    switch (currentEvent) {
        default: special.innerHTML = ""; break;
        case 1: special.innerHTML = choose(text.insanity); insanity += 1; break;
        case 2: special.innerHTML = choose(text.exhaustion); exhaustion += 1; break;
    }
    console.log(text.choices.end[imageFiles[currentImage].count - 1]);
    console.log(imageFiles[currentImage].count - 1);
    console.log(currentImage)
    choices.innerHTML = choose(text.choices.start) + text.choices.end[imageFiles[currentImage].count - 1];
}

function buildEventText () {
    if (currentImage[0] === "O" || currentImage[0] === "T") {
        main.innerHTML = choose(text.event.discover);
        choices.innerHTML = choose(text.choices.start) + text.choices.end[imageFiles[currentImage].count];
        buttons.forward.innerHTML = "Enter";
    } else if (currentImage[0] === "B") {
        if (stage <= text.event.entered.length) {
            main.innerHTML = text.event.entered[stage];
            stage += 1;
            buttons.forward.innerHTML = "Continue";
        } else {
            location.reload();
        }
    }
}

// Place the image onto the webpage
function buildImage () {
    if (stage > 0) {
        image.src = imageFiles.BEF.name;
        currentImage = "BEF";
        if (stage > 3) {
            image.src = imageFiles.OS.name;
            currentImage = "OS";
        }
    } else if (Math.random() < Math.sqrt(time)) {
        console.log("event");
        let imageChosen = choose(imageFiles.EVENT);
        image.src = imageFiles[imageChosen].name + ".png";
        currentImage = imageChosen;
    } else {
        let imageChosen = choose(imageFiles.NORMAL);
        image.src = imageFiles[imageChosen].name + (Math.floor(Math.random()) + 1) + ".png";
        currentImage = imageChosen;
    }
    image.style.filter = "blur(" + (Math.random() * (exhaustion / 5)) + ") invert(" + (Math.random() * (insanity / 20)) + ")";
}

function choose (list) {
    let output = list[Math.floor(Math.random() * list.length)];
    return output;
}

function createScene () {
    buildImage();
    buildText();
}

window.addEventListener("load", function () {
    image.src = imageFiles.OS.name + ".png";
    currentImage = "OS";
    buttons.forward.style.display = "inline-block";
})

buttons.forward.addEventListener("click", function () {
    if (currentImage[1] === "E") {
        buildEventText();
        buildImage();
    } else {
        this.innerHTML = "Go forward";
        createScene();
    }
})

buttons.left.addEventListener("click", function () {
    createScene();
})

buttons.right.addEventListener("click", function () {
    createScene();
})