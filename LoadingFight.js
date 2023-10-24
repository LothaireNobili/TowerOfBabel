var heroList = ["crusader"];
var enemyList = ["skeleton"];
var fighterList = [...heroList, ...enemyList]; //combine both list by reference, if a hero die, it will be removed from figtherList

class LoadingFight extends Phaser.Scene {
    constructor(){
        super("bootGame"); //REMEMBER TO CHANGE THAT WHEN NOT IN PROTOTYPING STATE ANYMORE (for team composition)
    }

    preload(){
        this.load.image("background", "assets/images/ruin_background1.png")

        //move that code to an animationLoader class
        for (let i = 0; i < heroList.length; i++){
            this.load.spritesheet(heroList[i], "assets/images/heroes/"+heroList[i]+"/animations/wait.png", {
                frameWidth: 117,
                frameHeight: 298
            })
        }  

        
        for (let i = 0; i < enemyList.length; i++){
            this.load.image(enemyList[i], "assets/images/enemies/"+enemyList[i]+"/wait.png")
        }  
        /*this.load.image("crusader", "assets/images/crusader_wait.png")
        this.load.image("skeleton", "assets/images/skeleton_wait.png")*/
    }

    create(){


        //move that code to an animationLoader class
        for (let i = 0; i < heroList.length; i++){
            this.anims.create({
                key: heroList[i]+'_wait', // Animation key (can be any string)
                frames: this.anims.generateFrameNumbers(heroList[i], {
                    start: 0,
                    end: 30
                }),
                frameRate: 20, // Number of frames to display per second
                repeat: -1, // Set to -1 to loop the animation continuously, or a positive integer to specify the number of times to repeat
            });
        }
        

        this.add.text(20, 20, "Loading...", {font: "40px Arial", fill:"white"});
        this.scene.start("playFight");  
    }
}