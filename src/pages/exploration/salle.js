const EQUIPE = ["crusader", "bandit", "bandit", "vestal"];
const BACKGROUNDS = ["ruin_background2.png", "ruin_background1.png"];
const TYPE_SALLE = [
  ["Vide", 2],
  ["Combat", 3],
  ["Combat&Curio", 4],
  ["Curio", 1],
];

class Salle extends Phaser.Scene {
  etage = 0; //etage actuelle
  clear; //si on peut passer a la salle suivant
  type = "Debut"; //type de la salle actuelle
  prochaineSalle; // type de la prochaine salle
  curio; // determine si il il y a un curio dans cette salle
  fight;
  couloir; //prochain couloir
  premiereSalle;
  //debug variables
  fighting;
  coffre;
  nouvelEtage = false;
  nbSalle = 0;
  content;

  positions = [
    [400, 650],
    [300, 650],
    [200, 650],
    [100, 650],
  ];

  salleVisitee = 0;
  constructor() {
    super({ key: "Salle" });

    if (this.etage == 0 && this.type == "Debut") {
      this.premiereSalle = true;
      this.curio = true;
      this.prochaineSalle = "Fin";
      this.clear = true;
      this.fight = false;
    }
       this.graphicManager = new GraphicManager();
  }

  preload() {
    var chosenGround =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

    this.load.image(
      "background",
      "./assets/images/exploration/" + chosenGround
    );
    this.load.image("chest", "./assets/images/exploration/chest.jpg");

    for (var i = 0; i < EQUIPE.length; i++) {
      this.load.image(
        EQUIPE[i] + "_exploration",
        "./assets/images/heroes/" + EQUIPE[i] + "/idle.png"
      );
    }
    this.load.image("boutiqueBg", "./assets/images/hameau/boutique_bg.png");
    this.load.image("money", "./assets/icons/piece.png");
    this.load.image("couloir", "./assets/icons/yellow_right_arrow.png");
    this.load.image(
      "startFight",
      "./assets/images/fight_misc/announcement_combat.png"
    );
  }

  create() {
    for (var i = 0; i < 10; i++) this.reset();
    window.myScene = this;

    if (!(this.prochaineSalle == null || this.premiereSalle))
      this.type = this.prochaineSalle;

    var background = this.add.image(540, 360, "background");
    this.setRoomContent();
    this.placerEquipe();
    this.placerCoffre();
    this.placerCouloir();
    this.creerCurio();
    //FOR DEBUG ONLY
    this.fighting = this.add.image(
      game.config.width / 2,
      game.config.height / 2,
      "startFight"
    );
    this.fighting.setInteractive();

    this.fighting.on("pointerdown", () => {
      window.myScene = this;
      game.scene.stop("Salle");
      game.scene.start("bootFight");
      this.clear = true;
    }); //DEBUG ONLY

    //this.content of room

    this.floor = this.add.text(600, 20, "etage  :" + this.etage, {
      font: "40px Arial",
      fill: "white",
    }); //DEBUG ONLY

    var shine = this.add.text(600, 20, "Shine", {
      font: "80px Arial",
      fill: "white",
    }); //DEBUG ONLY

    shine.setInteractive();//!ACTIVE DEBUG ONLY
    shine.on("pointerdown", () => {
      game.scene.stop("Salle");
      game.scene.start("GameOver");
    }); //!DEBUG ONLY
    if (this.etage != 0) this.determinerProchaineSalle();
    this.premiereSalle = false;

    
    

    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();
  }

  update() {
    this.couloir.setVisible(this.clear);
    this.fighting.setVisible(!this.clear);
    if (this.curio && this.clear) this.coffre.setVisible(true);
    if (window.myScene.returnFromFight) {
      window.myScene.returnFromFight = false;
      this.clear = true;
    }
  }
  placerEquipe() {
    for (var i = 0; i < EQUIPE.length; i++) {
      var equipier = this.add.sprite(this.positions[i][0], this.positions[i][1], "idle_" + EQUIPE[i]).play(EQUIPE[i]+"_idle").setOrigin(0.5, 1);
      equipier.setScale(0.7);
    }
    
  }
  placerCoffre() {
    this.coffre = this.add.image(540, 450, "chest");
    this.coffre.setScale(0.15);
    this.coffre.setInteractive();
    this.coffre.on("pointerdown", () => {
      this.turnOn(this.content);
    });
    this.coffre.setVisible(this.curio);
    if (!this.clear) {
      this.coffre.setVisible(false);
    }
  }
  placerCouloir() {
    this.couloir = this.add.image(1000, 400, "couloir");
    this.couloir.setInteractive();
    this.couloir.on("pointerdown", () => {
      this.goToprochaineSalle();
    });
    this.couloir.setScale(0.05);
  }
  creerCurio() {
    //image de fond des curios
    var addedGold = this.determinerGold();
    var boutiqueBackground = this.add.image(530, 300, "boutiqueBg");
    boutiqueBackground.displayWidth = 1000;
    boutiqueBackground.displayHeight = 580;
    //boutton pour quitter l'ecran des curios
    var money = this.add.image(500, 300, "money");
    money.setScale(0.5);
    var moneyValue = this.add.text(
      game.config.width / 2 + 50,
      game.config.height / 2 - 100,
      addedGold,
      {
        font: "80px Arial",
        fill: "white",
      }
    );
    //groupe contenant l'ensemble des objets relatifs a l'ecran des curios
    this.content = this.add.group();
    this.content.add(boutiqueBackground);
    this.content.add(money);
    this.content.add(moneyValue);
    money.setInteractive();
    money.on("pointerdown", () => {
      user.updateCoins(addedGold);
      this.coffre.disableInteractive();
      this.turnOff(this.content);
    });
    this.turnOff(this.content);
  }
  turnOff(content) {
    content.getChildren().forEach((child) => {
      child.setVisible(false);
    });
  }

  turnOn(content) {
    content.getChildren().forEach((child) => {
      child.setVisible(true);
    });
  }

  setRoomContent() {
    if (this.type == "Debut") {
      this.curio = true;
      this.fight = false;
      this.clear = true;
    }

    if (this.type == "Fin") {
      this.curio = true;
      this.fight = true;
      this.clear = false;
    }

    if (this.type == "Vide") {
      this.curio = false;
      this.fight = false;
      this.clear = true;
    }

    if (this.type == "Combat") {
      this.curio = false;
      this.fight = true;
      this.clear = false;
    }

    if (this.type == "Curio") {
      this.curio = true;
      this.fight = false;
      this.clear = true;
    }
    if (this.type == "Combat&Curio") {
      this.curio = true;
      this.fight = true;
      this.clear = false;
    }
  }

  determinerProchaineSalle() {
    if (this.type == "Debut") {
      this.prochaineSalle = "Curio";
    } else {
      var totalPoidsSalle = this.getTotalPoidsSalle();
      var random = Math.floor(Math.random() * totalPoidsSalle);

      for (var i = 0; i < TYPE_SALLE.length - 1; i++) {
        random -= TYPE_SALLE[i][1];
        if (random <= 0) {
          this.prochaineSalle = TYPE_SALLE[i][0];
          i = TYPE_SALLE.length + 1;
        }
      }

      this.salleVisitee += 1;
    }
    if (this.nbSalle <= this.salleVisitee) {
      this.prochaineSalle = "Fin";
    }
  }

  determinerGold() {
    var goldPerFloor = [
      [3, 500, 750],
      [5, 650, 1250],
      [7, 800, 2000],
      [10, 2500, 3000],
    ];

    for (var i = 0; i < goldPerFloor.length; i++) {
      if (this.etage == 0) return 250;
      if (window.myScene.etage < goldPerFloor[i][0])
        return Math.floor(
          Math.random() * (goldPerFloor[i][2] - goldPerFloor[i][1]) +
            goldPerFloor[i][1]
        );
    }
    return 5000;
  }

  goToprochaineSalle() {
    game.scene.stop("Salle");
    if (this.type == "Fin") {
      game.scene.start("Escalier");
    } else {
      game.scene.start("Couloir");
    }
  }

  getTotalPoidsSalle() {
    var total = 0;
    for (var i = 0; i < TYPE_SALLE.length; i++) {
      total += TYPE_SALLE[i][1];
    }
    return total;
  }

  reset() {
    try {
      if (window.myScene.nouvelEtage) {
        this.prochaineSalle = "Debut";
        this.etage += 1;
        this.clear = true;
        this.fight = false;
        this.nouvelEtage = false;
        this.nbSalle = window.myScene.nbSalle;
        window.myScene = this;
        this.salleVisitee = 0;
      }
    } catch (e) {}
  }

  static returnToRoom() {
    window.myScene.returnFromFight = true;
    game.scene.stop("playFight");
    game.scene.start(window.myScene);
  }
}
