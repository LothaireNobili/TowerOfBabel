class GameOver extends Phaser.Scene 
{
    position = [200,400,600,800]
    constructor() {
        super({ key: "GameOver" });     
      }
      preload()
    {
        for(var i = 0; i <EQUIPE.length; i++) 
        {
            this.load.image(
                EQUIPE[i] + "_iconsDeath",
                "./assets/images/heroes/" + EQUIPE[i] + "/portrait.png"
              );
        }
        this.load.image("defeat", "./assets/images/exploration/defeat.jpg");       
    }
    create()
    {
        this.add.image(game.config.width/2,game.config.height/2 ,"defeat");
        this.add.text(game.config.width/2-100,game.config.height/2+100,"Total Earnt Gold : "+(user.coins-GOLDEARNT))
        for(var i = 0; i <EQUIPE.length; i++) 
        {
            console.log(EQUIPE[i]);
            this.add.image(this.position[i],600,EQUIPE[i]+"_iconsDeath")
        }
       
    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();
    }
    
}
