// Created by Looty9397
// Genre(s): Woodland, Existential Horror

// If this project were to lose points on anything, I think it would be on these things only.
// 1. No try/catch blocks. I don't have any since I don't need any; I do not take any direct user input.
// 2. Perhaps hard to identify story. Its not really well defined due to the variable nature of events.

// --- SETUP FOR EVERYTHING ELSE ---

// Just a container for the buttons
const buttons = { // Names are self-explanatory except for "break" which is take a (permanent) break
    "forward": document.getElementById("forward"),
    "left": document.getElementById("left"),
    "right": document.getElementById("right"),
    "stray": document.getElementById("stray"),
    "break": document.getElementById("break")
}

// Prepare for webpage interaction and set up the game counters
var time = 0; var insanity = 0; var exhaustion = 0; var currentImage = ""; var stage = 0; var currentEvent = 0; var mode = "dark";
const para = { // Text slots for the UI
    "main": document.getElementById("main"),
    "extra": document.getElementById("extra"),
    "special": document.getElementById("special"),
    "choices": document.getElementById("choices"),
}
const image = document.getElementById("image");

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

// Database of images to be used during execution
const imageFiles = { // "ID": ["FILE", CHOICENUM, ["OPTS"]] || "O" = 1, "T" = 2, "H" = 3
    "NORMAL": ["ONF", "ONR", "ONL", "TNFR", "TNFL", "TNRL", "HNFRL"],//
    "ONF": {"name": "images/1NF", "count": 1, "choices": ["F"]},//
    "ONR": {"name": "images/1NR", "count": 1, "choices": ["R"]},//
    "ONL": {"name": "images/1NL", "count": 1, "choices": ["L"]},//
    "TNFR": {"name": "images/2NFR", "count": 2, "choices": ["F", "R"]},//
    "TNFL": {"name": "images/2NFL", "count": 2, "choices": ["F", "L"]},//
    "TNRL": {"name": "images/2NRL", "count": 2, "choices": ["R", "L"]},//
    "HNFRL": {"name": "images/3NFRL", "count": 3, "choices": ["F", "R", "L"]},//
    "OEF": {"name": "images/1EF", "count": 1, "choices": ["F"]},
    "BEF": {"name": "images/BEF", "count": 1, "choices": ["F"]},
    "OS": {"name": "images/1S", "count": 1, "choices": ["F"]}//
};

// --- PROCESSES TO BE USED ---

// Place the text onto the webpage
function buildText (type) {
    clearText();
    if (type === "N") {
        para.main.innerHTML = choose(text.main);
        if (Math.random < 0.25) {
            para.extra.innerHTML = choose(text.extra);
        }
    } else if (type === "E" && stage === 0) {
        para.main.innerHTML = choose(text.end.event.discover);
    } else {
        para.main.innerHTML = text.end.event.entered[stage - 1];
        if (Math.random < 0.25) {
            para.extra.innerHTML = choose(text.extra);
        }
    }
    if (stage === 0) {
        currentEvent = 0;
        if (Math.random() < 0.25) {
            para.extra.innerHTML = choose(text.extra);
        } else {
            para.extra.innerHTML = "";
        }
        if (Math.random() < (0.1 * Math.sqrt(time))) {
            currentEvent += 1;
        }
        if (Math.random() < (0.1 * Math.sqrt(time))) {
            currentEvent += 2;
        }
        if (currentEvent === 3) { // 1 = insanity; 2 = exhaustion; 3 = 50/50 for either
            currentEvent = Math.floor(Math.random()) + 1
        }
        if (currentEvent === 1) {
            if (Math.random() < 0.1) {
                clearText();
                para.main.innerHTML = choose(text.end.endings.insanity);
                para.extra.innerHTML = "You have reached an ending. Reload the page to play again.";
                insanity = "END";
            } else {
                para.special.innerHTML = choose(text.insanity);
                insanity += 1;
                para.choices.innerHTML = choose(text.choices.start) + text.choices.end[imageFiles[currentImage].count - 1];
            }
        } else if (currentEvent === 2) {
            para.special.innerHTML = choose(text.exhaustion);
            exhaustion += 1;
            para.choices.innerHTML = choose(text.choices.start) + text.choices.end[imageFiles[currentImage].count - 1];
        } else {
            para.choices.innerHTML = choose(text.choices.start) + text.choices.end[imageFiles[currentImage].count - 1];
        }
    }
}

// Place the image onto the webpage
function buildImage (type) {
    if (type === "N") {
        currentImage = choose(imageFiles.NORMAL);
        image.src = imageFiles[currentImage].name + (Math.floor(2 * Math.random()) + 1) + ".png";
    } else if (type === "E" && stage >= 1) {
        currentImage = "BEF";
        image.src = imageFiles[currentImage].name + ".png";
    } else if (type === "E") {
        currentImage = "OEF";
        image.src = imageFiles[currentImage].name + (Math.floor(2 * Math.random()) + 1) + ".png";
    }
    image.style.filter = "blur(" + (exhaustion / 2) + "px) invert(" + (insanity / 20) + ")";
}

// Place the buttons onto the webpage
function buildButtons () {
    if (insanity !== "END") {
        let strayPossibilities = [];
        if (imageFiles[currentImage].choices.includes("L")) {
            buttons.left.style.display = "inline-block";
        } else {
            buttons.left.style.display = "none";
            strayPossibilities.push("L");
        }
        if (imageFiles[currentImage].choices.includes("F")) {
            buttons.forward.style.display = "inline-block";
            if (currentImage === "OEF") {
                buttons.forward.innerHTML = "Enter";
            } else if (currentImage === "BEF") {
                buttons.forward.innerHTML = "Continue";
            } else {
                buttons.forward.innerHTML = "Go straight"
            }
        } else {
            buttons.forward.style.display = "none";
            strayPossibilities.push("F");
        }
        if (imageFiles[currentImage].choices.includes("R")) {
            buttons.right.style.display = "inline-block";
        } else {
            buttons.right.style.display = "none";
            strayPossibilities.push("R");
        }
        if (currentEvent === 2 && currentImage !== "BEF") {
            buttons.break.style.display = "inline-block";
        } else {
            buttons.break.style.display = "none";
        }
        if (strayPossibilities.length > 0 && Math.random() < (Math.sqrt(insanity) * Math.sqrt(exhaustion) * (1 / (time + 1))) && currentImage !== "BEF") {
            let strayChoice = choose(strayPossibilities);
            buttons.stray.style.display = "inline-block";
            if (strayChoice === "F") {
                buttons.stray.innerHTML = "Go straight";
            } else if (strayChoice === "R") {
                buttons.stray.innerHTML = "Turn right";
            } else if (strayChoice === "L") {
                buttons.stray.innerHTML = "Turn left";
            }
        } else {
            buttons.stray.style.display = "none";
        }
    } else {
        buttons.forward.style.display = "none";
        buttons.left.style.display = "none";
        buttons.right.style.display = "none";
        buttons.stray.style.display = "none";
        buttons.break.style.display = "none";
    }
}

// Since there doesn't seem to be a translation of python random.choice(), I made my own
function choose (list) {
    let output = list[Math.floor(Math.random() * list.length)];
    return output;
}

// Self-explanatory
function clearText () {
    para.main.innerHTML = "";
    para.extra.innerHTML = "";
    para.special.innerHTML = "";
    para.choices.innerHTML = "";
}

// --- FUNCTIONALITY, EVENT LISTENERS, ETC. ---

// Initial text
window.addEventListener("load", function () {
    image.src = imageFiles.OS.name + ".png";
    currentImage = "OS";
    buttons.forward.style.display = "inline-block";
    para.main.innerHTML = "You stand at the entrance to the Path. The signs in front of you read:";
    para.extra.innerHTML = "\"Those who give up / those led astray / do not survive / another day.\""
})

// Forward buttons interactions
buttons.forward.addEventListener("click", function () {
    if (this.innerHTML === "Continue") {
        if (stage <= 4) {
            stage += 1;
            buildImage("E");
            buildText("E");
            buildButtons();
        } else {
            location.reload();
        }
    } else if (this.innerHTML === "Enter") {
        stage = 1;
        buildImage("E");
        buildText("E");
        buildButtons();
    } else if (this.innerHTML === "Enter the path" || this.innerHTML === "Go straight") {
        if (Math.random() < 0.05) {
            buildImage("E");
            buildText("E");
        } else {
            buildImage("N");
            buildText("N");
        }
        buildButtons();
    }
})

// Left button interactions
buttons.left.addEventListener("click", function () {
    if (Math.random() < 0.05) {
        buildImage("E");
        buildText("E");
    } else {
        buildImage("N");
        buildText("N");
    }
    buildButtons();
})

// Right button interactions
buttons.right.addEventListener("click", function () {
    if (Math.random() < 0.05) {
        buildImage("E");
        buildText("E");
    } else {
        buildImage("N");
        buildText("N");
    }
    buildButtons();
})

// Stray button + ending
buttons.stray.addEventListener("click", function () {
    clearText();
    para.main.innerHTML = choose(text.end.endings.stray);
    para.extra.innerHTML = "You have reached an ending. Reload the page to play again.";
    buttons.forward.style.display = "none";
    buttons.left.style.display = "none";
    buttons.right.style.display = "none";
    buttons.stray.style.display = "none";
    buttons.break.style.display = "none";
})

// Break button + ending
buttons.break.addEventListener("click", function () {
    clearText();
    para.main.innerHTML = choose(text.end.endings.break);
    para.extra.innerHTML = "You have reached an ending. Reload the page to play again.";
    buttons.forward.style.display = "none";
    buttons.left.style.display = "none";
    buttons.right.style.display = "none";
    buttons.stray.style.display = "none";
    buttons.break.style.display = "none";
})

// Light/dark mode
image.addEventListener("click", function () {
    if (mode === "light") {
        document.body.style.backgroundColor = "#222";
        document.body.style.color = "#ddd";
        mode = "dark";
    } else if (mode === "dark") {
        document.body.style.backgroundColor = "#ddd";
        document.body.style.color = "#222";
        mode = "light";
    }
})

// Minor VFX
image.addEventListener("mouseover", function () {
    this.style.width = "525px";
})

image.addEventListener("mouseout", function () {
    this.style.width = "500px";
})

// Global button functionality
for (let i = 0; i < 5; i++) { // 3 event listeners * 5 buttons = 15 total event listeners from this alone
    btn = ["forward", "left", "right", "stray", "break"][i] // These would be separate but I felt like
    buttons[btn].addEventListener("mouseover", function () { // condensing it. Doubles up the bonus to make it
        if (mode === "light") { // way easier to edit in mass. Triples up the bonus to make it easier to read
            this.style.backgroundColor = "#222"; // for you, who is reading this. :D
            this.style.color = "#ddd"; // I would have put these first two in CSS with :hover, but then it would
        } else if (mode === "dark") { // not automatically adapt to changes in light/dark mode. At least, I don't
            this.style.backgroundColor = "#ddd"; // know how to make it do that, if it is possible.
            this.style.color = "#222";
        }
    })
    buttons[btn].addEventListener("mouseout", function () {
        if (mode === "light") {
            this.style.backgroundColor = "#ddd";
            this.style.color = "#222";
        } else if (mode === "dark") {
            this.style.backgroundColor = "#222";
            this.style.color = "#ddd";
        }
    })
    buttons[btn].addEventListener("click", function () {
        time += 1;
        document.getElementById("heading").innerHTML = "The Walking Path - Hour " + time;
    })
}