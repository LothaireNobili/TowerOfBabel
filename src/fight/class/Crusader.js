class Crusader extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'crusader'); // 'crusader' should be the key of your loaded sprite image

        // Crusader-specific properties
        this.hp = 45;
        this.damage_low_range = 15;
        this.damage_high_range = 20;
        this.skills = {
            smite: {
                name: 'Smite',
                damage: 20,
                cooldown: 0, // Cooldown in turns
                remainingCooldown: 0
            },
            holyStrike: {
                name: 'Holy Strike',
                damage: 15,
                cooldown: 3,
                remainingCooldown: 0
            }
            // Add more skills as needed
        };

        // Set up animations (replace 'crusader_attack' with your actual animation key)
        scene.anims.create({
            key: 'crusader_attack',
            frames: scene.anims.generateFrameNumbers('crusader_attack', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        // Register the crusader with the scene
        scene.add.existing(this);
    }

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
    }
}
