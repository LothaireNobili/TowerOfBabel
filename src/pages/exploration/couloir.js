class Couloir extends Phaser.Scene {
  cursors;
  listSelectedHeroes;
  prochaineSalle;
  moveRight;
  moveLeft;
  goInsideNextRoom;
  goingRight = false;
  goingLeft = false;
  constructor() {
    super({ key: "Couloir" });
  }

  preload() {
    this.load.image(
      "background_corridor",
      "./assets/images/exploration/Corridor1.png"
    );
    this.load.image("chest", "./assets/images/exploration/chest.jpg");
    this.load.image("move", "./assets/icons/yellow_right_arrow.png");

    for (var i = 0; i < listSelectedHeroes.length; i++) {
      this.load.image(
        listSelectedHeroes[i] + "_couloir",
        "./assets/images/heroes/" + listSelectedHeroes[i] + "/idle.png"
      );
    }
    this.load.image(
      "prochaineSalle",
      "./assets/images/exploration/mapBackground.jpg"
    );
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(540, 360, "background_corridor").setScale(1.7, 1.7);
    this.moveRight = this.add.image(300, 650, "move").setScale(0.20);
    this.moveLeft = this.add.image(150, 650, "move").setScale(0.20);
    this.goInsideNextRoom = this.add.image(900, 300, "move").setScale(0.20);
    this.prochaineSalle = this.add
      .image(900, 450, "prochaineSalle")
      .setScale(0.2, 0.2).setVisible(false);

    this.moveLeft.flipX = true;

    this.moveRight.setInteractive();
    this.moveLeft.setInteractive();
    this.goInsideNextRoom.setInteractive();

    this.deplacementSouris()

    this.goInsideNextRoom.on("pointerdown", () => {
      game.scene.stop("Couloir");
      game.scene.start("Salle");
    });

    // on creer un group pour controler l'ensemble de l'listSelectedHeroes plutot que de controler chaque heros individuellement
    this.listSelectedHeroes = this.add.group();
    this.listSelectedHeroes.x = 175;
    this.listSelectedHeroes.y = 500;

    //on ajoute les heros, les positions sont relatives au centre de l'listSelectedHeroes
    this.ajouterlistSelectedHeroes();

    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();
  }

  update() {
    if (
      (this.goingRight || this.cursors.right.isDown) &&
      this.listSelectedHeroes.x < game.config.width - 250
    ) {
      this.listSelectedHeroes.x += 10;
      this.updateChildren();
    }
    if (50 < this.listSelectedHeroes.x && (this.goingLeft || this.cursors.left.isDown)) {
      this.listSelectedHeroes.x -= 5;
      this.updateChildren();
    }
    if (this.cursors.up.isDown && this.canGoToprochaineSalle()) {
      game.scene.stop("Couloir");
      game.scene.start("Salle");
    }
    this.goInsideNextRoom.setVisible(this.canGoToprochaineSalle());
  }

  updateChildren() {
    var relativePosition = 200;
    var i = 0;
    this.listSelectedHeroes.getChildren().forEach((child) => {
      child.x = relativePosition - i + this.listSelectedHeroes.x;
      child.y = this.listSelectedHeroes.y;
      i += 75;
    });
  }

  canGoToprochaineSalle() {
    return this.prochaineSalle.getBounds().x - this.listSelectedHeroes.x - 200 < 0;
  }

  deplacementSouris()
  {
    this.moveRight.on("pointerdown", () => {
      this.goingLeft = false;
      this.goingRight = true;
    });
    this.moveLeft.on("pointerdown", () => {
      this.goingLeft = true;
      this.goingRight = false;
    });

    this.moveRight.on("pointerup", () => {
      this.goingRight = false;
    });
    this.moveLeft.on("pointerup", () => {
      this.goingLeft = false;
    });

    this.moveRight.on("pointerout", () => {
      this.goingRight = false;
    });
    this.moveLeft.on("pointerout", () => {
      this.goingLeft = false;
    });

  }

  getprochaineSalle() {
    return this.prochaineSalle;
  }
  ajouterlistSelectedHeroes() {
    for (var i = 0; i < listSelectedHeroes.length; i++) {
      var equipier = this.add.image(0, 0, listSelectedHeroes[i] + "_exploration");
      this.listSelectedHeroes.add(equipier);
      equipier.setScale(0.3);
    }
    this.updateChildren();
  }
}
