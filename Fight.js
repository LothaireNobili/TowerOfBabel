
class Fight extends Phaser.Scene {
    constructor(){
        super("playFight"); //REMEMBER TO CHANGE THAT WHEN NOT IN PROTOTYPING STATE ANYMORE (for team composition)
    }

    create(){
        this.add.text(20, 20, "Fight in progress...", {font: "40px Arial", fill:"white"}); //deletable

        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);

        var arbiter = new Arbiter()

        var heroSprites = [];
        var enemySprites = [];

        console.log("starting to place heroes")
        for (let i = 0; i < heroList.length; i++){
            console.log("1")
            var hero = this.add.sprite(arbiter.getVerticalPosition(i+1, "hero"),arbiter.floor,heroList[i]).play("crusader_wait"); //place each hero
            console.log("2")
            hero.setOrigin(0.5, 1);  //center them properly
            heroSprites.push(hero);
        }
        
        console.log("starting to place enemies")
        for (let i = 0; i < enemyList.length; i++){
            enemySprites[i] = this.add.image(arbiter.getVerticalPosition(i+1, "enemy"), arbiter.floor, enemyList[i]); //place each ennemy
            enemySprites[i].flipX = true;  //flip them because they're on the opposite side
            enemySprites[i].setOrigin(0.5, 1); //
        }
    }
}