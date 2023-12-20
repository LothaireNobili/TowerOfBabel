class Diligence extends Phaser.Scene {
  constructor() {
    super({ key: 'Diligence' });
  }
  preload() {
    this.load.setBaseURL('../../../assets/')
    this.load.image("cercleRed", "icons/cercle_red.png")
    this.load.image("cercleWhite", "icons/cercle_white.png")
    this.load.image("cercleYellow", "icons/cercle_yellow.png")

    for (let i = 0; i < allHeroList.length; i++) {
      for (let j = 0; j < 4; j++) {
        this.load.image(allHeroList[i] + "Skill" + (j + 1) + "Icon",
          "images/heroes/" + allHeroList[i] + "/skill" + (j + 1) + "_icon.png")
      }
    }
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
    var boutiqueBackground = this.add.image(430, 440, "boutiqueBg")
    boutiqueBackground.displayWidth = 830;
    boutiqueBackground.displayHeight = 580;
    var diligence = this.add.image(300, 450, "Diligence")
    diligence.setScale(0.6)
    // Ajouter des heros
    var intervalleY = 72
    let count = 0;
    for (var i = 0; i < allHeroList.length; i++) {
      const heroIndex = user.heroes.findIndex(hero => hero.heroName === allHeroList[i]);
      if (heroIndex == -1) {
        createInteractiveImage(this, 670, 230 + count * intervalleY, allHeroList[i], 1000, true)
        count++;
      }
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
    for (let i = 0; i < user.heroes.length; i++) {
      createInteractiveImage(this, 1025, 230 + i * intervalleY, user.heroes[i].heroName)
    }


    // Créez une fonction pour les objets image, les paramètres de description
    function createInteractiveImage(scene, x, y, key, prix, onSale) {
      var card = scene.add.container(x, y);
      var image = scene.add.image(0, 0, "card");

      var portrait = scene.add.image(-85, 0, "portrait_" + key);
      portrait.setScale(0.75);
      image.displayHeight = 65;
      image.displayWidth = 230;

      var name = scene.add.text(-47, -30, key, setFontStyles("22px"));
      card.add([image, portrait, name]);

      if (prix !== undefined) {
        var piecesIcon = scene.add.image(-38, 16, "pieces");
        piecesIcon.setScale(0.12);
        var prixText = scene.add.text(-20, 5, prix, setFontStyles("20px"));
        card.add([piecesIcon, prixText]);
      }

      image.setInteractive();

      var descriptionContainer = scene.add.container(300, 440);

      var descriptionBg = scene.add.image(0, 0, "card");
      descriptionBg.displayWidth = 460;
      descriptionBg.displayHeight = 500;
      var heroName = scene.add.text(-200, -200, key.toUpperCase(), setFontStyles());
      var heroImage = scene.add.image(-130, 65, "idle_" + key);
      heroImage.setScale(0.5);

      descriptionContainer.add([descriptionBg, heroName, heroImage]);

      for (var i = 0; i < 4; i++) {
        var skillCard = scene.add.image(0, -50 + i * 80, key + "Skill" + (i + 1) + "Icon");
        skillCard.setScale(0.6);
        var skillName = scene.add.text(30, -72 + i * 80, "Coup d'épée", setFontStyles("18px"));
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

      if (onSale) {
        // acheter hero
        image.on('pointerdown', function () {
          if (user.coins - prix >= 0) {
            //exemple
            let eqpWeapon = {
              equipmentName: "eqpWeapon",
              level: 1,
              attack: 9
            }
            let eqpArmour = {
              equipmentName: "eqpArmour",
              level: 1,
              defense: 4
            }

            // Retirer le héros de la boutique
            image.destroy();
            card.destroy();

            user.addHero(key, eqpWeapon, eqpArmour)
            user.updateCoins(-prix)

            scene.scene.restart();
          }
          else{
            barreInfo.coinSignaler()
          }

        });

      }

      return image;
    }

    function createPositionCard(scene, y, teamPosition, attackRange) {
      var card = scene.add.container(0, 0);

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