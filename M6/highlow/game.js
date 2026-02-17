// Prompt user for a number between 1 and 10, or type 999 to exit.

// Create while loop that continues for as long as the user guesses are incorrect.
// Loop should count the number of guesses.
// Loop should exit if user enters 999 and not display "Too high!"
// If the guess is too low, the user should be promped "Too low!" and be able to guess again.
// If the guess is too high, the user should be promped 'Too high!" and be able to guess again.
// If anything else is entered, the user should be prompted that their input is invalid and 
// to guess again.

// If the guess is correct, the user should be alerted of their win and 
// be told the number of guesses they made.

document.getElementById("play").addEventListener("click", function () {
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    let preamble = "";
    let attempts = 1;
    while (true) {
        let promptMessage = (preamble + "Enter a") + ((attempts == 1) ? "" : "nother") + " number."
        let userGuess = prompt(promptMessage);
        //console.log(userGuess, typeof userGuess, Number(userGuess), Number("THIS IS NOT A NUMBER"), Number(userGuess) != Number("THIS IS NOT A NUMBER"))
        if (!isNaN(Number(userGuess))) {
            if (userGuess == randomNumber) {
                document.getElementById("output").innerHTML = "You have won! You took " + attempts + " guess(es) to reach the random number!";
                break;
            } else {
                if (userGuess < randomNumber) {
                    preamble = "Too low! ";
                } else if (userGuess == 999) {
                    break;
                } else {
                    preamble = "Too high! ";
                }
                attempts ++;
            }
        }
        else {
            preamble = "Invalid input. "
            attempts ++;
        }
    }
})
