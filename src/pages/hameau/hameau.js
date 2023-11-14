import BarreInfo from "../../util/classBarreInfo.js";
import { game } from '../../../game.js';

export default class Hameau extends Phaser.Scene {
    constructor() {
        super({ key: 'Hameau' });
    }

    preload() {
        this.load.setBaseURL('src/assets/')
        this.load.image("hameauBg", "images/hameau/hameau_bg.png");
        this.load.image("Laboratoire", "images/hameau/laboratoire.png");
        this.load.image("Forge", "images/hameau/forge.png");
        this.load.image("Depart", "images/hameau/departBtn.png");
        this.load.image("Diligence", "images/hameau/diligence.png");
        this.load.image("DiligenceFocus", "images/hameau/diligence_focus.png");
        this.load.image("LaboratoireFocus", "images/hameau/laboratoire_focus.png");
        this.load.image("ForgeFocus", "images/hameau/forge_focus.png");
        this.load.image("DepartFocus", "images/hameau/departBtn_focus.png");
        this.load.image("pieces", "icons/piece.png");
        this.load.image("enseigne", "images/hameau/enseigne.png")
        this.load.image("enseigneFocus", "images/hameau/enseigne_focus.png")
        this.load.image("card", "images/hameau/card.jpg")
        this.load.image("cardFocus", "images/hameau/card_focus.jpg")
        this.load.image("boutiqueBg", "images/hameau/boutique_bg.png");
    }

    create() {
        // var buildingImages = [];
        var descriptions = {};
        var userID = localStorage.getItem('userID') || "USER_ID"; // Obtenir ID de l'utilisateur à partir du  localstorage. S'il n'existe pas, utiliser la valeur par défaut.
        var nbPiece = localStorage.getItem('nbPiece') || "0"; // Obtenir la quantité de pièces depuis le localstorage.

        this.add.image(540, 360, "hameauBg");

        var enseigne = this.add.image(540, 85, "enseigne");
        enseigne.setScale(0.55)
        this.add.text(490, 115, "HAMEAU", setFontStyles());

        // Créez un objet image et stockez-le dans un tableau
        createInteractiveImage(this, 680, 580, 200, 200, "Diligence", "recruter de nouveaux héros")
        createInteractiveImage(this, 940, 560, 230, 230, "Laboratoire", "acheter des potion")
        createInteractiveImage(this, 150, 590, 230, 230, "Forge", "acheter des armes et armures")
        createInteractiveImage(this, 400, 570, 200, 200, "Depart", "débuter l'aventure")

        // Barre d'information
        var hudBackground = this.add.graphics();
        var userIDText = this.add.text(30, 10, '', setFontStyles());
        var nbPiecesText = this.add.text(970, 9, '', setFontStyles());
        var piece = this.add.image(940, 25, "pieces");
        piece.setScale(0.28);
        this.add.text(448, 10, "Tower of Babel", setFontStyles(undefined, "26px"));

        const barreInfo = new BarreInfo(hudBackground, userIDText, nbPiecesText)
        barreInfo.creerBarreInfo()
        barreInfo.setUserInfo()

        // Enregistrer les informations dans localstorage lors du rafraîchissement de la page.
        window.addEventListener('beforeunload', barreInfo.saveUserInfoToLocalStorage);

        // Créez une fonction pour les objets image, les paramètres de description
        function createInteractiveImage(scene, x, y, width, height, key, descriptionText) {
            var image = scene.add.image(x, y, key);
            image.displayWidth = width;
            image.displayHeight = height;

            // Créez et attachez des objets de texte de description
            var description = scene.add.text(
                x - 100,
                y - 170,
                key.toUpperCase() + "\n" + descriptionText,
                setFontStyles(undefined, "22px")
            );

            description.visible = false; // Initialisation en tant qu'invisible

            descriptions[key] = description;

            // ajoutez un écouteur d'événement à chaque objet image
            image.setInteractive();

            image.on("pointerover", function () {
                image.setTexture(key + "Focus");
                description.visible = true; // Afficher le texte de description
                document.body.style.cursor = "pointer"; // Définir le style de curseur comme une main
            });

            // Restaurer l'image d'origine lors du retrait de la souris
            image.on("pointerout", function () {
                image.setTexture(key);
                description.visible = false;
                document.body.style.cursor = "default"; // Configurer le style du curseur en tant que style par défaut
            });

            image.on("pointerdown", function () {
                if(key == "Depart")
                    game.scene.start("bootGame");
                else
                    game.scene.start(key);
                
                
                // setTimeout(() => {
                //     this.scene.setVisible(false, 'PassDataScene')
                //     setTimeout(() => {
                //         this.scene.setVisible(true, 'PassDataScene')
                //     }, 5000)
                // }, 5000)
            });

            return image;
        }
    }

    update() { }
}

