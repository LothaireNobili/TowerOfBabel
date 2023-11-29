class Arbiter {
    
    constructor(fight){

        //get some context + better readability
        this.fight_scene = fight;
        this.screenWidth = game.config.width;
        this.screenHeight = game.config.height;

        //fighters placement variable
        this.middle = this.screenWidth/2    //horizontal center
        this.firstOffSet = 90               //how far away the first fighter is from the center
        this.fightersOffSet = 120           //how far each fighter is from eachother (front to front)
        this.floor = 530                    //where the characters are placed vertically
        this.defaultScale = 0.73
        this.cursorOffSet = 45
        this.cursorScale = 0.92

        //define stats of the fight
        this.fightState = [
            "Start",
            "StatutEffectAnim", //animations if the current fight is poisoned/bleed/stnned/etc
            "EnemyInput",   //the ennemy makes an input
            "CheckAvaibleSkill", //the machine greys out unusable skills, maybe it's not an actual state of the game
            "PlayerSelectSkill", //waiting for the player to click an avaible skill
            "PlayerSelectTarget", //waiting for player to click a valid target
            "AttackAnim",   //attack animation playing
            "Wait",     //brief pause after attack animation
            "Next",  //we go to the next player, maybe it's not an actual state
            "FightOver" //one of the team is defeated
        ]

        this.currentState = this.fightState[0]

        //preparing some sprite values
        this.currentFighterCursor;
        this.currentTargetCursor = [];


        //prepare variables to deal with the rounds
        this.roundNumber = 0; //we start at round 0, the first startTurn will make it 1s
        this.fighterOrder = [];
        this.currentFighter;
        this.currentAttack;
        this.currentTarget = [];

    }




    getVerticalPosition(rank, team){
        //1 front, 4 back, shouldn't be called for anything but 1,2,3,4

        let result = this.firstOffSet + (rank - 1) * this.fightersOffSet

        if (team === "hero"){
            return(this.middle - result)
        }
        else{
            return(this.middle + result)
        }
    }

    getBothTeam(){
        return [...playerTeam, ...enemyTeam]
    }

    getTeam(fighter){
        var team;
        if (playerTeam.includes(this.currentFighter)){
            team="hero"
        }
        else if (enemyTeam.includes(this.currentFighter)){
            team="enemy"
        }
        return team
    }

    /*
    getHeroSprite(hero){
        return this.fight_scene.heroSprites[hero.position]
    }*/

    showMessage(message) {
        return new Promise((resolve) => {
            var text = this.fight_scene.add.text(game.config.width/2, game.config.height*1/5, message, {
                fontSize: '42px',
                fill: '#fff',
                fontFamily: "pixel"
            });
            text.setOrigin(0.5);
    
            this.fight_scene.tweens.add({
                targets: text,
                alpha: 0,
                duration: 900, // Duration of the fade-out (0.9 second)
                delay: 1100, // Pause before fading
                ease: 'Power2',
                onComplete: function () {
                    text.destroy();
                    resolve(); // Resolve the promise after the animation is complete
                }
            });
        });
    }

    showImage(imageKey) {
        return new Promise((resolve) => {

            // create an image from the key
            var image = this.fight_scene.add.image(game.config.width/2, game.config.height*2/5, imageKey);
        
            // center the image
            image.setOrigin(0.5);
        
            // Use an animation
            this.fight_scene.tweens.add({
                targets: image,
                alpha: 0,
                duration: 900, // Durée de la disparition (0.9 sec)
                delay: 1100, // Pause avant la disparition (1.1 sec)
                ease: 'Power2',
                onComplete: function () {
                    // Supprimer l'image une fois l'animation terminée
                    image.destroy();
                    resolve();// promise is resolved
                }
            });
        });
    }


    playAttackAnimation(attacker, targets){
        var that = this;

        attacker.sprite.anims.stop(); 
        attacker.sprite.setTexture(attacker.name+"_"+that.currentAttack.animation);

        targets.forEach(target => target.sprite.anims.stop());
        targets.forEach(target => target.sprite.setTexture(target.name+'_defend'));

        return new Promise((resolve) => {
            this.fight_scene.tweens.add({

                targets: [attacker, ...targets],
                ease: 'Power2',
                duration: 500,
                onComplete: function () {
                    // Changer la texture de l'attaquant et des cibles
                    that.fight_scene.time.delayedCall(500, function () {
                        attacker.sprite.play(attacker.name+"_wait");
                        targets.forEach(target => target.sprite.play(target.name+"_wait"));

                        resolve(); // Résoudre la promesse après le remplacement
                    }, [], that);
                }
            });
        });
    }


    startFight(){
        var that = this; //to not loose the context
        this.showImage("fight_announcement").then(function(){ //play the a inimation THEN start the fight
            that.startRound() //"that" is the arbiter
        })        
    }

    startRound(){
        /*
        console.log("fighter list :")
        console.log(initialFighterList)*/
        console.log("fight order :")
        this.fighterOrder = this.getBothTeam().sort((a, b) => b.speed - a.speed)
        console.log(this.fighterOrder)
        this.currentFighter = this.fighterOrder[0]
        this.startTurn()
        /*
        console.log("scene")
        console.log(this.fight_scene.pwet)*/
    }

    startTurn(){
        this.placeTurnCursor()
        this.getInput()
    }

    placeTurnCursor(){
        let team = this.getTeam()
        this.currentFighterCursor = this.fight_scene.add.image(this.getVerticalPosition(this.currentFighter.position, team)
            ,this.floor+this.cursorOffSet,"current_fighter_select");
        this.currentFighterCursor.setOrigin(0.5, 1);  //the cursor pic is about the same size of a fighter, so it must have the same origin
        this.currentFighterCursor.setScale(this.cursorScale)
        //cursor.destroy()
    }

    getInput(){
        let team = this.getTeam()
        if (team==="enemy"){
            this.getEnemyInput()
        }
        else if (team==="hero"){
            this.getHeroInput()
        }
    }

    getEnemyInput(){
        var that = this; //to save the context

        let attack = this.currentFighter.getInput(playerTeam) //!THIS PROBABLY DOESN'T WORK AS INTENDED FOR MULTI TARGET ATTACK
        this.currentAttack=attack[0]
        this.currentTarget.push(attack[1])

        var tempoTargetCursor

        for (let target of this.currentTarget){
            //console.log(target)
            tempoTargetCursor = this.fight_scene.add.image(this.getVerticalPosition(target.position, "hero")//ennemies only have offensive move
                ,this.floor+this.cursorOffSet,"target_select");
            tempoTargetCursor.setOrigin(0.5, 1);  //the cursor pic is about the same size of a fighter, so it must have the same origin
            tempoTargetCursor.setScale(this.cursorScale)

            that.currentTargetCursor.push(tempoTargetCursor)
        }
        
        

        //display the attack name
        this.showMessage(this.currentAttack.name).then(function(){ //play the a inimation THEN start the fight
            that.engageAttackAnimation()
            
            //that.startRound() //"that" is the arbiter
        })  

        //console.log(attack)
    }

    getHeroInput(){
        //TODO : display attack icons, select target
        console.log("TODO")
    }

    engageAttackAnimation(){
        //oskur
        
        //console.log(this.currentFighter)
        //console.log(this.currentAttack)
        //console.log(this.currentTarget)
        /*
        console.log(this.fight_scene.heroSprites)
        console.log(this.fight_scene.enemySprites)*/
        //console.log(this.getHeroSprite(this.currentFighter))
        //console.log(this.getHeroSprite(this.currentTarget)) //note : it won't work as well for multiple target stuff
        //targets.forEach(target => console.log(target));
        this.currentFighterCursor.destroy()
        this.currentFighterCursor = null
        for (let cursor of this.currentTargetCursor){
            cursor.destroy()
        }
        this.currentTargetCursor = []

        this.playAttackAnimation(this.currentFighter, this.currentTarget)
            .then(() => {
                this.ontoTheNext();
            });
    }

    ontoTheNext(){
        
    }


    
}