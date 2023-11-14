var game

var gameSettings = {
}

var config = {
    width: 1080,
    height: 720,
    backgroundColor: 0x000000,
    scene: [
        Hameau, 
        Laboratoire, 
        Forge, 
        Diligence,
        LoadingFight,
        Fight
    ]
}

window.onload = function() {
    game = new Phaser.Game(config);
}

/*
import Hameau from "./src/pages/hameau/hameau.js"
import Forge from "./src/pages/hameau/forge.js"
import Laboratoire from "./src/pages/hameau/laboratoire.js";
import Diligence from "./src/pages/hameau/diligence.js";
export var game

var config = {
    width: 1080,
    height: 720,
    backgroundColor: 0x000000,
    scene: [
        Hameau, 
        Laboratoire, 
        Forge, 
        Diligence,
    ]
}

window.onload = function () {
    game = new Phaser.Game(config);
}*/