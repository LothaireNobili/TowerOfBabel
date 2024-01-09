
// Common functions for all heroes
class HeroFactory{

    constructor(){

/*
        this.commonFighterFunctions = {
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
                
            },
        
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
                }
                this.applyRawDamages(totalDamage, "bleed")
            },
        
            applyStun(){
                this.status_effect.stun = 0
                this.displayDamage(0,'stun')
            },
        
            applyNormalDamage(damage){
                this.applyRawDamages(damage, "normal")
            },
        
        
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
            },
        
        
            isDead(){
                return (this.hp == 0)
            },
        
            destroyGraphics() {
                this.healthBar.destroy();
                this.sprite.destroy();
            },
        
            status_effect : {
                bleed:[],
                poison: 0,
                stun:0 
            }
        
          };*/
    }

    
      
      // Hero factory function
    createHero(className, startPos, sprite) {

        this.bluePrint = new FighterBluePrint();
        // Check if the specified class exists in the blueprints
        if (!this.bluePrint.classBlueprints[className]) {
          throw new Error(`Class ${className} does not exist.`);
        }
      
        // Create the initial hero object by merging stats with common functions
        //const hero = { ...this.bluePrint.classBlueprints[className], ...this.commonFighterFunctions };
        const hero = Object.assign(
            {},
            this.bluePrint.classBlueprints[className],
            this.bluePrint.commonFunctions);
        hero.position = startPos;
        hero.sprite = sprite;
        
        return hero;
    }
}

  