class Escalier extends Phaser.Scene 
{
    constructor() {
        super({ key: "Escalier" });     
      }

      preload()
      {
        this.load.setBaseURL("./assets/");
      //  this.load.image("feu", "images/exploration/escalier.jpg");
        this.load.image("feu", "images/exploration/ruin_background1.png");
        
        this.load.image("crusader", "images/heroes/crusader/idle.png");
        this.load.image("bandit", "images/heroes/bandit/skill1.png");
        this.load.image("prochainEtage","icons/cercle_red.png")
      }

      create()
      {
        var positions=[[500,500],[700,500],[800,600],[400,600]]
        var equipe =["crusader","bandit","crusader","bandit"]
        var background = this.add.image(540, 360, "feu");
        for(var i = 0;i<equipe.length;i++)
        {
            this.add.image(positions[i][0],positions[i][1],equipe[i]).setScale(0.3);
        }
        
        var prochainEtage= this.add.image(570,300,"prochainEtage");
        prochainEtage.setInteractive();
        prochainEtage.on("pointerdown", () => {        
           window.myScene.nouvelEtage=true;
           this.scene.start("Salle");
          });

        this.fighting = this.add.text(350, 20, "Entre deux Etages", {
            font: "40px Arial",
            fill: "white",
          }); //deletable
      }

      update(){}
}