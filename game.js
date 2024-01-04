var game

var gameSettings = {
}

var config = {
    width: 1080,
    height: 720,
    backgroundColor: 0x000000,
    scene: [
        LoadingFight,
        Hameau, 
        Laboratoire, 
        Forge, 
        Diligence,
        ComposerEquipe,
        
        Fight,
        Salle,
        Couloir,
        Escalier,
    ]
}

window.onload = function() {
    game = new Phaser.Game(config);
}