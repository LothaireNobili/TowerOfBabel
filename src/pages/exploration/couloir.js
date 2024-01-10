class Couloir extends Phaser.Scene {
  cursors;
  equipe;
  prochaineSalle;
  moveRight;
  moveLeft;
  goInsideNextRoom;
  goingRight = false;
  goingLeft = false;
  constructor() {
    super({ key: "Couloir" });
    this.graphicManager = new GraphicManager();
  }

  preload() {
    this.load.image(
      "background_corridor",
      "./assets/images/exploration/Corridor1.jpg"
    );
    this.load.image("chest", "./assets/images/exploration/chest.jpg");
    this.load.image("move", "./assets/icons/yellow_right_arrow.png");

    this.load.image(
      "prochaineSalle",
      "./assets/images/exploration/mapBackground.jpg"
    );

   
    for (let hero of game.config.allHeroList) {
      this.load.spritesheet(
        hero,
        "images/heroes/" + hero + "/animations/walk.png",
        {
          frameWidth:
            this.graphicManager.spriteSheetDatas[hero].walk.frameWidth,
          frameHeight:
            this.graphicManager.spriteSheetDatas[hero].walk.frameHeight,
        }
      );
    }
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(540, 360, "background_corridor").setScale(1.7, 1.7);
    this.moveRight = this.add.image(300, 650, "move").setScale(0.05);
    this.moveLeft = this.add.image(150, 650, "move").setScale(0.05);
    this.goInsideNextRoom = this.add.image(900, 300, "move").setScale(0.05);
    this.prochaineSalle = this.add
      .image(900, 450, "prochaineSalle")
      .setScale(0.2, 0.2);

    this.moveLeft.flipX = true;

    this.moveRight.setInteractive();
    this.moveLeft.setInteractive();
    this.goInsideNextRoom.setInteractive();

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

    this.goInsideNextRoom.on("pointerdown", () => {
      game.scene.stop("Couloir");
      game.scene.start("Salle");
    });

    // on creer un group pour controler l'ensemble de l'equipe plutot que de controler chaque heros individuellement
    this.equipe = this.add.group();
    this.equipe.x = 175;
    this.equipe.y = 450;

    //on ajoute les heros, les positions sont relatives au centre de l'equipe
    this.ajouterEquipe();


    for (let hero of game.config.allHeroList) {
      this.anims.create({
        key: hero + "_walk", // Animation key (can be any string)
        frames: this.anims.generateFrameNumbers(hero, {
          scale: 2,
          start: 0,
          end: this.graphicManager.spriteSheetDatas[hero].walk.end, //index of the last frame of the animation
        }),
        frameRate: 20, // Number of frames to display per second
        repeat: -1, // Set to -1 to loop the animation continuously, or a positive integer to specify the number of times to repeat
      });
    }

    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();
  }

  update() {
    if (
      (this.goingRight || this.cursors.right.isDown) &&
      this.equipe.x < game.config.width - 250
    ) {
      this.equipe.x += 10;
      this.updateChildren();
    }
    if (50 < this.equipe.x && (this.goingLeft || this.cursors.left.isDown)) {
      this.equipe.x -= 5;
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
    this.equipe.getChildren().forEach((child) => {
      child.x = relativePosition - i + this.equipe.x;
      child.y = this.equipe.y+150;
      i += 75;
    });
  }

  canGoToprochaineSalle() {
    return this.prochaineSalle.getBounds().x - this.equipe.x - 200 < 0;
  }

  getprochaineSalle() {
    return this.prochaineSalle;
  }
  ajouterEquipe() {
    for (let hero of EQUIPE) {
      var equipier = this.add.sprite(0, 0, "walk_" +hero).play(hero+"_walk").setOrigin(0.5, 1);
      this.equipe.add(equipier);
      equipier.setScale(0.5);
    }
    this.updateChildren();
  }
}
