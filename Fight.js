
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
            var hero = this.add.sprite(arbiter.getVerticalPosition(i+1, "hero"),arbiter.floor,heroList[i]).play(heroList[i]+"_wait"); //place each hero
            hero.setOrigin(0.5, 1);  //center them properly
            heroSprites.push(hero);
        }
        
        console.log("starting to place enemies")
        for (let i = 0; i < enemyList.length; i++){
            console.log(enemyList[i])
            var enemy = this.add.sprite(arbiter.getVerticalPosition(i+1, "enemy"),arbiter.floor,enemyList[i]).play(enemyList[i]+"_wait"); //place each enemy
            console.log(enemyList[i])
            enemy.setOrigin(0.5, 1);  //center them properly
            enemy.flipX = true;
            enemySprites.push(enemy);
        }

        /*debug lines to correctly size a new character*/
        //var surface = this.add.image(arbiter.getVerticalPosition(2, "enemy"), arbiter.floor, "surface")
        //surface.setOrigin(0.5, 1)
        //surface.flipX = true
        /*end of debug lines*/

        /*save that code for when playing attack
        console.log("starting to place enemies")
        for (let i = 0; i < enemyList.length; i++){
            enemySprites[i] = this.add.image(arbiter.getVerticalPosition(i+1, "enemy"), arbiter.floor, enemyList[i]); //place each ennemy
            enemySprites[i].flipX = true;  //flip them because they're on the opposite side
            enemySprites[i].setOrigin(0.5, 1); //
        }*/
    }
}