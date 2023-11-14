class Diligence extends Phaser.Scene {
  constructor() {
    super({ key: 'Diligence' });
  }
  preload() {
    this.load.setBaseURL('../../../assets/')
    this.load.image("crusaderPortrait", "images/heroes/crusader/portrait.png")
    this.load.image("crusaderIdle", "images/heroes/crusader/idle.png")
    this.load.image("crusaberSkill1", "images/heroes/crusader/icons_skill/coup_epee.png")
    this.load.image("cercleRed", "icons/cercle_red.png")
    this.load.image("cercleWhite", "icons/cercle_white.png")
    this.load.image("cercleYellow", "icons/cercle_yellow.png")
  }
  create() {
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

    var diligence = this.add.image(300, 450, "Diligence")
    diligence.setScale(0.6)


    // Ajouter des heros
    var intervalleY = 72
    for (var i = 0; i < 7; i++) {
      createInteractiveImage(this, 670, 230 + i * intervalleY, "crusader", 1000)
    }


    // equipe
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
    for (var i = 0; i < 5; i++) {
      createInteractiveImage(this, 1025, 230 + i * intervalleY, "crusader")
    }


    // Créez une fonction pour les objets image, les paramètres de description
    function createInteractiveImage(scene, x, y, key, prix) {
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

      descriptionContainer.add([descriptionBg, heroName, heroImage]);

      for (var i = 0; i < 4; i++) {
        var skillCard = scene.add.image(0, -50 + i * 80, "crusaberSkill1");
        skillCard.setScale(0.15);
        var skillName = scene.add.text(30, -72 + i * 80, "Coup d'épée", setFontStyles(undefined, "18px"));
        descriptionContainer.add([skillCard, skillName]);

        var positionCard = createPositionCard(scene, -40 + i * 80, [0, 0, 1, 1], [1, 1, 0, 0]);
        descriptionContainer.add(positionCard);
      }

      descriptionContainer.setVisible(false);

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

    function createPositionCard(scene, y, teamPosition, attackRange) {
      var card = scene.add.container(0, 0);
      var positions = [];
      var attackRanges = [];
      for (var i = 0; i < 4; i++) {
        var position = scene.add.image(36 + i * 13, y, "cercle" + (teamPosition[i] ? "Yellow" : "White"));
        var range = scene.add.image(100 + i * 13, y, "cercle" + (attackRange[i] ? "Red" : "White"));
        position.setScale(0.2);
        range.setScale(0.2);

        card.add([position, range]);
      }

      return card;
    }


  }
  update() { }
}