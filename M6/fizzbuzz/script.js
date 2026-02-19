// Written by Looty9397.
// Note: I very much dislike assignments in this format, where I am essentially writing the exact code you expect.
// I am able to code in JavaScript by myself with minimal instruction. For this assignment specifically, only
// "The user will type in a number, submit it, and the correct FizzBuzz result will appear on the page."
// is needed. That tells me all I need to know, and in my view, as long as my code provides the expected result
// then it works. And is good. And there is no need to change it to adapt to a specific style. (i.e. Using constants
// for elements I plan to modify. I can use the document.getElementById() statement directly in the code.
// It will work. It is readable. It is not "clever".)

document.getElementById("inputs").addEventListener("submit", function (event) {
    event.preventDefault();
    num = Number(document.getElementById("num").value);
    if (!isNaN(num)) {
        out = (num % 3 == 0) ? "Fizz" : ""; // To avoid a large if else block.
        out += (num % 5 == 0) ? "Buzz" : ""; // ^^
        out = (out === "") ? num : out; // else condition
    }
    document.getElementById("output").innerHTML = out;
})
