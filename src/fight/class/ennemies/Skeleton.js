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

        this.damage_low_range = 5;
        this.damage_high_range = 10;

        //resistance stats
        this.stun_res = 20;
        this.move_res = 20;
        this.bleed_res = 200;
        this.poison_res = 20;
        this.debuff_res = 20;

        //prepare status effect variables
        this.status_effect = []
        
        
        this.skills = {
            strike: {
                name: 'Strike',
                animation: "attack",
                target: "heroes", //ennemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2, 3, 4], //spot reach
                requiered_pos : [1, 2, 3, 4], //where the hero must be placed to cast it
            },
            cut: {
                name: 'Cut',
                target: "heroes", //ennemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2, 3, 4], //spot reach
                requiered_pos : [1, 2, 3, 4], //where the hero must be placed to cast it
                damage_mod: -30,
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
}
