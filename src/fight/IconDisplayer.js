class IconDisplayer {
    constructor(combattant) {
        this.combattant = combattant;
        this.active_icons = [];  // Un dictionnaire pour stocker les icônes actives
        this.statut_effect_list = ["bleed", "poison", "stun"]
    }

    displayIcon(effect) {
        // check if the icon is already displayed
        if (!this.active_icons.includes(effect)) {
            // Affiche l'icône en utilisant Phaser ou toute autre logique d'affichage
            // Remplacez cela par votre propre code d'affichage
            console.log(`Affichage de l'icône : ${icon}`);
            this.icons[icon] = true;
        }
    }

    hideIcon(icon) {
        // Vérifie si l'icône est actuellement affichée
        if (this.icons[icon]) {
            // Masque l'icône en utilisant Phaser ou toute autre logique de masquage
            // Remplacez cela par votre propre code de masquage
            console.log(`Masquage de l'icône : ${icon}`);
            delete this.icons[icon];
        }
    }

    update() {
        // Met à jour l'affichage des icônes en fonction des effets de statut actifs
        const activeStatusEffects = this.combattant.getActiveStatusEffects();

        // Cache toutes les icônes qui ne sont plus actives
        for (const icon in this.icons) {
            if (!activeStatusEffects.includes(icon)) {
                this.hideIcon(icon);
            }
        }

        // Affiche les nouvelles icônes actives
        for (const effect of activeStatusEffects) {
            if (!this.icons[effect]) {
                this.displayIcon(effect);
            }
        }
    }
}

// Exemple d'utilisation
/*
const combattant = new Combattant();
const iconDisplayer = new IconDisplayer(combattant);
*/

/*
// Simulation de l'application d'un effet de statut
combattant.applyStatusEffect("saignement");

// Simulation de la mise à jour de l'affichage des icônes
iconDisplayer.update();*/
