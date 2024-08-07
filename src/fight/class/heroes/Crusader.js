class Crusader{
    constructor(startPos, sprite) {
        //base stats
        this.name = "crusader"

        this.position = startPos;
        this.sprite = sprite;

        this.max_hp = 45;   
        this.hp = this.max_hp;

        this.dodge = 10;

        this.prot = 20; //20% of protection

        this.speed = 3;
        this.crit = 5; //in %

        //this.damage_mult = 1
        this.damage_mult = 1
        /*
        this.damage_low_range = 10;
        this.damage_high_range = 15;*/

        //resistance stats
        this.stun_res = 50;
        this.move_res = 60;
        this.bleed_res = 60;
        this.poison_res = 60;
        this.debuff_res = 40;

        //prepare status effect variables
        this.status_effect = {
            bleed:[],
            poison: 0,
            stun:0 
        }

        
        
        this.skills = [
            {
                id:"smite",
                name: 'Smite',
                animation: "skill1",
                target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2], //spot reach
                requiered_pos : [1, 2], //where the hero must be placed to cast it
                damage_low: 10, //minimum damage
                damage_high: 13 //max damage
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
                /*bonus : {
                    damage: [20, 3], //bonus of 50% damage for the target for 3 turn
                    speed: [5, 3] //bonus of +5 speed for 3 turn
                }*/
                heal: 10
            }
        ];
    }

    displayDamage(damageAmount, type){
        let targetX = this.arbiter.getHorizontalPosition(this.position, this.arbiter.getFighterTeam(this))
        let targetY = 250
        let amount = damageAmount

        let text
        let color
        switch (type) {
            case 'normal':
                color = '#ff2929';
                text = amount;
                break;
            case 'bleed':
                color = '#cc0000';
                text = "Bleed! " + amount
                break;
            case 'poison':
                color = '#1cc202';
                text = "Poison! " + amount
                break;
            case 'stun':
                color = "#e3c23d"
                text = "Stun!"
                break;
            default:
                color = '#ffffff';
          }
    
        let damageText = new DamageText(this.arbiter.fight_scene, 
            targetX, 
            targetY, 
            text, 
            { fontFamily: 'pixel', fontSize: '45px', color: color });
        
    }

    displayDamage(damageAmount, type){
        let targetX = this.arbiter.getHorizontalPosition(this.position, this.arbiter.getFighterTeam(this))
        let targetY = 250
        let amount = damageAmount

        let text
        let color
        switch (type) {
            case 'normal':
                color = '#ff2929';
                text = amount;
                break;
            case 'bleed':
                color = '#cc0000';
                text = "Bleed! " + amount
                break;
            case 'poison':
                color = '#1cc202';
                text = "Poison! " + amount
                break;
            case 'stun':
                color = "#e3c23d"
                text = "Stun!"
                break;
            default:
                color = '#ffffff';
          }
    
        let damageText = new DamageText(this.arbiter.fight_scene, 
            targetX, 
            targetY, 
            text, 
            { fontFamily: 'pixel', fontSize: '45px', color: color });
        
    }

    applyRawDamages(amount, type){//apply damages straight up
        this.displayDamage(amount, type)
        if (this.hp <= amount){ //if enemy dies on the spot
            this.hp = 0
        }
        else{
            this.hp -= amount
        }
        this.healthBar.update()
    }

    applyPoisonDamage(){
        this.applyRawDamages(this.status_effect.poison, "poison")
        this.status_effect.poison -= 1
    }

    getTotalBleedAmount(){
        let res = 0;
        for (let drop of this.status_effect.bleed){
            res += drop[0]
        }
        return res
    }

    applyBleedDamage(){
        let totalDamage = this.getTotalBleedAmount()
        for (let drop of this.status_effect.bleed){
            drop[1] -= 1
        }
        this.applyRawDamages(totalDamage, "bleed")
    }

    applyStun(){
        this.status_effect.stun = 0
        this.displayDamage(0,'stun')
    }

    applyNormalDamage(damage){
        this.applyRawDamages(damage, "normal")
    }


    isTargeted(skill, caster){
        if (skill.damage_low =! undefined && skill.damage_high!= undefined){
            let damage = Math.round((Math.random() * (skill.damage_high - skill.damage_low) + skill.damage_low) * caster.damage_mult)
            
            this.applyNormalDamage(damage)
        }
        if (skill.heal != undefined){

            let heal = skill.heal * caster.damage_mult

            if (this.max_hp <= this.hp + heal){
                this.hp = this.max_hp
            }
            else{
                this.hp += heal
            }
        }

        if(!this.isDead()){
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

        this.healthBar.update()
    }


    isDead(){
        return (this.hp == 0)
    }

    destroyGraphics() {
        this.healthBar.destroy();
        this.sprite.destroy();
    }
        
        

}
