// supprimer /--
var allPotionsList = [
                { id: "healPotion", name: "Potion de soin", description: "Soigne une cible", prix: 550, sellQuantity: 1 }, 
                { id: "bleedPotion", name: "Potion maudite", description: "Fait saigner \nune cible", prix: 300, sellQuantity: 1 },
                { id: "posionPotion", name: "Potion de poison", description: "Empoisonne \nune cible", prix: 300, sellQuantity: 1 },
            ];
addSellQuantityToPotions(allPotionsList)
// --/

class Hameau extends Phaser.Scene {
    constructor() {
        super({ key: 'Hameau' });
        this.graphicManager = new GraphicManager();
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
        this.load.image("cercleRed", "icons/cercle_red.png")
        this.load.image("cercleWhite", "icons/cercle_white.png")
        this.load.image("cercleYellow", "icons/cercle_yellow.png")
        this.load.image("inventaire", "icons/inventaire.png")

        for (let hero of game.config.allHeroList) {

            this.load.spritesheet(hero, "images/heroes/" + hero + "/animations/idle.png", {
                frameWidth: this.graphicManager.spriteSheetDatas[hero].idle.frameWidth,
                frameHeight: this.graphicManager.spriteSheetDatas[hero].idle.frameHeight
            })

            for (let j = 0; j < 4; j++) {
                this.load.image(hero + "Skill" + (j + 1) + "Icon",
                    "images/heroes/" + hero + "/skill" + (j + 1) + "_icon.png")
            }
            this.load.image("portrait_" + hero, "images/heroes/" + hero + "/portrait.png")
        }

    }

    create() {
        for (let hero of game.config.allHeroList) {
            this.anims.create({
                key: hero + '_idle', // Animation key (can be any string)
                frames: this.anims.generateFrameNumbers(hero, {
                    scale: 2,
                    start: 0,
                    end: this.graphicManager.spriteSheetDatas[hero].idle.end //index of the last frame of the animation
                }),
                frameRate: 20, // Number of frames to display per second
                repeat: -1, // Set to -1 to loop the animation continuously, or a positive integer to specify the number of times to repeat
            });
        }

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
        createInteractiveImage(this, 680, 580, 200, 200, "Diligence", "Recruter de nouveaux héros")
        createInteractiveImage(this, 940, 560, 230, 230, "Laboratoire", "Acheter des potions") //on retire pour la 1er version
        createInteractiveImage(this, 150, 590, 230, 230, "Forge", "Améliorer vos armes et armures")
        createInteractiveImage(this, 400, 570, 200, 200, "Depart", "Débuter l'aventure")


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
                if (key == "Depart") {
                    game.scene.stop('Hameau')
                    game.scene.start("ComposerEquipe");

                }
                else if (key == "Forge" || key == "Laboratoire") {
                    if (user.heroes.length >= 4) {
                        game.scene.stop('Hameau')
                        game.scene.start(key);
                    }
                    else {
                        barreInfo.message("Vous devez d'abord recruter 4 héros.")
                    }
                }
                else {
                    game.scene.stop('Hameau')
                    game.scene.start(key);
                }

            });

            return image;
        }
    }

    update() { }
}

