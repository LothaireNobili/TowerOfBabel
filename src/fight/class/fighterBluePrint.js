class FighterBluePrint{
    constructor(){
        this.classBlueprints = {
            crusader: {
                max_hp: 45,  
                hp: 45,
        
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
        
                //prepare status effect variables
                /*
                status_effect = {
                    bleed:[],
                    poison: 0,
                    stun:0 
                }*/
        
                
                
                skills : [
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
                ]
            },
        
        
            bandit: {
                max_hp : 25,   
                hp : 25,
        
                dodge : 25,
        
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
        
                //prepare status effect variables
                /*this.status_effect : {
                    bleed:[],
                    poison: 0,
                    stun:0 
                }*/
        
        
                
                
                skills : [
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
                ]
            }
          };
    }
}


  