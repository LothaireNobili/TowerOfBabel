class Couloir extends Phaser.Scene {
  cursors;
  equipe;
  prochaineSalle;
  constructor() {
    super({ key: "Couloir" });
    //this.prochaineSalle=this.scene.get('Salle').data.get('prochaineSalle')
  }

  preload() {
    this.load.setBaseURL("./assets/");
    this.load.image("background", "images/exploration/Corridor1.jpg");
    this.load.image("chest", "images/exploration/chest.jpg");
    this.load.image("crusader", "images/heroes/crusader/idle.png");
    this.load.image("bandit", "images/heroes/bandit/skill1.png");
    this.load.image("prochaineSalle", "images/exploration/mapBackground.jpg");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(540, 360, "background").setScale(1.7, 1.7);
    this.prochaineSalle = this.add
      .image(900, 450, "prochaineSalle")
      .setScale(0.2, 0.2);

    // on creer un group pour controler l'ensemble de l'equipe plutot que de controler chaque heros individuellement
    this.equipe = this.add.group();
    this.equipe.x = 175;
    this.equipe.y = 450;

    //on ajoute les heros manuellement pour l'instnat , les positions sont relatives au centre de l'equipe
    var crusader = this.add.image(50, 0, "crusader");
    var bandit = this.add.image(-50, 0, "bandit");

    // on ajoute les heros sur l'ecran
    this.equipe.add(crusader);
    this.equipe.add(bandit);

    this.equipe.getChildren().forEach((child) => {
      child.x += this.equipe.x;
      child.y += this.equipe.y;
    });

    //possibilité d'ajout un curio a une section de couloir
    if (false) {
      var curio = this.add.image(540, 450, "chest");
      curio.setInteractive();
      curio.on("pointerdown", () => {
      });
      curio.setScale(0.15);
    }

    crusader.setScale(0.3);
    bandit.setScale(0.3);
  }

  update() {
    if (this.cursors.right.isDown) {
      this.equipe.x += 10;
      this.updateChildren();
    }
    if (this.cursors.left.isDown) {
      this.equipe.x -= 5;
      this.updateChildren();
    }
    if (this.cursors.up.isDown && this.canGoToprochaineSalle()) {
      this.scene.start("Salle");
    }
  }

  updateChildren() {
    var relativePosition = 200;
    var i = 0;
    this.equipe.getChildren().forEach((child) => {
      child.x = relativePosition - i + this.equipe.x;
      child.y = this.equipe.y;
      i += 75;
    });
  }

  canGoToprochaineSalle() {
    return this.prochaineSalle.getBounds().x - this.equipe.x - 200 < 0;
  }

  getprochaineSalle() {
      return this.prochaineSalle;
  }
}
