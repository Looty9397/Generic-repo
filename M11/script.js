// Made by Looty9397

class queue { // FIFO
    constructor () {
        this.items = [];
    };

    insert (obj) {
        this.items.push(obj);
    };

    extract () {
        let obj = this.items.reverse().pop();
        this.items.reverse(); // Rereverse
        return obj;
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

function getPoint (index) {
    return [index % dimensions[0], Math.floor(index / dimensions[0])]
}

let algorithms = [
    function () { // BFS
        let visited = new Array(grid.length).fill(false);
        q = new queue().insert((startPos[1] * dimensions[0]) + startPos[0]);
        let current = new Number(null);
        while (!q.isEmpty()) {
            current = q.extract();
            if (getPoint(current) === endPos) {}
        }
    },
    function () { // A*

    },
    function () { // Dijkstra's

    }
];

var graph = document.getElementById("graph");
var grid = []; // A list of Cells. Not separated like [y[x]] for ease of access in algorithms.
var edges = []; // A list of lists. [[connections]]. Each index of the superlist matches to an index of grid.
var dimensions = []; // [<x>, <y>]
var startPos = []; // [<x>, <y>]
var endPos = []; // [<x>, <y>]