
class Fight extends Phaser.Scene {
    constructor(){
        super("playFight"); //REMEMBER TO CHANGE THAT WHEN NOT IN PROTOTYPING STATE ANYMORE (for team composition)
    }

    create(){
        this.add.text(20, 20, "Fight in progress...", {font: "40px Arial", fill:"white"}); //deletable

        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);

        var arbiter = new Arbiter()

        for (let i = 0; i < heroList.length; i++){
            heroList[i] = this.add.image(arbiter.getVerticalPosition(i+1, "hero"), arbiter.floor, heroList[i]); //place each hero
            heroList[i].setOrigin(0.5, 1);  //center them properly
        }

        for (let i = 0; i < enemyList.length; i++){
            enemyList[i] = this.add.image(arbiter.getVerticalPosition(i+1, "enemy"), arbiter.floor, enemyList[i]); //place each ennemy
            enemyList[i].flipX = true;  //flip them because they're on the opposite side
            enemyList[i].setOrigin(0.5, 1); //
        }
    }
}