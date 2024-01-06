class Bandit{
    constructor(startPos, sprite) {
        //base stats

        this.name = "bandit"

        this.position = startPos;
        this.sprite = sprite;

        this.max_hp = 25;   
        this.hp = this.max_hp;

        this.dodge = 25;

        this.prot = 0; 

        this.speed = 8;

        this.crit = 15; //in %

        this.damage_mult = 1
        /*
        this.damage_low_range = 12;
        this.damage_high_range = 16;*/

        //resistance stats
        this.stun_res = 40;
        this.move_res = 20;
        this.bleed_res = 40;
        this.poison_res = 40;
        this.debuff_res = 40;

        //prepare status effect variables
        this.status_effect = {
            bleed:[],
            poison: 0,
            stun:0 
        }


        
        
        this.skills = [
            {
                id:"slice",
                name: 'Slice',
                animation: "skill1",
                target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2], //spot reach
                requiered_pos : [1, 2], //where the hero must be placed to cast it
                damage_low: 9, //minimum damage
                damage_high: 12 //max damage
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
                reach: [2, 3, 4], //spot reach
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
        ];

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
        let res;
        for (let drop of this.status_effect.bleed){
            res =+ drop[0]
        }
        return res
    }

    applyBleedDamage(){
        let totalDamage = this.getTotalBleedAmount()
        if (this.hp <= totalDamage){ //if enemy dies on the spot
            this.hp = 0
        }
        else{
            this.hp = this.hp - totalDamage
        }
        this.healthBar.update()
    }

    applyStun(){
        this.status_effect.stun = 0
        this.displayDamage(0,'stun')
    }

    isTargeted(skill, caster){
        if (skill.target == "hero"){
                let damage = Math.round((Math.random() * (skill.damage_high - skill.damage_low) + skill.damage_low) * caster.damage_mult)
            
                if (this.hp <= damage){
                    this.hp = 0
                    //self.die
                }
                else{
                    this.hp -= damage
                }
            }
        else if(skill.target == "team" || skill.target == "self"){
            if (skill.hasOwnProperty("heal")){

                let heal = skill.heal * caster.damage_mult

                if (this.max_hp <= this.hp + heal){
                    this.hp = this.max_hp
                }
                else{
                    this.hp += heal
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
