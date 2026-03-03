// Written by Looty9397.

// img/bedroom.jpg by <a href="https://unsplash.com/@tama66">Peter Herrmann</a> on <a href="https://unsplash.com/photos/a-bedroom-with-a-bed-and-a-chair-in-a-room-vvp4oGTNuL8">Unsplash</a>
// img/kitchen.jpg by <a href="https://unsplash.com/@tama66">Peter Herrmann</a> on <a href="https://unsplash.com/photos/an-old-fashioned-kitchen-with-a-stone-floor-sCkTY5YKwG0">Unsplash</a>
// img/room.jpg by <a href="https://unsplash.com/@tama66">Peter Herrmann</a> on <a href="https://unsplash.com/photos/abandoned-room-with-dusty-furniture-and-old-wallpaper-dSpyM1giBDo">Unsplash</a>
// img/attic.jpg by <a href="https://unsplash.com/@tama66">Peter Herrmann</a> on <a href="https://unsplash.com/photos/dusty-room-filled-with-leaning-framed-artwork-doBVm82alAw">Unsplash</a>

function describeRoom (room) {
    switch (room.toLowerCase()) {
        case "bedroom": console.log("This is a bedroom, featuring an ornate bed and curtains."); break;
        case "kitchen": console.log("This is a kitchen, weathered by age."); break;
        case "room": console.log("This is a room, devoid of unique features."); break;
        case "attic": console.log("This is the attic, the storage place of many ancient paintings."); break;
    };
};

const exampleNode = {
    "image": "img/attic.jpg",
    "text": "This is the attic, the storage place of many ancient paintings.",
    "choices": ["Go down the stairs", "Pick up a painting"]
};

storyNodes = [
    {
        "image": "img/bedroom.jpg",
        "text": "This is a bedroom, featuring an ornate bed and curtains.",
        "choices": ["Exit the bedroom", "Take a nap"]
    },
    {
        "image": "img/kitchen.jpg",
        "text": "This is a kitchen, weathered by age.",
        "choices": ["Exit the kitchen", "Cook a meal"]
    },
    {
        "image": "img/room.jpg",
        "text": "This is a room, devoid of unique features.",
        "choices": ["Exit the room", "Sit down"]
    },
    {
        "image": "img/attic.jpg",
        "text": "This is the attic, the storage place of many ancient paintings.",
        "choices": ["Exit the attic", "Inspect a painting"]
    },
];

function displayNode (num) {
    nodey = storyNodes[num];
    document.getElementById("image").src = nodey.image;
    document.getElementById("caption").innerHTML = nodey.text;
}