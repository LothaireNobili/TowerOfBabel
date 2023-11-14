import BarreInfo from "../../util/classBarreInfo.js";

export default class Forge extends Phaser.Scene {
  constructor() {
    super({ key: 'Forge' });
  }
  preload() {
    this.load.setBaseURL('src/assets/')
    this.load.image("crusaderPortrait", "images/heroes/crusader/portrait.png")
    this.load.image("crusaderIdle", "images/heroes/crusader/idle.png")
    this.load.image("crusaberSkill1", "images/heroes/crusader/icons_skill/coup_epee.png")
    this.load.image("tony", "images/hameau/tony.png")
    this.load.image("eqp", "images/heroes/crusader/icons_equip/eqp_armour_1.png")
  }
  create() {
    var epuipe = ["crusader", "crusader"]
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

    var boutiqueBackground = this.add.image(430, 440, "boutiqueBg")
    boutiqueBackground.displayWidth = 830;
    boutiqueBackground.displayHeight = 580;

    var tony = this.add.image(220, 510, "tony")
    tony.setScale(0.35)
    this.add.text(70, 260, "Tony le forgeron", setFontStyles(undefined, "26px"));


    // Ajouter des heros
    var intervalleY = 125
    for (var i = 0; i < 4; i++) {
      var card = this.add.image(610, 260 + i * intervalleY, "card")
      card.displayHeight = 116;
      card.displayWidth = 370;

      var eqp = this.add.image(450, 260 + i * intervalleY, "eqp")
      eqp.setScale(0.8)
      eqp.setDepth(1);

      this.add.text(490, 210 + i * intervalleY, "exemple", setFontStyles(undefined, "22px"))
      this.add.text(490, 250 + i * intervalleY, "description", setFontStyles(undefined, "20px"))

      var piecesIcon = this.add.image(730, 222 + i * intervalleY, "pieces");
      piecesIcon.setScale(0.12);
      this.add.text(750, 211 + i * intervalleY, 300, setFontStyles(undefined, "20px"));

    }


    // équipement
    var equipeBackground = this.add.image(1000, 440, "boutiqueBg")
    equipeBackground.displayWidth = 220;
    equipeBackground.displayHeight = 580;

    var text = this.add.text(897, 135, "Votre équipe", {
      fontFamily: "Comic Sans MS",
      fontSize: "24px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: { x: 25, y: 10 },
      color: "#ffffff",
    });
    text.setFixedSize(200, 50);

    var intervalleY = 72
    for (var i = 0; i < epuipe.length; i++) {
      if (i == 0)
        createInteractiveImage(this, 1025, 230 + i * intervalleY, epuipe[i], true)
      else
        createInteractiveImage(this, 1025, 230 + i * intervalleY, epuipe[i], false)
    }


    // Créez une fonction pour les objets image, les paramètres de description
    function createInteractiveImage(scene, x, y, key, prix, visible) {
      var card = scene.add.container(x, y);
      var image = scene.add.image(0, 0, "card");

      var portrait = scene.add.image(-85, 0, key + "Portrait");
      portrait.setScale(0.75);
      image.displayHeight = 65;
      image.displayWidth = 230;

      var name = scene.add.text(-47, -30, key, setFontStyles(undefined, "22px"));
      card.add([image, portrait, name]);

      if (prix !== undefined) {
        var piecesIcon = scene.add.image(-38, 16, "pieces");
        piecesIcon.setScale(0.12);
        var prixText = scene.add.text(-20, 5, prix, setFontStyles(undefined, "20px"));
        card.add([piecesIcon, prixText]);
      }

      image.setInteractive();

      var descriptionContainer = scene.add.container(300, 440);

      var descriptionBg = scene.add.image(0, 0, "card");
      descriptionBg.displayWidth = 460;
      descriptionBg.displayHeight = 500;
      var heroName = scene.add.text(-200, -200, key.toUpperCase(), setFontStyles());
      var heroImage = scene.add.image(-130, 65, key + "Idle");
      heroImage.setScale(0.5);

      descriptionContainer.add([descriptionBg, heroName, heroImage])

      if (visible)
        descriptionContainer.setVisible(true);
      else
        descriptionContainer.setVisible(false);

      image.on("pointerover", function () {
        document.body.style.cursor = "pointer";
      });

      image.on("pointerdown", function () {
        // for (var i = 0; i < epuipe.length; i++) {
        //   if(i == 0)
        //   createInteractiveImage(this, 1025, 230 + i * intervalleY, epuipe[i],true)
        //   else
        //     createInteractiveImage(this, 1025, 230 + i * intervalleY, epuipe[i],false)
        // }

        image.setTexture("cardFocus");
        descriptionContainer.setVisible(true);
        document.body.style.cursor = "default";
      });

      return image;
    }

  }
  update() { }
}