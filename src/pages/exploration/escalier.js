const TYPE_SALLE=[["Vide",2],["Combat",5],["Curio",4],["Combat&Curio",8]]
class Escalier extends Phaser.Scene {

  salles=[]
  couloirs=[]
  constructor() {
    super({ key: "Escalier" });
  }
      create()
      {

        var positions=[[500,500],[400,600],[700,500],[800,600]]
        var background = this.add.image(540, 360, "feu");
        for(var i = 0;i<listSelectedHeroes.length;i++)
        {
            var equipier = this.add.image(positions[i][0],positions[i][1],listSelectedHeroes[i]).setScale(0.7);
            if(i>1) equipier.flipX=true
        }
        var flecheMontante=this.add.image(725,220,"move").setScale(0.25)
        flecheMontante.rotation=-1.5
        flecheMontante.setInteractive()
        flecheMontante.on("pointerdown", () => {        
          this.goToNextFloor()
         });

        var prochainEtage= this.add.text(320,200,"Passer à l'étage superieur",setFontStyles("30px"));
        prochainEtage.setInteractive();
        prochainEtage.on("pointerdown", () => {        
          this.goToNextFloor()
          });
          
          const barreInfo = new BarreInfo(this);
        barreInfo.creerBarreInfo();

        this.remplireSalles()
        console.log(this.salles)
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


  goToNextFloor(){
    window.myScene.nouvelEtage=true;
          window.myScene.nbSalle=this.determinerMaxSalle()
          this.scene.start("Salle");
  }


  construireEtage()
  {
    this.salle=[]
    let salle=new Salle()
    salle.type="Debut"
    salle.position=[0,0]
    let salles=[salle]
    let max_salle=this.determinerMaxSalle();

    while(salles.length<max_salle)
    {
      let prochaineSalle = this.determinerProchaineSalle()
      if(prochaineSalle.type!="Debut") salles.push(prochaineSalle);
      console.log(this.choisirSalleAleatoire(salles).type)

   
    }
    salle=new Salle()
    salle.type="Fin"
    salles.push(salle)

    this.salles=salles;
    
  }

  getTotalPoidsSalle() {
    var total = 0;
    for (var i = 0; i < TYPE_SALLE.length; i++) {
      total += TYPE_SALLE[i][1];
    }
    return total;
  }

  remplireSalles()
  {
      let rooms=this.construireEtage()
      for (room in rooms)
      {
          position=this.determinerProchainePosition()
          this.salles.push([room,position]);
      }
  }

  determinerProchainePosition()
  {
      if(this.salles.length==0)return [0,0]
      else 
      {
        
      }

  }

  determinerProchaineSalle()
  {
    var totalPoidsSalle = this.getTotalPoidsSalle();
    var random = Math.floor(Math.random() * totalPoidsSalle);
    let prochaineSalle=new Salle();
    for (var i = 0; i < TYPE_SALLE.length; i++) {
      random -= TYPE_SALLE[i][1];
      if (random <= 0) {
        prochaineSalle.setType(TYPE_SALLE[i][0])
        return prochaineSalle
      }
    }
    prochaineSalle.setType(TYPE_SALLE[0][0])
    return prochaineSalle
  }

  choisirSalleAleatoire(salles)
  {
      return salles[Math.floor(Math.random()*salles.length)]
  }
}
