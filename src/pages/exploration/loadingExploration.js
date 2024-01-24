const BACKGROUNDS = ["ruin_background2.png", "ruin_background1.png"];
class LoadingExploration extends Phaser.Scene {
    constructor() {
        super({ key: "LoadingExploration" });
      }
    
preload() {
  this.load.image("feu", "./assets/images/exploration/escalier.jpg");
  for (var i = 0; i < listSelectedHeroes.length; i++) {
    this.load.image(
      listSelectedHeroes[i] + "_escalier",
      "./assets/images/heroes/" + listSelectedHeroes[i] + "/idle.png"
    );
  }

    var chosenGround =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

    this.load.image(
      "background_salle",
      "./assets/images/exploration/" + chosenGround
    );
    this.load.image("chest", "./assets/images/exploration/chest.jpg");
    this.load.image("money", "./assets/icons/piece.png");
    this.load.image("couloir", "./assets/icons/yellow_right_arrow.png");
    this.load.image("closeButton", "./assets/icons/red_cross.png");
    this.load.image(
      "startFight",
      "./assets/images/exploration/start_fight.png"
    );


    this.load.image(
      "background_corridor",
      "./assets/images/exploration/Corridor1.png"
    );
    this.load.image("chest", "./assets/images/exploration/chest.jpg");
    this.load.image("move", "./assets/icons/yellow_right_arrow.png");

    this.load.image(
      "prochaineSalle",
      "./assets/images/exploration/mapBackground.jpg"
    );

  
  }
create()
{
  game.scene.start('Salle');
}
}