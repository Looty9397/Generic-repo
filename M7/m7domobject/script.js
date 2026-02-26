// Written by Looty9397

var playground = document.getElementById("playground");

// function () {}s
function newli () { // Add new <li> to the <ul>ist
    ulist.appendChild(document.createElement("li"));
    ulist.lastChild.innerHTML = "H" + ("i").repeat(ulist.children.length);
    ulist.lastChild = setCol(ulist.lastChild)
}

function randColor () { // Generate a random rbg(r, g, b) and its inverse
    let r = (Math.random() * 256);
    let g = (Math.random() * 256);
    let b = (Math.random() * 256);
    return { // Yay formatting output :D
        "col": {
            "r": r,
            "g": g,
            "b": b,
            "rgb": ("rgb(" + r + "," + g + "," + b + ")")
        },
        "inv": {
            "r": (256 - r),
            "g": (256 - g),
            "b": (256 - b),
            "rgb": ("rgb(" + (256 - r) + "," + (256 - g) + "," + (256 - b) + ")")
        }
    }
}

function setCol (element) { // Set the text color and background color of an element
    let colors = randColor();
    element.style.color = colors.col.rgb; // Also possible to take only one of the values.
    element.style.backgroundColor = colors.inv.rgb; // Why someone would do that, I don't know.
    return element;
}

// /summon html:webpage ~ ~ ~ {author="Looty_9397", url="https://looty9397.github.io/Generic-repo/M7/m7domobject/"}
let heading = document.createElement("h1"); // <h1>eader
heading.innerHTML = "Welcome to DOM<span style='font-size: 0.1px;'>ming</span> homework";
heading.className = "highlight";

let paragraph = document.createElement("p"); // <p>ointless text
paragraph.innerHTML = "This is your first <b>DOM</b> homework assignment"

let ulist = document.createElement("ul"); // Big <ul>ist
for (let i = 0; i < 3; i++) {newli();}

button = document.createElement("button"); // Just a <button>
button.innerHTML = "Add new list item";

playground.appendChild(heading); // Apply this all to the page
playground.appendChild(paragraph);
playground.appendChild(ulist);
document.body.appendChild(button); // Has to be after the <div> for some reason

for (let i = 0; i < document.getElementsByClassName("highlight").length; i++) { // Randomly color the heading(s)
    document.getElementsByClassName("highlight")[i] = setCol(document.getElementsByClassName("highlight")[i]);
}

button.addEventListener("click", function () {newli();}); // Give the <button> a function () {}
playground.addEventListener("click", function () {playground = setCol(this);}) // Give the <div> a function () {}
