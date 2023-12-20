// supprimer /--
var allHeroList = ["crusader", "bandit","plaguedoctor","vestal"];
var allPotionsList = [{ name: "exemple1", description: "description", prix: 550, sellQuantity: 1 }, { name: "exemple2", description: "description", prix: 300, sellQuantity: 1 }]; 
addSellQuantityToPotions(allPotionsList)
// --/

class Hameau extends Phaser.Scene {
    constructor() {
        super({ key: 'Hameau' });
    }

    preload() {
        this.load.setBaseURL('./assets/')
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

        for (let i = 0; i < allHeroList.length; i++) {
            this.load.image("portrait_" + allHeroList[i], "images/heroes/" + allHeroList[i] + "/portrait.png")
            this.load.image("idle_" + allHeroList[i], "images/heroes/" + allHeroList[i] + "/idle.png")
        }
    }

    create() {
         
        document.body.style.cursor = "default";

        var descriptions = {};

        this.add.image(540, 360, "hameauBg");

        // Barre d'information
        var enseigne = this.add.image(540, 85, "enseigne");
        enseigne.setScale(0.55)
        this.add.text(490, 115, "HAMEAU", setFontStyles());

        const barreInfo = new BarreInfo(this);
        barreInfo.creerBarreInfo();  // Crée la barre d'information

        // Créez un objet image et stockez-le dans un tableau
        createInteractiveImage(this, 680, 580, 200, 200, "Diligence", "recruter de nouveaux héros")
        createInteractiveImage(this, 940, 560, 230, 230, "Laboratoire", "acheter des potion")
        createInteractiveImage(this, 150, 590, 230, 230, "Forge", "acheter des armes et armures")
        createInteractiveImage(this, 400, 570, 200, 200, "Depart", "débuter l'aventure")


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
                setFontStyles("22px")
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

                game.scene.stop('Hameau')
                if(key == "Depart"){
                    game.scene.start("ComposerEquipe");
                }
                else{

                    game.scene.start(key);
                }

            });

            return image;
        }
    }

    update() { }
}

