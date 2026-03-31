const image = document.getElementById("image");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const buttonsDiv = document.getElementById("buttons");

class Scene {
    constructor (imageFile, txt1, txt2, children = []) {
        this.imageFile = imageFile;
        this.text1 = txt1;
        this.text2 = txt2;
        this.children = children;
    };

    rnder () {
        image.src = this.imageFile;
        text1.innerHTML = this.text1;
        text2.innerHTML = this.text2;
        buttonsDiv.innerHTML = "";
        for (let i = 0; i < this.children.length; i++) {
            let newButton = document.createElement("button");
            newButton.innerHTML = "option" + (i + 1);
            newButton.addEventListener("click", () => {
                this.children[i].rnder();
                this.exitScene();
            });
            buttonsDiv.appendChild(newButton)
        };
    };

    exitScene () {}

    setKiddos (kiddos) {
        this.children = kiddos;
    };
};

class MusicScene extends Scene {
    constructor(imageFile, txt1, txt2, music, children = []) {
        super(imageFile, txt1, txt2, children);
        this.music = music;
    }

    rnder () {
        super.rnder();
        this.music.play();
    }

    exitScene () {
        this.music.pause();
    }
}

let introScene = new Scene("../M7/chapter/photo08.jpg", "welcome to my flower garden", "im a bad gardener");
let secondScene = new Scene("../M5/chapter/ttlogo.png", "these are some puppies", "never won a single game in their lives");
let thirdScene = new MusicScene("20260316_134434.jpg", "this is my cat", "ain't she just purty", new Audio("Dreamy_20Flashback.mp3"));

introScene.setKiddos([secondScene, thirdScene]);
secondScene.setKiddos([thirdScene, introScene]);
thirdScene.setKiddos([introScene, secondScene])

let e = new Scene("../M8/chapter/logo.png", "hi there and welcome", "to my humble little inner-city abode", [introScene, secondScene, thirdScene]); e.rnder();
