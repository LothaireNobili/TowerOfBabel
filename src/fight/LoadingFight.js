var heroList = ["crusader", "bandit"];
var enemyList = ["skeleton","skeleton", "skeleton", "skeleton"];
var initialFighterList = [...heroList, ...enemyList]; //->contrary to previous indication, it doesn't merge the lists by reference, it just merges them

class LoadingFight extends Phaser.Scene {
    constructor(){
        super("bootFight"); //REMEMBER TO CHANGE THAT WHEN NOT IN PROTOTYPING STATE ANYMORE (for team composition)
        this.graphicManager = new GraphicManager();
    }

    preload(){

        document.body.style.cursor = "default";

        this.load.image("background", "./assets/images/ruin_background1.png")
        this.load.image('fight_announcement', './assets/images/fight_misc/announcement_combat.png');

        this.load.image("current_fighter_select", "./assets/images/fight_misc/current_fighter_select.png")
        this.load.image("move", "./assets/images/fight_misc/move.png")
        this.load.image("passive_select", "./assets/images/fight_misc/passive_select.png")
        this.load.image("passive_plus", "./assets/images/fight_misc/passive_plus.png")
        this.load.image("target_select", "./assets/images/fight_misc/target_select.png")
        this.load.image("target_plus", "./assets/images/fight_misc/target_plus.png")

        let heroSpriteList = [
            "defend",
            "skill1",
            "skill2",
            "skill3",
            "skill4",
            "skill1_icon",
            "skill2_icon",
            "skill3_icon",
            "skill4_icon"
        ]

        let enemySpriteList = [
            "defend",
            "attack"
        ]

        for (let i = 0; i < heroList.length; i++){
            this.load.spritesheet(heroList[i], "./assets/images/heroes/"+heroList[i]+"/animations/wait.png", {
                frameWidth: this.graphicManager.spriteSheetDatas[heroList[i]].waitFrameWidth,
                frameHeight: this.graphicManager.spriteSheetDatas[heroList[i]].waitFrameHeight
            })

            for (let j = 0; j < heroSpriteList.length; j++){
                this.load.image(heroList[i]+"_"+heroSpriteList[j], "./assets/images/heroes/"+heroList[i]+"/"+heroSpriteList[j]+".png")
            }
        }  

        for (let i = 0; i < enemyList.length; i++){
            this.load.spritesheet(enemyList[i], "./assets/images/enemies/"+enemyList[i]+"/animations/wait.png",{
                frameWidth: this.graphicManager.spriteSheetDatas[enemyList[i]].waitFrameWidth,
                frameHeight: this.graphicManager.spriteSheetDatas[enemyList[i]].waitFrameHeight
            })

            for (let j = 0; j < enemySpriteList.length; j++){
                this.load.image(enemyList[i]+"_"+enemySpriteList[j], "./assets/images/enemies/"+enemyList[i]+"/"+enemySpriteList[j]+".png")
            }
        } 


        /*
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
                    scale: 2,
                    start: 0,
                    end: this.graphicManager.spriteSheetDatas[heroList[i]].waitEnd //index of the last frame of the animation
                }),
                frameRate: 20, // Number of frames to display per second
                repeat: -1, // Set to -1 to loop the animation continuously, or a positive integer to specify the number of times to repeat
            });
        }

        for (let i = 0; i < enemyList.length; i++){
            this.anims.create({
                key: enemyList[i]+'_wait', // Animation key (can be any string)
                frames: this.anims.generateFrameNumbers(enemyList[i], {
                    start: 0,
                    end: this.graphicManager.spriteSheetDatas[enemyList[i]].waitEnd //index of the last frame of the animation
                }),
                frameRate: 20, // Number of frames to display per second
                repeat: -1, // Set to -1 to loop the animation continuously, or a positive integer to specify the number of times to repeat
            });
        }
        

        this.add.text(20, 20, "Loading...", {font: "40px Arial", fill:"white"});
        this.scene.start("playFight");  
    }
}