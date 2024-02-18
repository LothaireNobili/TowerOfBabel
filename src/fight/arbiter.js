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

        //cursors values
        this.cursorOffSet = 45
        this.cursorScale = 0.92
        this.plusCursorScale = 0.95
        this.plusCursorVerticalOffSet = 35

        //skills values
        this.skillYPlacement = 640
        this.skillXPlacement = 150
        this.skillXPlacementOffSet = 75

        //preparing some sprite values
        this.currentFighterCursor;
        this.currentTargetCursor = [];
        this.currentFighterSkillIcons = [];


        //prepare variables to deal with the rounds
        this.roundNumber = 0; //we start at round 0, the first startTurn will make it 1s
        this.fighterOrder = [];
        this.currentFighterTrackNumber = 0; //to save the index of the current player in the list, reset each round
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

    getFighterTeam(fighter){
        var team;
        if (playerTeam.includes(fighter)){
            team="hero"
        }
        else if (enemyTeam.includes(fighter)){
            team="enemy"
        }
        return team
    }

    getSKill(fighter, skillId){
        return (fighter.skills.find(skill => skill.id === skillId))
    }

    checkIfSkillIsAvaible(skillToCheck){
        let pos = this.currentFighter.position

        var foundSkill = this.getSKill(this.currentFighter, skillToCheck)
        let okPos = foundSkill.requiered_pos

        let okFirstTarget = foundSkill.reach[0]

        if (okPos.includes(pos) && okFirstTarget <= enemyTeam.length){
            return true
        }
        else{
            return false
        }
        
    }

    updatePosition(character){
        let sprite = character.sprite
        character.healthBar.update()
        let that = this;
        return new Promise((resolve) => {
            this.fight_scene.tweens.add({
                targets: sprite,
                x: that.getVerticalPosition(character.position, that.getFighterTeam(character)),
                y: that.floor,  
                ease: 'Power2.inOut',  //we can change the parameter to have different effects
                duration: 150,
                onComplete: () => {
                    resolve();  // Resolve the promise once the tween is completed
                }
            });
        });
    }

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
                    image.destroy();
                    resolve();// promise is resolved
                }
            });
        });
    }

    //this function is called only for heroes. Placement of cursor for enemies happen in the getInput function
    placeTargetCursors(skillToCheck){
        var that = this// save the context

        //erase the previous cursors
        for (let cursor of this.currentTargetCursor){
            cursor.destroy()
        }
        this.currentTargetCursor = []

        var foundSkill = this.getSKill(this.currentFighter, skillToCheck)   
        //initialize temporary variable
        var tempoTargetCursor


        //* The code below looks redoundant but making it smoother would imply to make a lot of ugy code elsewhere
        //(we use a lot of different variables that don't have the same nomenclature)

        if (foundSkill.target === "enemy"){
            for(let targetPos of foundSkill.reach){
                if (targetPos <= enemyTeam.length){
    
                    tempoTargetCursor = this.fight_scene.add.image(this.getVerticalPosition(targetPos, "enemy")
                        ,this.floor+this.cursorOffSet,"target_select");
    
                    tempoTargetCursor.setOrigin(0.5, 1);  //the cursor pic is about the same size of a fighter, so it must have the same origin
                    tempoTargetCursor.setScale(this.cursorScale)

                    tempoTargetCursor.setInteractive({ cursor: 'pointer' })
                        .on('pointerdown', function () {

                            if (foundSkill.type == "single"){
                                that.currentTarget.push(enemyTeam[targetPos - 1]) //!here
                            }

                            else if (foundSkill.type == "continuous"){
                                for(let thisTarget of foundSkill.reach){
                                    if (thisTarget <= enemyTeam.length){
                                        that.currentTarget.push(enemyTeam[thisTarget - 1])
                                    }
                                }
                            }

                            for (let icon of that.currentFighterSkillIcons){
                                icon.destroy()
                            }
                            this.currentFighterSkillIcons = []
                            that.engageAttackAnimation()
                            
                    }); 
    
                    that.currentTargetCursor.push(tempoTargetCursor)

                    //to check if the skill type is on several targets or not
                    if (foundSkill.type == "continuous" && targetPos>foundSkill.reach[0]){  //we don't add the + cursor for first target 

                        tempoTargetCursor = this.fight_scene.add.image(
                            ((this.getVerticalPosition(targetPos, "enemy") + this.getVerticalPosition(targetPos-1, "enemy")) / 2)
                            ,this.floor+this.plusCursorVerticalOffSet,"target_plus");
                        
                        tempoTargetCursor.setOrigin(0.5, 1);  //the cursor pic is about the same size of a fighter, so it must have the same origin
                        tempoTargetCursor.setScale(this.plusCursorScale)
                        that.currentTargetCursor.push(tempoTargetCursor)
                    }
                }
            }
        }

        else if(foundSkill.target === "team"){
            for(let targetPos of foundSkill.reach){
                if (targetPos <= playerTeam.length){
                    tempoTargetCursor = this.fight_scene.add.image(this.getVerticalPosition(targetPos, "hero")
                    ,this.floor+this.cursorOffSet,"passive_select");
    
                    tempoTargetCursor.setOrigin(0.5, 1);  //the cursor pic is about the same size of a fighter, so it must have the same origin
                    tempoTargetCursor.setScale(this.cursorScale)

                    tempoTargetCursor.setInteractive({ cursor: 'pointer' })
                        .on('pointerdown', function () {

                            if (foundSkill.type == "single"){
                                that.currentTarget.push(playerTeam[targetPos - 1])
                            }  
                            else if (foundSkill.type == "continuous"){
                                for(let thisTarget of foundSkill.reach){
                                    if (thisTarget <= playerTeam.length){
                                        that.currentTarget.push(playerTeam[thisTarget - 1])
                                    }
                                }
                            }
                            for (let icon of that.currentFighterSkillIcons){
                                icon.destroy()
                            }
                            this.currentFighterSkillIcons = []
                            that.engageAttackAnimation()
                    }); 
    
                    that.currentTargetCursor.push(tempoTargetCursor)
                }

                //to check if the skill type is on several targets or not
                if (foundSkill.type == "continuous" && targetPos>1){  //we don't add the + cursor for target in pos1 

                    tempoTargetCursor = this.fight_scene.add.image(
                        ((this.getVerticalPosition(targetPos, "hero") + this.getVerticalPosition(targetPos-1, "hero")) / 2)
                        ,this.floor+this.plusCursorVerticalOffSet,"passive_plus");
                    
                    tempoTargetCursor.setOrigin(0.5, 1);  //the cursor pic is about the same size of a fighter, so it must have the same origin
                    tempoTargetCursor.setScale(this.plusCursorScale)
                    that.currentTargetCursor.push(tempoTargetCursor)
                }

            }
        }
        

    }

    placeSkillIcon(hero) {
        // Variable pour stocker la valeur
        var selectedValue = null;

        var that = this

        // Liste des icônes et de leurs valeurs associées
        var icons = [
            { key: hero.name+'_skill1_icon', value: hero.skills[0].id },
            { key: hero.name+'_skill2_icon', value: hero.skills[1].id },
            { key: hero.name+'_skill3_icon', value: hero.skills[2].id },
            { key: hero.name+'_skill4_icon', value: hero.skills[3].id }
        ];
    
        // Créer les icônes cliquables
        icons.forEach((icon, index) => {
            var xPosition = that.skillXPlacement + index * that.skillXPlacementOffSet;
            var yPosition = that.skillYPlacement;
            
            var clickableIcon = that.fight_scene.add.sprite(xPosition, yPosition, icon.key)
            if (this.checkIfSkillIsAvaible(icon.value)){
                clickableIcon.setInteractive({ cursor: 'pointer' })
                    .on('pointerdown', function () {

                        that.currentAttack = that.getSKill(that.currentFighter, icon.value)  
                        that.placeTargetCursors(icon.value)

                }); 
            }
            else{
                clickableIcon.setTint(0x808080);
            }
            
            that.currentFighterSkillIcons.push(clickableIcon)
        });
    }

    //!the animation requiere improvement but does the trick for now
    playAttackAnimation(attacker, targets){
        var that = this;

        attacker.sprite.anims.stop(); 
        attacker.sprite.setTexture(attacker.name+"_"+that.currentAttack.animation).setScale(0.7);

        if (this.currentAttack.target != "team" && this.currentAttack.target != "self"){
            targets.forEach(target => target.sprite.anims.stop());
            targets.forEach(target => target.sprite.setTexture(target.name+'_defend').setScale(0.7));
        }


        return new Promise((resolve) => {
            this.fight_scene.tweens.add({

                targets: [attacker, ...targets],
                ease: 'Power2',
                duration: 1000,
                onComplete: function () {
                    // Changer la texture de l'attaquant et des cibles
                    that.fight_scene.time.delayedCall(1000, function () {
                        attacker.sprite.play(attacker.name+"_wait").setScale(that.defaultScale);
                        targets.forEach(target => target.sprite.play(target.name+"_wait").setScale(that.defaultScale));

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

        this.fighterOrder = this.getBothTeam().sort((a, b) => b.speed - a.speed)
        this.currentFighterTrackNumber = 0;
        this.startTurn()

    }

    startTurn(){
        var that = this
        this.currentFighter = this.fighterOrder[this.currentFighterTrackNumber]
        this.checkForStatusEffect()
        
    }

    checkForStatusEffect() {
        let stunned = 0;//to save if the fighter is stunned and need to skip their turn
    
        let applyEffectWithDelay = (effectFunction, delay) => {//apply an effect while managing the delay
            if (effectFunction) {
                effectFunction();
                if (this.currentFighter.hp <= 0){//check if an effect killed the target
                    this.checkForDeathAndNext();//stop checking, validate death and go ontothenext
                }
                else{
                    setTimeout(() => {
                        this.applyNextEffect(delay);
                    }, delay);
                }   
            }
        };
    
        let effects = [
            { condition: this.currentFighter.status_effect.regen.length != 0, effectFunction: () => {//condition
                this.currentFighter.applyRegenHeal() //logic to apply
            }},
            { condition: this.currentFighter.status_effect.bleed.length != 0, effectFunction: () => {//condition
                this.currentFighter.applyBleedDamage() //logic to apply
            }},
            { condition: this.currentFighter.status_effect.poison != 0, effectFunction: () => {
                this.currentFighter.applyPoisonDamage() 
            }},
            { condition: this.currentFighter.status_effect.stun != 0, effectFunction: () => {
                this.currentFighter.applyStun();
                stunned = 1;
            }},
        ];
    
        this.applyNextEffect = (delay) => {
            let nextEffect = effects.shift();
            if (nextEffect) {//check if there is a next effect
                if (nextEffect.condition){//check if the target has the effect
                    applyEffectWithDelay(nextEffect.effectFunction, 1000);//apply the logic
                }
                else{
                    this.applyNextEffect(0)//skip to the next effect if the target doesn't have it
                }
                
            } else {
                this.checkForDeathAndNext();
            }
        };
    
        this.checkForDeathAndNext = () => {
            this.checkDeath([this.currentFighter]);
            if (this.currentFighter.hp <= 0 || stunned) {
                setTimeout(() => {
                    this.ontoTheNext();
                }, 1500);
            } else {
                this.placeTurnCursor();
                this.getInput();
            }
        };
    
        this.applyNextEffect(500); // Adjust the delay time as needed
    }
    

    placeTurnCursor(){
        let team = this.getFighterTeam(this.currentFighter)
        this.currentFighterCursor = this.fight_scene.add.image(this.getVerticalPosition(this.currentFighter.position, team)
            ,this.floor+this.cursorOffSet,"current_fighter_select");
        this.currentFighterCursor.setOrigin(0.5, 1);  //the cursor pic is about the same size of a fighter, so it must have the same origin
        this.currentFighterCursor.setScale(this.cursorScale)
        //cursor.destroy()
    }

    getInput(){
        let team = this.getFighterTeam(this.currentFighter)
        if (team==="enemy"){
            this.getEnemyInput()
        }
        else if (team==="hero"){
            this.getHeroInput()
        }
    }

    getEnemyInput(){
        var that = this; //to save the context

        let attack = this.currentFighter.getInput(playerTeam) 
        this.currentAttack=attack[0]
        this.currentTarget.push(attack[1])

        var tempoTargetCursor

        for (let target of this.currentTarget){
            tempoTargetCursor = this.fight_scene.add.image(this.getVerticalPosition(target.position, "hero")//ennemies only have offensive move
                ,this.floor+this.cursorOffSet,"target_select");
            tempoTargetCursor.setOrigin(0.5, 1);  //the cursor pic is about the same size of a fighter, so it must have the same origin
            tempoTargetCursor.setScale(this.cursorScale)

            that.currentTargetCursor.push(tempoTargetCursor)
        }
        
        

        //display the attack name
        this.showMessage(this.currentAttack.name).then(function(){ //play the a inimation THEN start the fight
            that.engageAttackAnimation()
            
        })  

    }

    getHeroInput(){
        this.placeSkillIcon(this.currentFighter)
    }

    engageAttackAnimation(){

        var that = this
        this.currentFighterCursor.destroy()
        this.currentFighterCursor = null
        for (let cursor of this.currentTargetCursor){
            cursor.destroy()
        }
        this.currentTargetCursor = []

        this.playAttackAnimation(this.currentFighter, this.currentTarget)
            .then(() => {
                for(let target of that.currentTarget){
                    target.isTargeted(that.currentAttack, that.currentFighter)
                }
                
                setTimeout(() => {  //a brief break after an attack to make the game more understandable
                    this.checkDeath(this.currentTarget); 
                }, 700);
                setTimeout(() => {  //a brief break after an attack to make the game more understandable
                    that.ontoTheNext();
                }, 1500);
            });
    }


    checkDeath(checkTargets){//checkTargets MUST be a list
        var that = this
        let team = this.getFighterTeam(checkTargets[0])
        let anyDeaths = false
    
        for(let target of checkTargets){
            if (target.isDead()){

                let index ; //initalize temporary value
                anyDeaths=true //there is at least one death                


                index = that.fighterOrder.indexOf(target); //get the index in the fighterOrder list

                if (!(checkTargets.length==1 && checkTargets[0]==that.currentFighter)){
                    if (index < that.currentFighterTrackNumber){ //check if victim already played
                        that.currentFighterTrackNumber -= 1; //remove one to the tracker if the victim already player to shift it correctly
                    }

                    if (index !== -1) {
                        that.fighterOrder.splice(index, 1) //remove the victim from the fighterOrder
                    }
                }
                
              
                
                

                if(team == "hero"){
                    index = playerTeam.indexOf(target);

                    for (let hero of playerTeam){
                        if (index < hero.position){ //check if victim already played
                            hero.position -= 1; //remove one to the tracker if the victim already player to shift it correctly
                            that.updatePosition(hero).then(() => {
                            });
                        }
                    }
                    

                    if (index !== -1) {
                        playerTeam.splice(index, 1)//remove the victim from the hero list if they were a hero
                    }
                }

                else if (team == "enemy"){
                    index = enemyTeam.indexOf(target);

                    for (let enemy of enemyTeam){
                        if (index < enemy.position){ //check if victim already played
                            enemy.position -= 1; //remove one to the tracker if the victim already player to shift it correctly
                            that.updatePosition(enemy).then(() => {
                            });
                        }
                    }

                    if (index !== -1) {
                        enemyTeam.splice(index, 1)//remove the victim from the enemy list if they were an enemy
                    }
                }

                target.destroyGraphics() //destroy the sprite and health bars
            }
        }

    }


    ontoTheNext(){
        this.currentTarget = []
        this.currentFighterTrackNumber += 1;


        if (enemyTeam.length==0 || playerTeam.length==0){
            for (let hero of playerTeam){
                hero.destroyGraphics()
            }
            if(playerTeam.length==0){  //on vérifie d'abord l'équipe du joueur, en cas d'égalité (impossible pour l'instant), il a perdu car il n'a plus de héros pour continuer
                playerTeam = []
                enemyTeam = []
                game.scene.stop(this.fight_scene)
                game.scene.start("GameOver")
            }
            else{
                playerTeam = []//we put that on both side of condition for convenience reasons
                enemyTeam = []
                //listSelectedHeroes = heroList
                heroList = []
                game.scene.stop(this.fight_scene)
                Salle.returnToRoom()
                
            }
        }

        else{
            if (this.fighterOrder[this.currentFighterTrackNumber] != undefined){
                this.startTurn()
            }
            else{
                this.startRound()
            }
        }
        
        
    }


    
}