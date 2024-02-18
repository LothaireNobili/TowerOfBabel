class Escalier extends Phaser.Scene {
  constructor() {
    super({ key: "Escalier" });
  }


    preload(){
        this.load.image("feu", "./assets/images/exploration/escalier.jpg");
        for (var i = 0; i < listSelectedHeroes.length; i++) {
          this.load.image(
            listSelectedHeroes[i].heroName + "_escalier",
            "./assets/images/heroes/" + listSelectedHeroes[i].heroName + "/idle.png"
          );
        }
      }

      create()
      {
        var positions=[[500,500],[400,600],[700,500],[800,600]]
        var background = this.add.image(540, 360, "feu");
        for(var i = 0;i<listSelectedHeroes.length;i++)
        {
            var equipier = this.add.image(positions[i][0],positions[i][1],listSelectedHeroes[i].heroName).setScale(0.7);
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
      }
  

  update() {}

  determinerMaxSalle() {
    var max_salle = [
      [0, 1, 3],
      [2, 2, 4],
      [5, 4, 8],
      [8, 6, 12],
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
}
