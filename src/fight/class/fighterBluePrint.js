class FighterBluePrint{
    constructor(){
        this.classBlueprints = {



            //!Heroes//
            crusader: {
                name : "crusader",
                display_name : "Crusader",
                max_hp: 100,  
                dodge: 10,
                prot: 20, //20% of protection
                speed: 3,
                crit: 5, //in %
        
                damage_mult: 1,
        
                //resistance stats
                stun_res: 50,
                move_res: 60,
                bleed_res : 60,
                poison_res : 60,
                debuff_res : 40,              
                
                skills : [
                    {
                        id:"smite",
                        name: 'Smite',
                        animation: "skill1",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [1, 2], //where the hero must be placed to cast it
                        damage_low: 12, //minimum damage
                        damage_high: 17 //max damage
                    },
                    {
                        id: "stunningBlow",
                        name: 'Stunning blow',
                        animation: "skill2",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [1, 2], //where the hero must be placed to cast it
                        damage_low: 4, //minimum damage
                        damage_high: 7, //max damage
                        stun: 140  //chance of the stun to proc, ennemies have some resistance so <100 doesn't guarantee the stun
                    },
                    {
                        id: "holyLance",
                        name: 'Holy lance',
                        animation: "skill3",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [2, 3, 4], //spot reach
                        requiered_pos : [3, 4], //where the hero must be placed to cast it
                        damage_low: 13, //minimum damage
                        damage_high: 16, //max damage
                        move: 1, //forward 1
                        crit_mod: 5 //flat modifier in %
                    },
                    {
                        id: "warCry",
                        name: "War cry",
                        animation: "skill4",
                        target: "team", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2, 3, 4], //spot reach
                        requiered_pos : [1, 2, 3, 4], //where the hero must be placed to cast it
                        heal: 10,
                        regen: [7, 3]
                    }
                ]
            },
        
        
            bandit: {
                name : "bandit",
                display_name : "Bandit",
                max_hp : 60,   
                dodge : 60,
                prot : 0, 
                speed : 8,
                crit : 15, //in %
        
                damage_mult : 1,
        
                //resistance stats
                stun_res : 40,
                move_res : 20,
                bleed_res : 40,
                poison_res : 40,
                debuff_res : 40,
               
                
                skills : [
                    {
                        id:"slice",
                        name: 'Slice',
                        animation: "skill1",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [1, 2], //where the hero must be placed to cast it
                        damage_low: 10, //minimum damage
                        damage_high: 13 //max damage
                    },
                    {
                        id:"cut",
                        name: 'Cut',
                        animation: "skill2",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [1, 2], //where the hero must be placed to cast it
                        damage_low: 6, //minimum damage
                        damage_high: 8, //max damage
                        bleed: [120, 5, 3]  //120% chance to proc bleed, 5 damage for 3 turns
                    },{
                        id:"gunshot",
                        name: 'Gun shot',
                        animation: "skill3",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2, 3, 4], //spot reach
                        requiered_pos : [2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 8, //minimum damage
                        damage_high: 10, //max damage
                        crit_mod: 15 //flat modifier in %
                    },
                    {
                        id:"grapeshot",
                        name: "Grape shot",
                        animation: "skill4",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "continuous",//all reachable target are touched
                        reach: [1, 2, 3], //spot reach
                        requiered_pos: [2, 3], //where the hero must be placed to cast it
                        damage_low: 4, //minimum damage
                        damage_high: 6, //max damage
                        crit_mod: 10
                    }
                ]
            },

            plaguedoctor: {
                name : "plaguedoctor",
                display_name : "Plague Doctor", //capitalize each word for better display (more convenient with Upper() and Lower())
                max_hp : 60,
                dodge : 40,
                prot : 0, 
                speed : 5,
                crit : 5, //in %

                damage_mult : 1,

                //resistance stats
                stun_res : 50,
                move_res : 20,
                bleed_res : 25,
                poison_res : 65,
                debuff_res : 60,

                
                skills : [
                    {
                        id:"poisonBomb",
                        name: 'Poison Bomb',
                        animation: "skill1",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 2, //minimum damage
                        damage_high: 4, //max damage
                        poison: [140, 6]  //140% chance to proc poison, power 6
                    },
                    {
                        id:"acidRain",
                        name: 'Acid Rain',
                        animation: "skill2",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "continuous",//one target only
                        reach: [3, 4], //spot reach
                        requiered_pos : [2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 1, //minimum damage
                        damage_high: 3, //max damage
                        poison: [140, 4]  //140% chance to proc poison, power 4
                    },
                    {
                        id:'incision',
                        name: 'Incision',
                        animation: "skill3",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2, 3], //spot reach
                        requiered_pos : [1, 2, 3], //where the hero must be placed to cast it
                        damage_low: 5, //minimum damage
                        damage_high: 7, //max damage
                        crit_mod: 20, //flat modifier in %
                        bleed: [140, 6, 3]  //120% chance to proc bleed, 4 damage for 3 turns
                    },
                    {
                        id:'battleMedicine',
                        name: "Battle Medicine",
                        animation: "skill4",
                        target: "team", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//all reachable target are touched
                        reach: [1, 2, 3, 4], //spot reach
                        requiered_pos: [2, 3], //where the hero must be placed to cast it
                        heal: 10, //how much it heals
                        cure: ["bleed", "poison"] //gets rid of bleed and poison
                    }
                ],
            },

            vestal: {
                name: "vestal",
                display_name : "Vestal",
                max_hp : 100,  
                dodge : 15,
                prot : 15, 
                speed : 4,
                crit : 5, //in %

                damage_mult : 1,

                //resistance stats
                stun_res : 60,
                move_res : 40,
                bleed_res : 40,
                poison_res : 40,
                debuff_res : 40,

                
                skills : [
                    {
                        id:"divineGrace",
                        name: 'Divine grace',
                        animation: "skill1",
                        target: "team", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2, 3, 4], //spot reach
                        requiered_pos : [3, 4], //where the hero must be placed to cast it
                        heal: 15,  //how much it heals
                    },
                    {
                        id: "divineComfort",
                        name: 'Divine compfort',
                        animation: "skill2",
                        target: "team", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "continuous",//one target only
                        reach: [1, 2, 3, 4], //spot reach
                        requiered_pos : [3, 4], //where the hero must be placed to cast it
                        heal: 6,  //how much it heals
                    },
                    {
                        id:"blindingLight",
                        name: 'Blinding light',
                        animation: "skill3",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2, 3], //spot reach
                        requiered_pos : [3, 4], //where the hero must be placed to cast it
                        damage_low: 2, //minimum damage
                        damage_high: 5, //max damage
                        stun: 140  //chance of the stun to proc, ennemies have some resistance so <100 doesn't guarantee the stun
                    },
                    {
                        id:"escapeSmash",
                        name: "Escape smash",
                        animation: "skill4",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//all reachable target are touched
                        reach: [1, 2], //spot reach
                        requiered_pos: [1, 2], //where the hero must be placed to cast it
                        damage_low: 6, //minimum damage
                        damage_high: 8, //max damage
                        move: -1, //backward of 1
                    }
                ],
            },

            hellion: {
                name: "hellion",
                display_name : "Hellion",
                max_hp : 60,     
                dodge : 60,
                prot : 0, 
                speed : 7,
                crit : 30, //in %
    
                damage_mult : 1,
    
                //resistance stats
                stun_res : 40,
                move_res : 40,
                bleed_res : 40,
                poison_res : 40,
                debuff_res : 40,
    
                    
                skills : [
                    {
                        id:"slash",
                        name: 'Slash',
                        animation: "skill1",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [1, 2], //where the hero must be placed to cast it
                        damage_low: 9, //minimum damage
                        damage_high: 15, //max damage
                    },
                    {
                        id:"ironSwan",
                        name: 'Iron Swan',
                        animation: "skill2",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [4], //spot reach
                        requiered_pos : [1], //where the hero must be placed to cast it
                        damage_low: 11, //minimum damage
                        damage_high: 17, //max damage
                        crit_mod: 15 //flat modifier in %
                    },
                    {
                        id:"barbaricYap",
                        name: 'Barbaric Yap',
                        animation: "skill3",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                         type: "continuous",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [1, 2], //where the hero must be placed to cast it
                        damage_low: 1, //minimum damage
                        damage_high: 3, //max damage
                        stun: 110  //chance of the stun to proc, ennemies have some resistance so <100 doesn't guarantee the stun
                    },
                    {
                        id:"rush",
                        name: "Rush",
                        animation: "skill4",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "continuous",//all reachable target are touched
                        reach: [1, 2, 3], //spot reach
                        requiered_pos: [2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 6, //minimum damage
                        damage_high: 8 //max damage
                    }
                ],
            },

            graverobber: {
                name : "graverobber",
                display_name : "Grave Robber", //capitalize each word for better display (more convenient with Upper() and Lower())
                max_hp : 60,   
                dodge : 75,
                prot : 0, 
                speed : 9,
                crit : 40, //in %
        
                damage_mult : 1,
        
                //resistance stats
                stun_res : 40,
                move_res : 20,
                bleed_res : 40,
                poison_res : 60,
                debuff_res : 40,
               
                
                skills : [
                    {
                        id:"pic",
                        name: 'Pic',
                        animation: "skill1",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2, 3], //spot reach
                        requiered_pos : [1, 2, 3], //where the hero must be placed to cast it
                        damage_low: 9, //minimum damage
                        damage_high: 12 //max damage
                    },
                    {
                        id:"dagger",
                        name: 'Dagger',
                        animation: "skill2",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [2, 3, 4], //spot reach
                        requiered_pos : [2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 9, //minimum damage
                        damage_high: 12 //max damage
                    },
                    {
                        id:"flash",
                        name: 'Flash',
                        animation: "skill3",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "continuous",//one target only
                        reach: [2, 3], //spot reach
                        requiered_pos : [2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 7, //minimum damage
                        damage_high: 9, //max damage
                    },
                    {
                        id:"darts",
                        name: 'Darts',
                        animation: "skill4",
                        target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2, 3, 4], //spot reach
                        requiered_pos : [3, 4], //where the hero must be placed to cast it
                        damage_low: 4, //minimum damage
                        damage_high: 8, //max damage
                        poison: [140, 5]  //140% chance to proc poison, power 6
                    }
                ]
            },

            //!Ennemies//
            skeleton: {

                name: "skeleton",
                max_hp : 25,  

                dodge : 5,

                prot : 0, 

                speed : 5,

                crit : 5, //in %

                damage_mult : 1,

                //resistance stats
                stun_res : 20,
                move_res : 20,
                bleed_res : 200,
                poison_res : 20,
                debuff_res : 20,

                
                skills : [
                    {
                        id: "strike",
                        name: 'Strike',
                        animation: "attack",
                        target: "hero", //ennemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [1, 2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 7, //minimum damage
                        damage_high: 10, //max damage
                    },
                    {
                        id: "cut",
                        name: 'Cut',
                        animation: "attack",
                        target: "hero", //ennemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [1, 2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 5, //minimum damage
                        damage_high: 7, //max damage
                        bleed: [120, 2, 3],  //120% chance to proc bleed, 2 damage for 3 turns
                        /*poison: [1140, 2],  //140% chance to proc poison, power 6
                        stun: 1120//<- those are useful to debug*/
                    }
                ],


                getInput(playerTeam ){

                    let randomNumSkill = (Math.random() * 2) -1;
                    randomNumSkill = Math.ceil(randomNumSkill)
            
                    if (playerTeam.length>1){
                        let randomNumTarget = (Math.random() * 2) -1;
                        randomNumTarget = Math.ceil(randomNumTarget)
                        return [this.skills[randomNumSkill], playerTeam[0]];
                    }
                    else{
                        return [this.skills[randomNumSkill], playerTeam[randomNumTarget]]
                    }
                    
                }

            },
            spider: {

                name: "spider",
                max_hp : 15,  

                dodge : 5,

                prot : 0, 

                speed : 7,

                crit : 5, //in %

                damage_mult : 1,

                //resistance stats
                stun_res : 20,
                move_res : 20,
                bleed_res : 20,
                poison_res : 20,
                debuff_res : 20,

                
                skills : [
                    {
                        id: "venom",
                        name: 'Venom',
                        animation: "attack",
                        target: "hero", //ennemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2, 3, 4], //spot reach
                        requiered_pos : [1, 2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 3, //minimum damage
                        damage_high: 5, //max damage
                        poison: [120, 3]
                    },
                    {
                        id: "web",
                        name: 'Web',
                        animation: "attack",
                        target: "hero", //ennemy is offensive, team is passive for the team, self is only for the caster
                        type: "single",//one target only
                        reach: [1, 2], //spot reach
                        requiered_pos : [1, 2, 3, 4], //where the hero must be placed to cast it
                        damage_low: 1, //minimum damage
                        damage_high: 2, //max damage
                        stun: 80,  //120% chance to proc bleed, 2 damage for 3 turns
                    }
                ],


                getInput(playerTeam ){

                    let randomNumSkill = (Math.random() * 2) -1;
                    randomNumSkill = Math.ceil(randomNumSkill)
                    let randomNumTarget

                    if (randomNumSkill==0){
                        randomNumTarget = (Math.random() * playerTeam.length) -1;
                        randomNumTarget = Math.ceil(randomNumTarget)
                    }
                    else if (randomNumSkill==1){
                        let targetCount = Math.min(2, playerTeam.length)
                        randomNumTarget = (Math.random() * targetCount) -1;
                        randomNumTarget = Math.ceil(randomNumTarget)
                    }

                    return [this.skills[randomNumSkill], playerTeam[randomNumTarget]]
                    
                }

            }
        },

        this.commonFunctions = {
            
            displayDamage(damageAmount, type){
                let targetX = this.arbiter.getVerticalPosition(this.position, this.arbiter.getFighterTeam(this))
                let targetY = 250
                let amount = damageAmount
        
                let text
                let color
                let stroke
                switch (type) {
                    case 'normal':
                        color = '#ff2929';
                        stroke = '#8a0404'
                        text = amount;
                        break;
                    case 'bleed':
                        color = '#cc0000';
                        stroke = '#7a0101'
                        text = "Bleed! " + amount
                        break;
                    case 'poison':
                        color = '#1cc202';
                        stroke = '#15590a'
                        text = "Poison! " + amount
                        break;
                    case 'stun':
                        color = "#e3c23d"
                        stroke = '#b0931e'
                        text = "Stun!"
                        break;
                    case 'heal':
                        color = "#05f238"
                        stroke = '#059c25'
                        text = amount
                        break;
                    case 'regen':
                        color = "#00ff94"
                        stroke = '#059659'
                        text = "Regen! "+amount
                        break;
                    case 'cure':
                        color = "#ffd299"
                        stroke = '#ab906f'
                        text = "Cured!"
                        break;
                    case 'miss':
                        color = "#b8b8b8"
                        stroke = '#787878'
                        text = 'Dodge!'
                        break;
                    case 'crit':
                        color = "#db6a00"
                        stroke = '#b82e00'
                        text = amount+"!"
                        break;
                    default:
                        color = '#ffffff';
                        stroke = '#000000';
                        text = "there is not text"
                  }
            
                let damageText = new DamageText(this.arbiter.fight_scene, 
                    targetX, 
                    targetY, 
                    text, 
                    {   
                        fontFamily: 'comic sans MS', 
                        fontSize: '45px', 
                        color: color, 
                        stroke: stroke, 
                        strokeThickness: 4  
                    });
                
            },
        
            applyRawDamages(amount, type){//apply damages straight up
                this.displayDamage(amount, type)
                if (this.hp <= amount){ //if enemy dies on the spot
                    this.hp = 0
                }
                else{
                    this.hp -= amount
                }
                this.healthBar.update()
            },

            applyHeal(amount, type){
                this.displayDamage(amount, type)
                if (this.max_hp <= this.hp + amount){
                    this.hp = this.max_hp
                }
                else{
                    this.hp += amount
                }
                this.healthBar.update()
            },


            getTotalRegenAmount(){
                let res = 0;
                for (let heal of this.status_effect.regen){
                    res += heal[0]
                }
                return res
            },

            applyRegenHeal(){

                let totalHeal = this.getTotalRegenAmount()
                for (let heal of this.status_effect.regen){
                    heal[1] -= 1
                    if (heal[1]==0){
                        this.status_effect.regen.splice(this.status_effect.regen.indexOf(heal), 1);
                    }
                }
                this.applyHeal(totalHeal, "regen")

            },

            applyCure(effects){
                let cured = 0

                for (let effect of effects){


                    if (effect=="bleed" && this.status_effect.bleed.length){
                        this.status_effect.bleed = []
                        cured = 1
                    }
                    else if(effect=="poison" && this.status_effect.poison){
                        this.status_effect.poison = 0
                        cured = 1
                    }
                    else if(effect=="stun" && this.status_effect.stun){
                        this.status_effect.stun = 0
                        cured = 1
                    }

                }

                if (cured){
                    setTimeout(() => {
                        this.displayDamage(0,'cure');
                    }, "500"); 
                }
            },

        
            applyPoisonDamage(){
                this.applyRawDamages(this.status_effect.poison, "poison")
                this.status_effect.poison -= 1
            },
        
            getTotalBleedAmount(){
                let res = 0;
                for (let drop of this.status_effect.bleed){
                    res += drop[0]
                }
                return res
            },
        
            applyBleedDamage(){
                let totalDamage = this.getTotalBleedAmount()
                for (let drop of this.status_effect.bleed){
                    drop[1] -= 1
                    if (drop[1]==0){
                        this.status_effect.bleed.splice(this.status_effect.bleed.indexOf(drop), 1);
                    }
                }
                this.applyRawDamages(totalDamage, "bleed")
            },
        
            applyStun(){
                this.status_effect.stun = 0
                this.displayDamage(0,'stun')
            },
        
            applyNormalDamage(damage, type){
                this.applyRawDamages(damage, type)
            },
        
        
            isTargeted(skill, caster){

                let dodgeRoll = Math.random() * 100;
                let missed = 0

                if (skill.damage_low != undefined && skill.damage_high!= undefined){
                    if (dodgeRoll >= this.dodge){//if dodge fails

                        let critRoll = Math.random() * 100;
                        let critCheck
  
                        if(skill.crit_mod!=undefined){      
                            critCheck = caster.crit + skill.crit_mod
                        }
                        else{
                            critCheck = caster.crit
                        }
                        
                        if (critRoll >= critCheck){ //if crit fails
                            let damage = Math.round((Math.random() * (skill.damage_high - skill.damage_low) + skill.damage_low) * caster.damage_mult)
                            damage = Math.round(damage - (damage * (this.prot/100)))
                            this.applyNormalDamage(damage, 'normal')
                        }
                        else{
                            let damage = Math.round(skill.damage_high * 1.5 * caster.damage_mult)
                            damage = Math.round(damage - (damage * (this.prot/100)))
                            this.applyNormalDamage(damage, 'crit')
                        }
                        

                    }
                    else{
                        missed = 1
                        this.displayDamage(0, 'miss')
                    }
                }
                
                if(!this.isDead() && !missed){
                    
                    if(skill.bleed != undefined){ //si l'attaque inflige du saignement
                        let proba = skill.bleed[0] - this.bleed_res //get the power of the probability of success
                        let randomNum = Math.random() * 100; //get a random number between 0 and 100 to emulate randomness in %
                        
                        let success = proba >= randomNum //check if bleed is a success
        
                        if(success){
                            this.status_effect.bleed.push([skill.bleed[1],skill.bleed[2]]) //apply bleed as a list
                        }
                    }
                    if(skill.poison != undefined){ //si l'attaque inflige du poison
                        let proba = skill.poison[0] - this.poison_res //get the power of the probability of success
                        let randomNum = Math.random() * 100; //get a random number between 0 and 100 to emulate randomness in %
                        
                        let success = proba >= randomNum //check if poison is a success
        
                        if(success){
                            this.status_effect.poison += skill.poison[1] //add the poison
                        }
                    }
                    if(skill.stun != undefined){
                        let proba = skill.stun - this.stun_res //get the power of the probability of success
                        let randomNum = Math.random() * 100; //get a random number between 0 and 100 to emulate randomness in %
                        
                        let success = proba >= randomNum //check if stun is a success
        
                        if(success){
                            this.status_effect.stun+=1 //apply stun
                        }
                    }
                }

                if (skill.heal != undefined){
                    let heal = skill.heal * caster.damage_mult
                    this.applyHeal(heal, "heal")
                }

                if (skill.cure != undefined){
                    this.applyCure(skill.cure)
                }

                if (skill.regen != undefined){
                    this.status_effect.regen.push([skill.regen[0],skill.regen[1]]) //apply regen as a list
                }
        
                this.healthBar.update()
            },
        
        
            isDead(){
                return (this.hp == 0)
            },
        
            destroyGraphics() {
                this.healthBar.destroy();
                this.sprite.destroy();
            },
        
            status_effect : {
                regen:[],
                bleed:[],
                poison: 0,
                stun:0 
            }
        }
    }
}


  