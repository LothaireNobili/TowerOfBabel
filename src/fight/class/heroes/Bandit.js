class Bandit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bandit'); 

        //base stats
        this.max_hp = 25;   
        this.hp = this.max_hp;

        this.dodge = 25;

        this.prot = 0; 

        this.speed = 8;

        this.crit = 15; //in %

        this.damage_low_range = 12;
        this.damage_high_range = 16;

        //resistance stats
        this.stun_res = 40;
        this.move_res = 20;
        this.bleed_res = 40;
        this.poison_res = 40;
        this.debuff_res = 40;

        
        
        this.skills = {
            slice: {
                name: 'Slice',
                target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2], //spot reach
                requiered_pos : [1, 2], //where the hero must be placed to cast it
                damage_mod: 10 //modifier in %
            },
            cut: {
                name: 'Cut',
                target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2], //spot reach
                requiered_pos : [1, 2], //where the hero must be placed to cast it
                damage_mod: -30,
                bleed: [120, 4, 3]  //120% chance to proc bleed, 4 damage for 3 turns
            },
            gunShot: {
                name: 'Gun shot',
                target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [2, 3, 4], //spot reach
                requiered_pos : [2, 3, 4], //where the hero must be placed to cast it
                damage_mod: -10,
                crit_mod: 15 //flat modifier in %
            },
            grapeShot: {
                name: "Grape shot",
                target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "continuous",//all reachable target are touched
                reach: [1, 2, 3], //spot reach
                requiered_pos: [2, 3], //where the hero must be placed to cast it
                damage_mod: -50,
                crit_mod: 10
            }
        };
/*
        // Set up animations (replace 'crusader_attack' with your actual animation key)
        scene.anims.create({
            key: 'crusader_attack',
            frames: scene.anims.generateFrameNumbers('crusader_attack', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        // Register the crusader with the scene
        scene.add.existing(this);*/
    }
/*
    // Add any additional methods or behaviors specific to the crusader here

    // Example method to perform an attack using a specific skill
    performAttack(target, skill) {
        if (skill && skill.remainingCooldown === 0) {
            // Play attack animation
            this.play('crusader_attack');

            // Apply damage to the target
            target.receiveDamage(skill.damage);

            // Set cooldown for the used skill
            skill.remainingCooldown = skill.cooldown;

            // Return true to indicate a successful attack
            return true;
        } else {
            // Skill is on cooldown or not valid, return false
            return false;
        }
    }

    // Example method to receive damage
    receiveDamage(amount) {
        this.hp -= amount;
        // Add any additional logic for handling damage or death
    }

    // Update method (optional)
    update() {
        // Add any additional update logic specific to the crusader
    }*/
}
