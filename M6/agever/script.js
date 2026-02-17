// Made by Looty9397

const userInput = document.getElementById("age");
const submitButton = document.getElementById("submit");
const output = document.getElementById("output");

const denied = "You may not continue.";
const allowed = "You may <a>continue</a>.";

submitButton.onclick = function () {
    let age = userInput.value;
    age = Number(age);
    if (isNaN(age)) {age = 0} // I don't know how a NaN value will interact so I'm just removing them.
    if (age < 4) {output.innerHTML = denied} // Too young.
    else if (age > 50) {output.innerHTML = denied} // Too old.
    else if (age <= 22) {output.innerHTML = allowed} // Good to go.
    else if (age >= 24) {output.innerHTML = allowed} // Good to go.
    else if (age == 23) {output.innerHTML = denied} // Too twenty-three.
    else {output.innerHTML = denied} // No point in error handling, just deny, deny, deny.
}