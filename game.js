var game

var gameSettings = {
}

var config = {
    width: 1080,
    height: 720,
    backgroundColor: 0x000000,
    scene: [
        Accueil,
        Hameau, 
        Laboratoire, 
        Forge, 
        Diligence,
        ComposerEquipe,
        LoadingFight,        
        Fight,
        Couloir,
        Salle,
        Escalier,
        GameOver,
    ]
}

window.onload = function() {
    game = new Phaser.Game(config);
    game.config.allHeroList = [//it can't be put in the first var config otherwise it would be cleansed
        "crusader", 
        "bandit",
        "plaguedoctor",
        "vestal",
        "hellion"
    ] 
}