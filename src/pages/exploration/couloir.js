class Couloir extends Phaser.Scene {
  cursors;
  equipe;
  prochaineSalle;
  moveRight;
  moveLeft;
  constructor() {
    super({ key: "Couloir" });
  }

  preload() {
    this.load.image("background_corridor", "./assets/images/exploration/Corridor1.jpg");
    this.load.image("chest", "./assets/images/exploration/chest.jpg");
    this.load.image("move", "./assets/icons/yellow_right_arrow.png");

    for (var i = 0; i < EQUIPE.length; i++) {
      this.load.image(
        EQUIPE[i] + "_couloir",
        "./assets/images/heroes/" + EQUIPE[i] + "/idle.png"
      );
    }
    this.load.image("prochaineSalle", "./assets/images/exploration/mapBackground.jpg");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(540, 360, "background_corridor").setScale(1.7, 1.7);
    this.moveRight=  this.add.image(300, 650, "move").setScale(0.05);
    this.moveLeft=  this.add.image(300, 650, "move").setScale(0.05);
    this.prochaineSalle = this.add
      .image(900, 450, "prochaineSalle")
      .setScale(0.2, 0.2);

    // on creer un group pour controler l'ensemble de l'equipe plutot que de controler chaque heros individuellement
    this.equipe = this.add.group();
    this.equipe.x = 175;
    this.equipe.y = 450;

    //on ajoute les heros manuellement pour l'instnat , les positions sont relatives au centre de l'equipe
    this.ajouterEquipe();

    const barreInfo = new BarreInfo(this);
        barreInfo.creerBarreInfo();
  }

  update() {
    if (this.cursors.right.isDown&&this.equipe.x<game.config.width-250) {
      this.equipe.x += 10;
      this.updateChildren();
    }
    if (50<this.equipe.x&&this.cursors.left.isDown) {
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
  ajouterEquipe()
  {
    for (var i = 0; i < EQUIPE.length; i++) {
      var equipier = this.add.image(
        0,
        0,
        EQUIPE[i] + "_exploration"
      );
      this.equipe.add(equipier)
      equipier.setScale(0.3);
    }
    this.updateChildren();
  }
}
