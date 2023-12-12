class Vestal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'vestal'); 

        //base stats
        this.max_hp = 40;   
        this.hp = this.max_hp;

        this.dodge = 15;

        this.prot = 15; 

        this.speed = 4;

        this.crit = 5; //in %

        this.damage_low_range = 4;
        this.damage_high_range = 6;

        //resistance stats
        this.stun_res = 60;
        this.move_res = 40;
        this.bleed_res = 40;
        this.poison_res = 40;
        this.debuff_res = 40;

        
        
        this.skills = {
            divineGrace: {
                name: 'Divine grace',
                target: "team", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2, 3, 4], //spot reach
                requiered_pos : [3, 4], //where the hero must be placed to cast it
                heal: 15,  //how much it heals
            },
            divineComfort: {
                name: 'Divine grace',
                target: "team", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "continuous",//one target only
                reach: [1, 2, 3, 4], //spot reach
                requiered_pos : [3, 4], //where the hero must be placed to cast it
                heal: 6,  //how much it heals
            },
            blindingLight: {
                name: 'Blinding light',
                target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//one target only
                reach: [1, 2, 3], //spot reach
                requiered_pos : [3, 4], //where the hero must be placed to cast it
                stun: 140  //chance of the stun to proc, ennemies have some resistance so <100 doesn't guarantee the stun
            },
            escapeSmash: {
                name: "Escape smash",
                target: "enemy", //enemy is offensive, team is passive for the team, self is only for the caster
                type: "single",//all reachable target are touched
                reach: [1, 2], //spot reach
                requiered_pos: [1, 2], //where the hero must be placed to cast it
                move: -1, //backward of 1
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
