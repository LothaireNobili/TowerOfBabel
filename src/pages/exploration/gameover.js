class GameOver extends Phaser.Scene {
  position = [200, 400, 600, 800];
  constructor() {
    super({ key: "GameOver" });
  }
  preload() {
    for (var i = 0; i < EQUIPE.length; i++) {
      this.load.image(
        EQUIPE[i] + "_iconsDeath",
        "./assets/images/heroes/" + EQUIPE[i] + "/portrait.png"
      );
    }
    this.load.image("defeat", "./assets/images/exploration/defeat.jpg");
    this.load.image("retour_hameau", "./assets/images/hameau/enseigne.png");
    this.load.image(
      "enseigneFocus",
      "./assets/images/hameau/enseigne_focus.png"
    );
  }
  create() {
    this.add.image(
      game.config.width / 2,
      game.config.height / 2 - 100,
      "defeat"
    );
    this.add.text(
      game.config.width / 2 - 100,
      game.config.height / 2 + 100,
      "Total Earnt Gold : " + (user.coins - GOLDEARNT)
    );
    for (var i = 0; i < EQUIPE.length; i++) {
      this.add.image(this.position[i], 600, EQUIPE[i] + "_iconsDeath");
    }
    var enseigne = this.add.image(200, 85, "retour_hameau").setScale(0.55);
    createEnseigneReturnBtn(this, enseigne);

    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();
  }
}
