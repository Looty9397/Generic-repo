// made by Looty9397

class Movie {
    constructor (title = "", cast = [], description = "", rating = 0) {
        this.title = title;
        this.cast = cast;
        this.description = description;
        this.rating = rating;
    };

    updateRating (newRating) {
        this.rating = newRating;
    };

    getInfo () { // So you can get the data without overwriting the already present information.
        let output = "Title: " + this.title + "<br/>Cast: ";
        for (let i = 0; i < this.cast.length; i++) {
            output += this.cast[i]; // Cast member name
            output += (i !== this.cast.length - 1) ? ", " : "<br/>"; // Separator
        };
        output += "Description: " + this.description + "<br/>";
        output += "Rating: " + this.rating + "<br/>";
        return output;
    }

    displayInfo () { // Just displays the info.
        document.getElementById("movie-info").innerHTML = "<p>" + this.getInfo() + "</p>";
    };
};

function updateMovieRating (title, newRating) {
    // const index = Data.findIndex(item => item.name === 'John'); // REFERENCE https://stackoverflow.com/questions/7176908/how-can-i-get-the-index-of-an-object-by-its-property-in-javascript
    collection[collection.findIndex(function (item) {return item.title === title;})].updateRating(newRating);
    // Effectively `collection[indexOfMovieWithCorrectTitle].updateRating(newRating);`
}

theMovie = new Movie("The Shawshank Redemption", ["Tim Robbins", "Morgan Freeman"], "Two imprisoned men bond over a number of years, finding eventual redemption through acts of common decency.", 9.3);

theMovie.displayInfo();

collection = new Array();
collection.push(theMovie);

updateMovieRating("The Shawshank Redemption", 9.5);

document.getElementById("movie-info").innerHTML += "<h1>Updated rating:</h1><p>" + theMovie.getInfo() + "</p>";