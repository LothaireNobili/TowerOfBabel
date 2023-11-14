class Crusader extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'crusader'); // 'crusader' should be the key of your loaded sprite image

        //base stats
        this.max_hp = 45;   
        this.hp = this.max_hp;

        this.dodge = 10;

        this.prot = 20; //20% of protection

        this.speed = 3;

        this.crit = 5; //in %

        this.damage_low_range = 10;
        this.damage_high_range = 15;

        //resistance stats
        this.stun_res = 60;
        this.move_res = 60;
        this.bleed_res = 60;
        this.poison_res = 40;
        this.debuff_res = 40;

        
        
        this.skills = {
            smite: {
                name: 'Smite',
                target: "ennemy", //ennemy is offensive, team is passive for the team, self is only for the caster
                reach: [1, 2], //spot reach
                requiered_pos : [1, 2], //where the hero must be placed to cast it
                damage_mod: 10 //modifier in %
            },
            stunningBlow: {
                name: 'Stunning blow',
                target: "ennemy", //ennemy is offensive, team is passive for the team, self is only for the caster
                reach: [1, 2], //spot reach
                requiered_pos : [1, 2], //where the hero must be placed to cast it
                damage_mod: -40,
                stun: 120  //chance of the stun to proc, ennemies have some resistance so <100 doesn't guarantee the stun
            },
            holyLance: {
                name: 'Holy lance',
                target: "ennemy", //ennemy is offensive, team is passive for the team, self is only for the caster
                reach: [2, 3, 4], //spot reach
                requiered_pos : [3, 4], //where the hero must be placed to cast it
                crit_mod: 5 //flat modifier in %
            },
            warCry: {
                name: "War cry",
                target: "team", //ennemy is offensive, team is passive for the team, self is only for the caster
                reach: [2, 3, 4], //spot reach
                requiered_pos : [3, 4], //where the hero must be placed to cast it
                bonus : {
                    damage: [20, 3], //bonus of 50% damage for the target for 3 turn
                    speed: [5, 3] //bonus of +5 speed for 3 turn
                }
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
