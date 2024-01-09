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
        ComposerEquipe,
        Salle,
        Couloir,
        Escalier,
        LoadingFight,
        Fight,
        Temporis
    ]
}

window.onload = function() {
    game = new Phaser.Game(config);
}