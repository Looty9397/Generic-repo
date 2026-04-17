// Made by Looty9397

class queue { // FIFO
    constructor () {
        this.items = [];
    };

    insert (obj) {
        this.items.push(obj);
    };

    extract () {
        // let obj = this.items.reverse().pop();
        // this.items.reverse(); // Rereverse
        return this.items.shift();
    };

    isEmpty () {
        return !this.items.length;
    };
};

class stack { // LIFO
    constructor () { // Likely unneeded but you never know.
        this.items = [];
    };

    insert (obj) {
        this.items.push(obj);
    };

    extract () {
        return this.items.pop();
    }

    isEmpty () {
        return !this.items.length;
    };
};

class Cell {
    constructor (id) {
        this.state = "blank";
        this.neighbors = [];
        this.element = document.createElement("div");
        this.element.id = id;
        this.element.class = this.state;
        this.parent = new Number(null); // For use in pathfinding algorithms. Is an index. getPoint()
    };

    setState (state) {
        if (["visited", "blank", "wall", "start", "end", "path"].includes(state)) {
            this.state = state;
        } else {
            console.log("setState() method at Cell " + this.element.id + ": '" + state + "' is not a valid state.");
        };
    };

    refresh () {
        this.element.class = this.state;
    };

    transform () {
        if (this.state = "wall") {
            this.setState("blank");
        } else {
            this.setState("wall");
        };
        this.refresh();
    };
};

// just for the sake of simplicity
function getPoint (index) {
    return [index % dimensions[0], Math.floor(index / dimensions[0])];
};

function getIndex (point) {
    return (point[1] * dimensions[0]) + point[0];
};

let algorithms = [
    function () { // BFS | Code made using GeeksForGeeks and Wikipedia psuedocode as references.
        let visited = new Array(grid.length).fill(false);
        visited[getIndex(startPos)] = true;
        let path = []; let current;
        q = new queue().insert(getIndex(startPos)); // Queue holds the index.
        while (!q.isEmpty()) {
            current = q.extract(); // an index
            if (getPoint(current) === endPos) {
                break;
            };
            for (var i of grid[current].neighbors) { // iterates through a list (i is part of the list)
                if (!visited[i]) {
                    visited[i] = true;
                    grid[i].parent = current;
                    q.insert(i);
                };
            };
        };
        while (getPoint(current) != startPos) {
            path.push(current);
            current = grid[current].parent;
        };
        return path;
    },
    function () { // A* | Code made using Wikipedia pseudocode as a reference.
        // Plan for heuristic: pythagorean theorem. sqrt(x-dist^2 + y-dist^2)
        function h (point) {
            return Math.sqrt(Math.pow(Math.abs(endPos[0] - getPoint(point)[0]), 2) + Math.pow(Math.abs(endPos[1] - getPoint(point)[1]), 2)); // IN MATH NOTATION: √(|endx - pointx|^2 + |endy - pointy|^2)
        };
        q = [getIndex(startPos)]; // Queueueueueueueueueueueueueueueueueueue but not
        g = new Array(grid.length).fill(Infinity);
        g[getIndex(startPos)] = 0;
        f = new Array(grid.length).fill(Infinity);
        f[getIndex(startPos)] = h(startPos);
        let path = []; let current;
        while (!q.length > 0) {
            q.sort(function (a, b) {return a - b;});
            current = q[0];
            if (getPoint(current) === endPos) {
                break;
            };
            q.shift(); // Remove the current cell
            for (var i of grid[current].neighbors) {
                if (g[current] + 1 < g[i]) {
                    grid[i].parent = current;
                    g[i] = g[current] + 1;
                    f[i] = g[current] + h(i) + 1;
                    if (!q.includes(i)) {
                        q.push((i));
                    };
                };
            };
        };
        while (current.parent) {
            path.push(current);
            current = current.parent;
        };
        return path;
    },
];

var graph = document.getElementById("graph");
var grid = []; // A list of Cells. Not separated like [y[x]] for ease of access in algorithms.
var dimensions = []; // [<x>, <y>]
var startPos = []; // [<x>, <y>]
var endPos = []; // [<x>, <y>]

document.getElementById("sx").addEventListener("change", function () {
    if (this.value > dimensions[0]) {
        this.value = dimensions[0];
    } else if (this.value < 1) {
        this.value = 1;
    };
    grid[getIndex(startPos)].setState("empty");
    startPos[0] = this.value;
    grid[getIndex(startPos)].setState("start");
});

document.getElementById("sy").addEventListener("change", function () {
    if (this.value > dimensions[1]) {
        this.value = dimensions[1];
    } else if (this.value < 1) {
        this.value = 1;
    };
    grid[getIndex(startPos)].setState("empty");
    startPos[1] = this.value;
    grid[getIndex(startPos)].setState("start");
});

document.getElementById("ex").addEventListener("change", function () {
    console.log(this.value, dimensions);
    if (this.value > dimensions[0]) {
        this.value = dimensions[0];
    } else if (this.value < 1) {
        this.value = 1;
    };
    grid[getIndex(endPos)].setState("empty");
    endPos[0] = this.value;
    grid[getIndex(endPos)].setState("end");
});

document.getElementById("ey").addEventListener("change", function () {
    if (this.value > dimensions[1]) {
        this.value = dimensions[1];
    } else if (this.value < 1) {
        this.value = 1;
    };
    grid[getIndex(endPos)].setState("empty");
    endPos[1] = this.value;
    grid[getIndex(endPos)].setState("end");
});

document.getElementById("dx").addEventListener("change", function () {
    if (this.value > 32) {
        this.value = 32;
    } else if (this.value < 1) {
        this.value = 1;
    };
    dimensions[0] = this.value;
});

document.getElementById("dy").addEventListener("change", function () {
    if (this.value > 32) {
        this.value = 32;
    } else if (this.value < 1) {
        this.value = 1;
    };
    dimensions[1] = this.value;
});

document.getElementById("generate").addEventListener("click", function () {
    // Error checking first. Actual code will run IF and ONLY IF no errors arise. Erroneous inputs will be marked
    // with <element>.style.backgroundColor = maroon;
    // LIST OF ERROR CONDITIONS
    // 1. Start and End are the same
    // 2. End is out of bounds
    // 3. Start is out of bounds
    // 4. Dimensions are too small (1 x 1)
    let error = false;
    if ((startPos === endPos) || (endPos[0] > dimensions[0]) || (endPos[1] > dimensions[1]) || (startPos[0] > dimensions[0]) || (startPos[1] > dimensions[1]) || (dimensions[0] * dimensions[1] === 1)) {
        error = true;
    };
    console.log(error);
    // DISPLAY THE CODE AND STUFF
});
