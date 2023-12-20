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
  nouvelEtage=false;
  maxSalle=3;
  typeSalle=[["Vide",0.1],["Curio",0.3],["Combat",0.7],["Combat&Curio",1]];
  salleVisitee=0
  constructor() {
    super({ key: "Salle" });    

  
    if (this.etage == 0 && this.type == "Debut") {
      this.premiereSalle=true
      this.curio = true;
      this.prochaineSalle = "Fin";
      this.clear = true;
      this.fight = false;
    }
    
  }

  preload() {
    this.load.setBaseURL("./assets/");
    this.load.image("background", "images/exploration/ruin_background1.png");
    this.load.image("chest", "images/exploration/chest.jpg");
    this.load.image("crusader", "images/heroes/crusader/idle.png");
    this.load.image("bandit", "images/heroes/bandit/skill1.png");
    this.load.image("boutiqueBg", "images/hameau/boutique_bg.png");
    this.load.image("close", "images/exploration/close.jpg");
    this.load.image("couloir", "icons/cercle_red.png");
  }

  create() {
    this.reset();
    window.myScene = this;
   
   if(this.prochaineSalle==null||this.premiereSalle) {
    }
    else
    {
      this.type=this.prochaineSalle;
    }
    
    this.setRoomContent();

    var map = this.add.container(0, 0);
    var background = this.add.image(540, 360, "background");
    var crusader = this.add.image(400, 450, "crusader");
    var bandit = this.add.image(300, 450, "bandit");
    this.coffre = this.add.image(540, 450, "chest");

    this.coffre.setScale(0.15);
    crusader.setScale(0.3);
    bandit.setScale(0.3);

    //FOR DEBUG ONLY
    this.fighting = this.add.text(20, 20, "Begin fight", {
      font: "40px Arial",
      fill: "white",
    }); //deletable
    this.fighting.setInteractive();
   
     this.fighting.on("pointerdown", () => {
      /*
      game.scene.start("LoadingFight");*/
      this.clear=true;
    });

    //content of room

    this.couloir = this.add.image(1000, 400, "couloir");
    this.couloir.setInteractive();
    this.couloir.on("pointerdown", () => {
      this.goToprochaineSalle();
    });

    //image de fond des curios
    var boutiqueBackground = this.add.image(530, 300, "boutiqueBg");
    boutiqueBackground.displayWidth = 1000;
    boutiqueBackground.displayHeight = 580;
    //boutton pour quitter l'ecran des curios
    var closeButton = this.add.image(1000, 100, "close");
    closeButton.setScale(0.1);

    //groupe contenant l'ensemble des objets relatifs a l'ecran des curios
    var content = this.add.group();
    content.add(boutiqueBackground);
    content.add(closeButton);

    this.turnOff(content);

    this.coffre.setInteractive();
    closeButton.setInteractive();

    this.coffre.on("pointerdown", () => {
      this.turnOn(content);
    });

    closeButton.on("pointerdown", () => {
      this.turnOff(content);
    });
    this.coffre.setVisible(this.curio)
    if(!this.clear)
    {
      this.coffre.setVisible(false)
    }

 

    this.add.text(400, 20, this.type, {
      font: "40px Arial",
      fill: "white",
    }); //deletable

    if(this.etage!=0)this.determinerProchaineSalle();
    this.premiereSalle=false;
  }

  update() {
    this.couloir.setVisible(this.clear);
    this.fighting.setVisible(!this.clear);
    if(this.curio &&this.clear) this.coffre.setVisible(true)
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

  setRoomContent()
  {
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
    if(this.type == "Combat&Curio")
    {
      this.curio = true;
      this.fight = true;
      this.clear = false;
    }
  }

  determinerProchaineSalle()
  {
    if(this.type=="Debut")
    {
      this.prochaineSalle="Curio"
    }
    else
    {
      var salle;
      var random  =Math.random();
      for (var i =0 ; i < this.prochaineSalle.length ; i++)
      {
        if(random>this.ProchaineSalle[i][2])this.prochaineSalle=this.ProchaineSalle[i][1];
      }


      console.log(Math.floor(Math.random() * this.typeSalle.length))
      console.log(this.prochaineSalle)
      this.salleVisitee+=1
    }
    if(this.maxSalle<=this.salleVisitee)
    {
      console.log(this.prochaineSalle)
      this.prochaineSalle="Fin"
    }
  }

  determinerMaxSalle()
  {
    console.log("nombre de salles")
    console.log(Math.floor(Math.log2(this.etage+1))-1)
  }

  goToprochaineSalle() {
    if (this.type == "Fin") {
      this.scene.start("Escalier");
    } else {
      this.scene.start("Couloir");
    }
  }
  reset()
  {
    try
    {
      this.determinerMaxSalle()
      console.log("nouvel etage ?")
      console.log(window.myScene.nouvelEtage)
      if(window.myScene.nouvelEtage)
      {
        this.prochaineSalle="Debut";
        this.etage +=1
        this.clear=true;
        this.fight=false;
        this.nouvelEtage=false;
        window.myScene=this;
        this.salleVisitee=0
        console.log(this)
      }
   
     
    }
    catch(e){
      console.error("window not set")
    }
    console.log("reset", this.type)
  }
}
