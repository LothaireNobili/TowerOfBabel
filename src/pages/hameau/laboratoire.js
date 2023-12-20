class Laboratoire extends Phaser.Scene {
  constructor() {
    super({ key: 'Laboratoire' });
  }
  preload() {
    this.load.setBaseURL('./assets/')
    this.load.image("gandoulf", "images/hameau/Gandoulf_ancien.png")
    this.load.image("inventaire", "icons/inventaire.png")
  }
  create() {
   
    document.body.style.cursor = "default";

    this.add.image(540, 360, "hameauBg");

    // Barre d'information
    var enseigne = this.add.image(200, 85, "enseigne");
    createEnseigneReturnBtn(this, enseigne)
    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();  // Crée la barre d'information

    // La boutique
    var boutiqueBackground = this.add.image(530, 440, "boutiqueBg")
    boutiqueBackground.displayWidth = 1000;
    boutiqueBackground.displayHeight = 580;

    var gandoulf = this.add.image(230, 500, "gandoulf")
    gandoulf.setScale(0.75)
    this.add.text(100, 250, "Gandoulf l'ancien", setFontStyles("26px"));

    // Ajouter des potions
    var intervalleX = 135
    var intervalleY = 230

    for (let i = 0; i < 2; i++) {
      for (let j = i * 4; j < allPotionsList.length; j++) {
        let potion = allPotionsList[j]

        // Information
        var sellQuantity = this.add.text(490 + j * intervalleX, 340 + i * intervalleY, potion.sellQuantity, setFontStyles("18px", "#D2BA70"))
        sellQuantity.setDepth(1)
        var nomPotion = this.add.text(412 + j * intervalleX, 370 + i * intervalleY, potion.name, setFontStyles("20px",))
        var pieceIcon = this.add.image(422 + j * intervalleX, 415 + i * intervalleY, "pieces");
        pieceIcon.setScale(0.16);
        var pirce = this.add.text(440 + j * intervalleX, 405 + i * intervalleY, potion.prix, setFontStyles("20px"))

        if (j == 3)
          createInteractiveImage(this, 460 + j * intervalleX, 300 + i * intervalleY, potion.name, potion.description, user.getPotionQte(potion.name), sellQuantity, potion.prix, true)
        else
          createInteractiveImage(this, 460 + j * intervalleX, 300 + i * intervalleY, potion.name, potion.description, user.getPotionQte(potion.name), sellQuantity, potion.prix, false)

      }
    }

    // Créez une fonction pour les objets image, les paramètres de description
    function createInteractiveImage(scene, x, y, key, descriptionText, qte, sellQuantity, prix, left) {
      var image = scene.add.image(x, y, "card");
      image.setScale(0.18);
      image.setInteractive();

      // Créer un conteneur pour contenir les éléments de détail
      if (left == true)
        var descriptionContainer = scene.add.container(x - 150, y);
      else
        var descriptionContainer = scene.add.container(x + 150, y);

      var descriptionBg = scene.add.image(0, 0, "cardFocus");
      descriptionBg.setScale(0.25);
      descriptionBg.setAlpha(0.95);
      descriptionBg.setAngle(90);

      var description = scene.add.text(-80, -50, descriptionText, setFontStyles("20px"));

      var inventaireIcon = scene.add.image(52, 53, "inventaire");
      inventaireIcon.setScale(0.08);

      var inventaireQte = scene.add.text(65, 44, qte, setFontStyles("16px"));

      // Initialement, l’élément de détail est masqué
      descriptionContainer.add([descriptionBg, description, inventaireIcon, inventaireQte]);
      descriptionContainer.setVisible(false);
      descriptionContainer.setDepth(2); // Ajustez la valeur de profondeur pour assurer qu’elle est au-dessus des autres éléments

      image.on("pointerover", function () {
        image.setTexture("cardFocus");
        descriptionContainer.setVisible(true);
        document.body.style.cursor = "pointer";
      });

      image.on("pointerout", function () {
        image.setTexture("card");
        descriptionContainer.setVisible(false);
        document.body.style.cursor = "default";
      });

      image.on('pointerdown', function () {

        if (user.coins - prix >= 0) {
          // Trouver la potion correspondante
          const potion = allPotionsList.find(p => p.name === key);

          if (potion) {
            // Mettre à jour les stocks et les quantités vendues
            if (potion.sellQuantity > 0) {
              potion.sellQuantity--;
              sellQuantity.setText(potion.sellQuantity); // Mettre à jour l'affichage des quantités vendues
              inventaireQte.setText(user.getPotionQte(potion.name) + 1)
              user.addPotion(key, 1)
              user.updateCoins(-prix)

              scene.scene.restart();
            } else {
              console.log("Out of stock or no sellable quantity.");
            }
          }
        }


      });


      return image;
    }

  }
  update() { }
}