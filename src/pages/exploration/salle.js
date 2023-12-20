const TYPE_SALLE=[["Vide",2],["Combat",3],["Combat&Curio",4],["Curio",1]];
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
    //this.load.setBaseURL("../../../assets/");
    this.load.image("background", "./assets/images/exploration/ruin_background1.png");
    this.load.image("chest", "./assets/images/exploration/chest.jpg");
    this.load.image("crusader", "./assets/images/heroes/crusader/idle.png");
    this.load.image("bandit", "./assets/images/heroes/bandit/skill1.png");
    this.load.image("boutiqueBg", "./assets/images/hameau/boutique_bg.png");
    this.load.image("close", "./assets/images/exploration/close.jpg");
    this.load.image("couloir", "./assets/icons/cercle_red.png");
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

      var totalPoidsSalle=this.getTotalPoidsSalle();
      var random  =Math.floor(Math.random()*totalPoidsSalle);

      for (var i =0 ; i < TYPE_SALLE.length-1 ; i++)
      {
        random-=TYPE_SALLE[i][1];
        if(random<=0)
        {this.prochaineSalle=TYPE_SALLE[i][0];
          i=TYPE_SALLE.length+1;
          console.log(this.prochaineSalle)
        }
      

      }

      this.salleVisitee+=1
    }
    if(this.maxSalle<=this.salleVisitee)
    {
      this.prochaineSalle="Fin"
    }
  }

  determinerMaxSalle()//TBD
  {


  }

  goToprochaineSalle() {
    if (this.type == "Fin") {
      this.scene.start("Escalier");
    } else {
      this.scene.start("Couloir");
    }
  }

  getTotalPoidsSalle()
  {
    var total=0;
    for (var i=0; i<TYPE_SALLE.length;i++)
    {
     total+=TYPE_SALLE[i][1]
    }
    return total
  }

  reset()
  {
    try
    {
      this.determinerMaxSalle()

      if(window.myScene.nouvelEtage)
      {
        this.prochaineSalle="Debut";
        this.etage +=1
        this.clear=true;
        this.fight=false;
        this.nouvelEtage=false;
        window.myScene=this;
        this.salleVisitee=0

      }
   
     
    }
    catch(e){
      console.error("window not set")
    }
  
  }
}