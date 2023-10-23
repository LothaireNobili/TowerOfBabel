var heroList = ["crusader"];
var enemyList = ["skeleton"];
var fighterList = [...heroList, ...enemyList]; //combine both list by reference, if a hero die, it will be removed from figtherList

class LoadingFight extends Phaser.Scene {
    constructor(){
        super("bootGame"); //REMEMBER TO CHANGE THAT WHEN NOT IN PROTOTYPING STATE ANYMORE (for team composition)
    }

    preload(){

        this.load.image("background", "assets/images/ruin_background1.png")

        for (let i = 0; i < fighterList.length; i++){
            this.load.image(fighterList[i], "assets/images/"+fighterList[i]+"_wait.png")
        }  
        /*this.load.image("crusader", "assets/images/crusader_wait.png")
        this.load.image("skeleton", "assets/images/skeleton_wait.png")*/
    }

    create(){
        this.add.text(20, 20, "Loading...", {font: "40px Arial", fill:"white"});
        this.scene.start("playFight");  
    }
}