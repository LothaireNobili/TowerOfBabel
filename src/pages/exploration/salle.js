class Salle extends Phaser.Scene {
  etage = 0; //etage actuelle
  clear; //si on peut passer a la salle suivant
  type = "Debut"; //type de la salle actuelle
  prochaineSalle; // type de la prochaine salle
  curio; // determine si il il y a un curio dans cette salle
  fight;
  couloir; //prochain couloir
  premiereSalle;
  fighting;
  coffre;
  nouvelEtage = false;
  nbSalle = 0;
  content;
  battleBegin;
  fightStartGroup;
  positions = [400, 300, 200, 100];
  barreInfo
  salleVisitee = 0;
  position;

  speedrun=true;
  constructor() {
    super({ key: "Salle" });

    if (this.etage == 0 && this.type == "Debut") {
      this.premiereSalle = true;
      this.curio = true;
      this.prochaineSalle = "Fin";
      this.clear = true;
      this.fight = false;
    }else
    {
      this.type=type;
    }
    this.graphicManager = new GraphicManager();
  }

 

  create() {
    for (var i = 0; i < 10; i++) this.reset();
    window.myScene = this;

    if (!(this.prochaineSalle == null || this.premiereSalle))
      this.type = this.prochaineSalle;

    var background = this.add.image(540, 360, "background_salle");
    this.setRoomContent();

    for (var i = 0; i < listSelectedHeroes.length; i++) {
      var equipier = this.add
        .sprite(this.positions[i], 600, "idle_" + listSelectedHeroes[i])
        .play(listSelectedHeroes[i] + "_idle")
        .setOrigin(0.5, 1);
      equipier.setScale(0.7);
    }
    this.placerCoffre();
    this.placerCouloir();
    this.creerCurio();

    this.fighting = this.add.image(540, 300, "startFight").setScale(0.5);

    this.fighting.setInteractive();

    this.fighting.on("pointerdown", () => {
      window.myScene = this;
      game.scene.stop("Salle");
      game.scene.start("bootFight");
      this.clear = true;
    });

    //this.content of room

    this.floor = this.add.text(
      30,
      game.config.height - 50,
      "FLOOR : " + this.etage,
      setFontStyles("40px")
    );

    if (this.etage != 0) this.determinerProchaineSalle();
    this.premiereSalle = false;

    this.barreInfo = new BarreInfo(this);
    this.barreInfo.creerBarreInfo();

    if (this.speedrun)this.clear=true
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

  setType(type)
  {
    this.type=type;
  }

  placerlistSelectedHeroes() {
    for (var i = 0; i < listSelectedHeroes.length; i++) {
      var equipier = this.add.image(
        this.positions[i][0],
        this.positions[i][1],
        listSelectedHeroes[i] + "_exploration"
      );
      equipier.setScale(0.3);
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

    this.couloir.setScale(0.2);
  }
  creerCurio() {
    //image de fond des curios
    var addedGold = this.determinerGold();
    var boutiqueBackground = this.add.image(
      game.config.width / 2,
      game.config.height / 2,
      "boutiqueBg"
    );
    boutiqueBackground.displayWidth =
      game.config.width - game.config.width / 10;
    boutiqueBackground.displayHeight =
      game.config.height - game.config.height / 10;
    //boutton pour quitter l'ecran des curios
    var closeButton = this.add.image(950, 120, "closeButton").setScale(0.1);
    var loot = this.add.text(
      game.config.width / 2 - 150,
      game.config.height / 2 - 200,
      "LOOT !",
      setFontStyles("80px")
    );
    var money = this.add.image(
      game.config.width / 2 - 45,
      game.config.height / 2,
      "money"
    );
    money.setScale(0.7);
    var moneyValue = this.add.text(
      game.config.width / 2 + 25,
      game.config.height / 2 - 50,
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
    this.content.add(loot);
    this.content.add(moneyValue);
    this.content.add(closeButton);
    this.setChildInteractive(this.content,addedGold);

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

  setChildInteractive(content,addedGold) {
    for (let i = 0; i < content.children.entries.length; i++) {
      let child = content.children.entries[i];
      child.setInteractive();
      child.on("pointerdown", () => {
        user.updateCoins(addedGold);
        this.barreInfo.updateCoins(user.coins)
        this.coffre.disableInteractive();
        this.turnOff(this.content);
      });
    }
  }
}
