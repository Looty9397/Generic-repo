// Made by Looty9397

// -- CLASSES --

class queue { // FIFO
    constructor () {
        this.items = [];
    };

    insert (obj) { // enqueue
        this.items.push(obj);
    };

    extract () { // dequeue
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
        this.parent = new Number(null); // For use in pathfinding algorithms. Is an index. getPoint()
        this.element = document.createElement("td");
        this.element.id = "C" + id;
        this.element.addEventListener("click", function () {
            grid[Number(this.id.slice(1))].transform();
            renderTable();
        });
        this.element.addEventListener("mouseover", function () {
            document.getElementById("info").innerHTML = "&nbsp;(" + getPoint(this.id.slice(1))[0] + ", " + getPoint(this.id.slice(1))[1] + ")";
            switch (grid[Number(this.id.slice(1))].state) {
                case "blank": break;
                case "wall": document.getElementById("info").innerHTML += ": Wall"; break;
                case "start": document.getElementById("info").innerHTML += ": Start Point"; break;
                case "end": document.getElementById("info").innerHTML += ": End Point"; break;
                case "path": document.getElementById("info").innerHTML += ": Path"; break;
                case "visited": document.getElementById("info").innerHTML += ": Visited"; break;
            };
        });
        this.element.className = this.state;
    };

    setState (state) {
        if (["visited", "blank", "wall", "start", "end", "path"].includes(state)) {
            this.state = state;
        };
        this.element.className = this.state;
    };

    transform () {
        if (this.state === "wall") {
            this.setState("blank");
        } else if (!["start", "end"].includes(this.state)) {
            this.setState("wall");
        };
        this.element.className = this.state;
    };
};

// -- FUNCTIONS --

// just for the sake of simplicity
function getPoint (index) {
    // So we have a point [x, y] and a number and the dimensions of the graph. The x as I have it now works.
    // the y howver does not. index % dimensions[0] is the x value. y value would be the INDEX minus THE X
    // DIVIDED BY THE X DIMENSIONS. oh that makes so much sense now.
    // OR NOT SINCE ITS STILL NOT WORKING. lets say we have index 73. index % x-dim (dims are 10 x 10) woudl be 3.
    // so thats good and correct. y value = 72.7 as it is now. badbadbadbad. 73 - 3 = 70 / 10 = 7. BRUH ITS THE ()
    return [index % dimensions[0], (index - (index % dimensions[0])) / dimensions[0]];
};

function getIndex (point) {
    // And this too is not working as it should. it should be x value (point[0]) + (y value (point[1]) * x-dim (dimensions[0])). ok why is there a -1. NO ERRORS BUT SOMETHING DELAYED. no issues with this anymore ggs.
    return (point[1] * dimensions[0]) + point[0];
};

Array.prototype.isEqualTo = function (other) {
    let equal = true; // ASSUME TRUE, CORRECT IF FALSE.
    if (this.length === other.length) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] !== other[i]) {
                equal = false;
            };
        };
    };
    return equal;
};

function renderTable () {
    graph.innerHTML = "";
    for (let i = 0; i < dimensions[1]; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < dimensions[0]; j++) {
            let td = grid[(i * dimensions[0]) + j].element;
            tr.appendChild(td);
        };
        graph.appendChild(tr);
    };
};

function genTable () {
    for (let i = 0; i < (dimensions[0] * dimensions[1]); i++) {
        grid[i] = new Cell(i);
        if (getPoint(i).isEqualTo(startPos)) {
            grid[i].setState("start");
        } else if (getPoint(i).isEqualTo(endPos)) {
            grid[i].setState("end")
        };
    };
    for (let i = 0; i < (dimensions[0] * dimensions[1]); i++) {
        if (getPoint(i)[0] === 0) {
            grid[i].neighbors.push(i + 1);
            grid[i].element.innerHTML = getPoint(i)[1];
        } else if (getPoint(i)[0] === dimensions[0] - 1) {
            grid[i].neighbors.push(i - 1);
        } else {
            grid[i].neighbors.push(i + 1);
            grid[i].neighbors.push(i - 1);
        };
        if (getPoint(i)[1] === 0) {
            grid[i].neighbors.push(i + dimensions[0]);
            grid[i].element.innerHTML = getPoint(i)[0];
        } else if (getPoint(i)[1] === dimensions[1] - 1) {
            grid[i].neighbors.push(i - dimensions[0]);
        } else {
            grid[i].neighbors.push(i + dimensions[0]);
            grid[i].neighbors.push(i - dimensions[0]);
        }
    };
    renderTable();
};

let algorithms = {
    bfs: function () { // BFS | Code made using GeeksForGeeks and Wikipedia psuedocode as references.
        let visited = new Array(grid.length).fill(false);
        visited[getIndex(startPos)] = true;
        let path = []; let current;
        q = new queue();
        q.insert(getIndex(startPos)); // Queue holds the index.
        while (!q.isEmpty()) {
            current = q.extract(); // an index
            if (getPoint(current).isEqualTo(endPos)) {
                break;
            };
            for (var i of grid[current].neighbors) { // iterates through a list (i is part of the list)
                if (!visited[i] && grid[i].state !== "wall") {
                    visited[i] = true;
                    if (grid[i].state === "blank") {
                        grid[i].setState("visited");
                    };
                    grid[i].parent = current;
                    q.insert(i);
                };
            };
        };
        path.push(current);
        while (!getPoint(current).isEqualTo(startPos)) {
            current = grid[current].parent;
            path.push(current);
        };
        return path;
    },
    astar: function () { // A* | Code made using Wikipedia pseudocode as a reference.
        // Plan for heuristic: pythagorean theorem. sqrt(x-dist^2 + y-dist^2)
        function h (point) {
            return Math.sqrt(Math.pow(Math.abs(endPos[0] - getPoint(point)[0]), 2) + Math.pow(Math.abs(endPos[1] - getPoint(point)[1]), 2)); // IN MATH NOTATION: √(|endx - pointx|^2 + |endy - pointy|^2)
            // "+ (Math.random * 0.01)"
        };
        q = [getIndex(startPos)]; // Queueueueueueueueueueueueueueue but not but also yes but actually not
        g = new Array(grid.length).fill(Infinity);
        g[getIndex(startPos)] = 0;
        f = new Array(grid.length).fill(Infinity);
        f[getIndex(startPos)] = h(startPos);
        let path = []; let current;
        while (q.length > 0) {

            q.sort(function (a, b) {return f[a] - f[b];});
            current = q[0];
            if (getPoint(current).isEqualTo(endPos)) {
                break;
            };
            q.shift(); // Remove the current cell
            for (var i of grid[current].neighbors) {
                if (g[current] + 1 < g[i] && grid[i].state !== "wall") {
                    grid[i].parent = current;
                    if (grid[i].state === "blank") {
                        grid[i].setState("visited");
                    };
                    g[i] = g[current] + 1;
                    f[i] = g[current] + h(i) + 1;
                    if (!q.includes(i)) {
                        q.push((i));
                    };
                };
            };
        };
        while (!getPoint(current).isEqualTo(startPos)) {
            path.push(current);
            current = grid[current].parent;
        };
        return path;
    },
};

// -- OBJECTS --

var graph = document.getElementById("graph");
var dimensions = [10, 10]; // [<x>, <y>]
var startPos = [0, 0]; // [<x>, <y>]
var endPos = [9, 9]; // [<x>, <y>]
var grid = new Array(dimensions[0] * dimensions[1]); // A list of Cells. Not separated like [y[x]] for ease of access in algorithms.

var e = {
    sx: document.getElementById("sx"),
    sy: document.getElementById("sy"),
    ex: document.getElementById("ex"),
    ey: document.getElementById("ey"),
    dx: document.getElementById("dx"),
    dy: document.getElementById("dy")
};

// -- EVENT LISTENERS --

e.sx.addEventListener("change", function () {
    if (Number(this.value) > dimensions[0] - 1) {
        this.value = dimensions[0] - 1;
    } else if (Number(this.value) < 0) {
        this.value = 0;
    };
    grid[getIndex(startPos)].setState("blank");
    startPos[0] = Number(this.value);
    grid[getIndex(startPos)].setState("start");
});

e.sy.addEventListener("change", function () {
    if (Number(this.value) > dimensions[1] - 1) {
        this.value = dimensions[1] - 1;
    } else if (Number(this.value) < 0) {
        this.value = 0;
    };
    grid[getIndex(startPos)].setState("blank");
    startPos[1] = Number(this.value);
    grid[getIndex(startPos)].setState("start");
});

e.ex.addEventListener("change", function () {
    if (Number(this.value) > dimensions[0] - 1) {
        this.value = dimensions[0] - 1;
    } else if (Number(this.value) < 0) {
        this.value = 0;
    };
    grid[getIndex(endPos)].setState("blank");
    endPos[0] = Number(this.value);
    grid[getIndex(endPos)].setState("end");
});

e.ey.addEventListener("change", function () {
    if (Number(this.value) > dimensions[1] - 1) {
        this.value = dimensions[1] - 1;
    } else if (Number(this.value) < 0) {
        this.value = 0;
    };
    grid[getIndex(endPos)].setState("blank");
    endPos[1] = Number(this.value);
    grid[getIndex(endPos)].setState("end");
});

e.dx.addEventListener("change", function () {
    if (Number(this.value) > Math.floor((window.innerWidth - 20) / 24)) {
        this.value = Math.floor((window.innerWidth - 20) / 24);
    } else if (Number(this.value) < 1) {
        this.value = 1;
    };
    dimensions[0] = Number(this.value);
    genTable();
});

e.dy.addEventListener("change", function () {
    if (Number(this.value) > Math.floor((window.innerHeight - 200) / 24)) {
        this.value = Math.floor((window.innerHeight - 200) / 24);
    } else if (Number(this.value) < 1) {
        this.value = 1;
    };
    dimensions[1] = Number(this.value);
    genTable();
});

document.getElementById("generate").addEventListener("click", function () {
    // Clear prior visited / path cells, allowing for redos
    for (let i = 0; i < grid.length; i++) {
        if (["visited", "path"].includes(grid[i].state)) {
            grid[i].setState("blank");
        };
    };
    // Error checking first. Actual code will run IF and ONLY IF no errors arise. Erroneous inputs will be marked
    // with <element>.style.backgroundColor = darkred;
    // -- LIST OF ERROR CONDITIONS --
    // 1. Start and End points are the same
    // 2. End point is out of bounds
    // 3. Start point is out of bounds
    // 4. Dimensions are too small (1 x 1)
    [e.sx.style.backgroundColor, e.sy.style.backgroundColor, e.ex.style.backgroundColor, e.ey.style.backgroundColor, e.dx.style.backgroundColor, e.dy.style.backgroundColor] = ["inherit", "inherit", "inherit", "inherit", "inherit", "inherit"];
    let error = false;
    if (startPos.isEqualTo(endPos) && endPos.isEqualTo(startPos)) {
        error = true;
        [e.sx.style.backgroundColor, e.sy.style.backgroundColor, e.ex.style.backgroundColor, e.ey.style.backgroundColor] = ["darkred", "darkred", "darkred", "darkred"];
    };
    if (endPos[0] > dimensions[0] - 1) {
        error = true;
        e.ex.style.backgroundColor = "darkred";
    };
    if (endPos[1] > dimensions[1] - 1) {
        error = true;
        e.ey.style.backgroundColor = "darkred";
    };
    if (startPos[0] > dimensions[0] - 1) {
        error = true;
        e.sx.style.backgroundColor = "darkred";
    };
    if (startPos[1] > dimensions[1] - 1) {
        error = true;
        e.sy.style.backgroundColor = "darkred";
    };
    if (dimensions[0] * dimensions[1] === 1) {
        error = true;
        e.dx.style.backgroundColor = "darkred";
        e.dy.style.backgroundColor = "darkred";
    };
    // DISPLAY THE CODE AND STUFF
    if (!error) {
        // Get answer to which algorithms
        let choices = document.getElementsByName("algo");
        let algo;
        for (var i of choices) {
            if (i.checked) {
                algo = i.value;
            };
        };
        let path = algorithms[algo](); // issue here now? ig no
        for (var i of path) {
            if (grid[i].state === "visited" && getPoint(path[0]).isEqualTo(endPos)) {
                grid[i].setState("path");
            };
        };
    };
});

window.addEventListener("load", function () {
    e.dx.value = Math.floor(Math.random() * (Math.floor((window.innerWidth - 20) / 24) - 4)) + 4;
    e.dy.value = Math.floor(Math.random() * (Math.floor((window.innerHeight - 200) / 24) - 4)) + 4;
    dimensions[0] = Number(e.dx.value);
    dimensions[1] = Number(e.dy.value);
    let start = -1; let end = -1;
    while (start === end) {
        start = Math.floor(Math.random() * dimensions[0] * dimensions[1]);
        end = Math.floor(Math.random() * dimensions[0] * dimensions[1]);
    };
    startPos = getPoint(start);
    endPos = getPoint(end);
    e.sx.value = startPos[0];
    e.sy.value = startPos[1];
    e.ex.value = endPos[0];
    e.ey.value = endPos[1];
    genTable();
});