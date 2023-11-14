import BarreInfo from "../../util/classBarreInfo.js";

export default class Laboratoire extends Phaser.Scene {
  constructor() {
    super({ key: 'Laboratoire' });
  }
  preload() {
    this.load.setBaseURL('src/assets/')
    this.load.image("gandoulf", "images/hameau/Gandoulf_ancien.png")
    this.load.image("boutiqueBg", "images/hameau/boutique_bg.png");
    this.load.image("inventaire", "icons/inventaire.png")
  }
  create() {
    var descriptions = {};
    this.add.image(540, 360, "hameauBg");

    // Barre d'information
    var enseigne = this.add.image(200, 85, "enseigne");
    enseigne.setScale(0.55)
    var retourText = this.add.text(150, 115, "RETOUR", setFontStyles());
    enseigne.setInteractive();

    enseigne.on("pointerover", function () {
      enseigne.setTexture("enseigneFocus");
      retourText.setTint("0xD2BA70")
      document.body.style.cursor = "pointer";
    });

    enseigne.on("pointerout", function () {
      enseigne.setTexture("enseigne");
      retourText.setTint("0xffffff")
      document.body.style.cursor = "default";
    });

    enseigne.on('pointerdown', function () {
      this.scene.start('Hameau');
      setTimeout(() => {
        this.scene.setVisible(false, 'PassDataScene')
        setTimeout(() => {
          this.scene.setVisible(true, 'PassDataScene')
        }, 5000)
      }, 5000)
    }, this);

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

    // La boutique
    var boutiqueBackground = this.add.image(530, 440, "boutiqueBg")
    boutiqueBackground.displayWidth = 1000;
    boutiqueBackground.displayHeight = 580;

    var gandoulf = this.add.image(230, 500, "gandoulf")
    gandoulf.setScale(0.75)
    this.add.text(100, 250, "Gandoulf l'ancien", setFontStyles(undefined, "26px"));

    // Ajouter des potions
    var intervalleX = 135
    var intervalleY = 230
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 2; j++) {

        if (i == 3)
          createInteractiveImage(this, 460 + i * intervalleX, 300 + j * intervalleY, "exemple", "Description", 99, true)
        else
          createInteractiveImage(this, 460 + i * intervalleX, 300 + j * intervalleY, "exemple", "Description", 99, false)

        var nbInventaire = this.add.text(490 + i * intervalleX, 340 + j * intervalleY, "0", setFontStyles(undefined, "18px", "#D2BA70"))

        // Information
        var nomPotion = this.add.text(412 + i * intervalleX, 370 + j * intervalleY, "exemple", setFontStyles(undefined, "20px",))
        var pieceIcon = this.add.image(422 + i * intervalleX, 415 + j * intervalleY, "pieces");
        pieceIcon.setScale(0.16);
        var pieces = this.add.text(440 + i * intervalleX, 405 + j * intervalleY, "100", setFontStyles(undefined, "20px"))
      }
    }

    // Créez une fonction pour les objets image, les paramètres de description
    function createInteractiveImage(scene, x, y, key, descriptionText, nbInventaire, left) {
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

      var description = scene.add.text(-80, -50, descriptionText, setFontStyles(undefined, "20px"));

      var inventaireIcon = scene.add.image(52, 53, "inventaire");
      inventaireIcon.setScale(0.08);

      var inventaireQte = scene.add.text(65, 44, nbInventaire.toString(), setFontStyles(undefined, "16px"));

      // Initialement, l’élément de détail est masqué
      descriptionContainer.add([descriptionBg, description, inventaireIcon, inventaireQte]);
      descriptionContainer.setVisible(false);
      descriptionContainer.setDepth(1); // Ajustez la valeur de profondeur pour assurer qu’elle est au-dessus des autres éléments

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

      return image;
    }

  }
  update() { }
}