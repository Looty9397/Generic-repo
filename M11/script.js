// Made by Looty9397

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