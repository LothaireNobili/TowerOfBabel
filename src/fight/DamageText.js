class DamageText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        console.log("Pwets")
        scene.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.setDepth(2);

        // Durée d'affichage du texte flottant
        this.duration = 2500;

        // Vitesse de déplacement vers le haut
        this.velocityY = -0.03;

        // Temps écoulé depuis l'affichage du texte
        this.elapsedTime = 0;

        // Mettez à jour la position et la durée du texte flottant
        scene.events.on('update', this.preUpdate, this);
    }

    preUpdate(time, delta) {
        
        this.elapsedTime += delta;

        // Déplacement vers le haut
        this.y += this.velocityY * delta;

        // Disparition après la durée spécifiée
        if (this.elapsedTime >= this.duration) {
            this.destroy();
        }
    }
}

