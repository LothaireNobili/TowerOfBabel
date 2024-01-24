const TYPE_SALLE = [
  ["Vide", 2],
  ["Combat", 5],
  ["Curio", 4],
  ["Combat&Curio", 8],
];
let etage = [];
nbSalle = 0;
class Escalier extends Phaser.Scene {
  salles = [];
  couloirs = [];
  constructor() {
    super({ key: "Escalier" });
  }
  create() {
    var positions = [
      [500, 500],
      [400, 600],
      [700, 500],
      [800, 600],
    ];
    var background = this.add.image(540, 360, "feu");
    for (var i = 0; i < listSelectedHeroes.length; i++) {
      var equipier = this.add
        .image(positions[i][0], positions[i][1], listSelectedHeroes[i])
        .setScale(0.7);
      if (i > 1) equipier.flipX = true;
    }
    var flecheMontante = this.add.image(725, 220, "move").setScale(0.25);
    flecheMontante.rotation = -1.5;
    flecheMontante.setInteractive();
    flecheMontante.on("pointerdown", () => {
      this.goToNextFloor();
    });

    var prochainEtage = this.add.text(
      320,
      200,
      "Passer à l'étage superieur",
      setFontStyles("30px")
    );
    prochainEtage.setInteractive();
    prochainEtage.on("pointerdown", () => {
      this.goToNextFloor();
    });

    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();

    this.construireEtage();
    etage = this.salles;
  }

  determinerMaxSalle() {
    var max_salle = [
      [0, 3, 5],
      [2, 5, 7],
      [5, 9, 15],
      [8, 13, 18],
    ];
    var max = max_salle.length - 1;
    for (var i = 0; i < max_salle.length - 1; i++) {
      if (
        max_salle[i][0] <= window.myScene.etage &&
        window.myScene.etage < max_salle[i + 1][0]
      ) {
        return Math.floor(
          Math.random() * (max_salle[i][2] - max_salle[i][1]) + max_salle[i][1]
        );
      }
    }
    return Math.floor(
      Math.random() * (max_salle[max][2] - max_salle[max][1]) +
        max_salle[max][1]
    );
  }

  goToNextFloor() {
    window.myScene.nouvelEtage = true;
    window.myScene.nbSalle = this.determinerMaxSalle();
    this.scene.start("Salle");
  }

  construireEtage() {
    this.salle = [];
    let salle=[];
    etage=[]
    salle = new Salle("Debut");
    salle.position = [0, 0];
    let salles = [salle];
    let max_salle = this.determinerMaxSalle();

    while (salles.length < max_salle) {
      let salle = this.determinerProchaineSalle();
      let precedenteIndex = this.choisirIndexSalleAleatoire(salles);
      let precedente = salles[precedenteIndex];
     switch(false)
     {
      case precedente.est:{precedente.est=salle; salle.ouest=precedente; break}
      case precedente.nord:{precedente.nord=salle; salle.sud=precedente; break}
      case precedente.ouest:{precedente.ouest=salle; salle.est=precedente; break}
      case precedente.sud:{precedente.sud=salle;salle.nord=precedente; break}
      default : console.log("unforseen events happen sometimes")
     } 

      salles.push(salle)
    }

    let precedente = this.choisirIndexSalleAleatoire(salles);
    salle = new Salle("Fin");
    salle.position = [0, 0]; //this.determinerProchainePosition(salles,precedente)

    salles.push(salle);
    var i = 0
    salles.forEach((salle) => {
      i++
      salle.etage = window.myScene.etage + 1;
           console.warn(salle.type)
     console.log(i)
     console.log("est:")
     console.log(salle.est)
     console.log("nord:")
     console.log(salle.nord)
     console.log("sud:")
     console.log(salle.sud)
     console.log("ouest:")
     console.log(salle.ouest)
    });

    this.salles = salles;
  }

  getTotalPoidsSalle() {
    var total = 0;
    for (var i = 0; i < TYPE_SALLE.length; i++) {
      total += TYPE_SALLE[i][1];
    }
    return total;
  }

  /*remplireSalles()
  {
      let rooms=this.construireEtage()
      for (room in rooms)
      {
          position=this.determinerProchainePosition()
          this.salles.push([room,position]);
      }
  }*/

  determinerProchainePosition(salles, precedente) {
    if (salles.length == 0) return [0, 0];
      return [0,0];
  }

  determinerProchaineSalle() {
    var totalPoidsSalle = this.getTotalPoidsSalle();
    var random = Math.floor(Math.random() * totalPoidsSalle);
    let prochaineSalle = new Salle();
    for (var i = 0; i < TYPE_SALLE.length; i++) {
      random -= TYPE_SALLE[i][1];
      if (random <= 0) {
        prochaineSalle.setType(TYPE_SALLE[i][0]);
        return prochaineSalle;
      }
    }
    prochaineSalle.setType(TYPE_SALLE[0][0]);
    return prochaineSalle;
  }

  choisirIndexSalleAleatoire(salles) {
    return Math.floor(Math.random() * salles.length);
  }
  choisirSalleAleatoire(salles) {
    return salles[this.choisirIndexSalleAleatoire(salles)];
  }

  toString() {
    let str = "";
    for (let i = 0; i < this.salles.length; i++) {
      str += this.salles[i].type + " " + this.salles[i].position + "\n";
    }
    return str;
  }
}
