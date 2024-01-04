class Skeleton{
    constructor(startPos, sprite) {

        //base stats
        this.name = "skeleton"

        this.position = startPos;
        this.sprite = sprite;
        
        this.max_hp = 25;   
        this.hp = this.max_hp;

        this.dodge = 10;

        this.prot = 0; 

        this.speed = 5;

        this.crit = 5; //in %

        this.damage_mult = 1
        /*this.damage_low_range = 5;
        this.damage_high_range = 10;*/

        //resistance stats
        this.stun_res = 20;
        this.move_res = 20;
        this.bleed_res = 0;
        this.poison_res = 20;
        this.debuff_res = 20;

        //prepare status effect variables
        this.status_effect = {
            bleed:[] 
             
        }
        
        
        this.skills = {
            strike: {
                name: 'Strike',
                animation: "attack",
                target: "hero", //ennemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2, 3, 4], //spot reach
                requiered_pos : [1, 2, 3, 4], //where the hero must be placed to cast it
                damage_low: 7, //minimum damage
                damage_high: 10, //max damage
            },
            cut: {
                name: 'Cut',
                target: "hero", //ennemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2, 3, 4], //spot reach
                requiered_pos : [1, 2, 3, 4], //where the hero must be placed to cast it
                damage_low: 5, //minimum damage
                damage_high: 7, //max damage
                bleed: [100, 2, 3]  //120% chance to proc bleed, 4 damage for 3 turns
            }
        }; 
    }

    getInput(playerTeam ){/*
        let skillNames = Object.keys(this.skills)
        let randomSkillName = skillNames[Math.floor(Math.random() * skillNames.length)]
        let randomSkill = this.skills[randomSkillName]
        return randomSkill*///->that's for actual random, for debug we'll just return strike
        return [this.skills.strike, playerTeam[0]]//also the playerTeam[0] should be selected randomly
    }
    


    displayDamage(damageAmount, type){
        let targetX = this.arbiter.getVerticalPosition(this.position, this.arbiter.getFighterTeam(this))
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
            default:
                color = '#000000';
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

    getTotalBleedAmount(){
        let res;
        for (let drop of this.status_effect.bleed){
            res =+ drop[0]
        }
        return res
    }

    applyBleedDamage(){
        console.log("Dégat de saignement subit!")
        let totalDamage = this.getTotalBleedAmount()
        this.applyRawDamages(totalDamage, "bleed")
    }

    applyNormalDamage(damage){
        this.applyRawDamages(damage, "normal")
    }

    isTargeted(skill, caster){
        let damage = Math.round((Math.random() * (skill.damage_high - skill.damage_low) + skill.damage_low) * caster.damage_mult)
        let that = this

        this.arbiter.currentTargetDamage.push(damage)

        this.displayDamage(damage, "normal")
        
        this.applyNormalDamage(damage)

        if(!this.isDead()){
            if(skill.bleed != undefined){ //si l'attaque inflige du saignement
                let proba = skill.bleed[0] - that.bleed_res //get the power of the probability of success
                let randomNum = Math.random() * 100; //get a random number between 0 and 100 to emulate randomness in %
                console.log("bleed is success")
                let success = proba >= randomNum //check if bleed is a success

                if(success){
                    that.status_effect.bleed.push([skill.bleed[1],skill.bleed[2]]) //apply bleed as a list
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
