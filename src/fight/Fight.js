var playerTeam = [];
var enemyTeam = [];
//var bothTeam = [...playerTeam, ...enemyTeam]; //->contrary to previous indication, it doesn't merge the lists by reference, it just merges them

class Fight extends Phaser.Scene {
    constructor(){
        super("playFight"); //REMEMBER TO CHANGE THAT WHEN NOT IN PROTOTYPING STATE ANYMORE (for team composition)
        
    }

    create(){
        this.add.text(20, 20, "Fight in progress...", {font: "40px Arial", fill:"white"}); //deletable

        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);

        //const crusader = new Crusader(this, 100, 200, "crusader_wait");
        //this.playerTeam.push(crusader);

        this.pwet = "pwet"
        var arbiter = new Arbiter(this)


        this.heroSprites = [];
        this.enemySprites = [];
        this.indicatorSprites = [];


        
        console.log("starting to place heroes")
        for (let i = 0; i < heroList.length; i++){
            var hero = this.add.sprite(arbiter.getVerticalPosition(i+1, "hero"),arbiter.floor,heroList[i]).play(heroList[i]+"_wait"); //place each hero
            hero.setOrigin(0.5, 1);  //center them properly
            hero.setScale(arbiter.defaultScale)
            this.heroSprites.push(hero);
        }
        
        console.log("starting to place enemies")
        for (let i = 0; i < enemyList.length; i++){
            var enemy = this.add.sprite(arbiter.getVerticalPosition(i+1, "enemy"),arbiter.floor,enemyList[i]).play(enemyList[i]+"_wait"); //place each enemy
            enemy.setOrigin(0.5, 1);  //center them properly
            enemy.setScale(arbiter.defaultScale)
            enemy.flipX = true;
            this.enemySprites.push(enemy);
        }

        var i = 1//to send the proper position
        //!we start indexing at 1 (ranks 1 to 4 are indexed 1 to 4, 0 is for special stuff), do not try to change that, you'll mess up absolutely everything
        for (var h of heroList){
            
            if(h==="crusader"){
                let newHero = new Crusader(i, this.heroSprites[i-1])
                newHero.lifeBar = new LifeBar(this, newHero, "hero", arbiter);
                playerTeam.push(newHero);
            }
            i++;/*
            if(h==="bandit"){
                playerTeam.push(new Bandit());
            }*/
        }

        i=1//reset the position for the ennemy
        for (var e of enemyList){
            if(e==="skeleton"){
                let newEnemy = new Skeleton(i, this.enemySprites[i-1])
                newEnemy.lifeBar = new LifeBar(this, newEnemy, "enemy", arbiter);
                enemyTeam.push(newEnemy);
            }i++;/*
            if(h==="spider"){
                playerTeam.push(new SPider());
            }*/
        }

        arbiter.startFight()/*
        while(arbiter.fightState != "FightOver"){

        }*/
    }
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