const MAX_EQUIPEMENT_LEVEL = 5
const UPGRADE_PRICE_LIST = [300, 1000, 4000, 10000]
const UPGRADE_VALUE = 2

class Forge extends Phaser.Scene {
  constructor() {
    super({ key: 'Forge' });
  }
  preload() {
    this.load.setBaseURL('../../../assets/')
    this.load.image("tony", "images/hameau/tony.png")
    this.load.image("check", "icons/check_mark.png")
    this.load.image("padlock", "icons/padlock.png")
    this.load.image("padlockOpen", "icons/padlock_open.png")
    this.load.image("attack", "icons/pointy_sword.png")
    this.load.image("defense", "icons/shield_echoes.png")

    for (let i = 0; i < userHeroList.length; i++) {
      this.load.image("armour_" + userHeroList[i].heroName, "images/heroes/" + userHeroList[i].heroName + "/icons_equip/eqp_armour_0.png")
      this.load.image("weapon_" + userHeroList[i].heroName, "images/heroes/" + userHeroList[i].heroName + "/icons_equip/eqp_weapon_0.png")
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

    var boutiqueBackground = this.add.image(430, 440, "boutiqueBg")
    boutiqueBackground.displayWidth = 830;
    boutiqueBackground.displayHeight = 580;

    var tony = this.add.image(220, 510, "tony")
    tony.setScale(0.35)
    this.add.text(70, 260, "Tony le forgeron", setFontStyles("26px"));

    // equipe    
    var boutiqueCard = this.add.container(0, 350)
    for (let i = 0; i < userHeroList.length; i++) {
      var eqpCard = this.add.container(0, 0)
      eqpCard.add(createEquipmentCard(this, 0, "weapon_" + userHeroList[i].heroName, userHeroList[i].equipment[0].attack, userHeroList[i].equipment[0].level,barreInfo))
      eqpCard.add(createEquipmentCard(this, 210, "armour_" + userHeroList[i].heroName, userHeroList[i].equipment[1].defense, userHeroList[i].equipment[1].level))
      eqpCard.visible = false
      boutiqueCard.add(eqpCard)
    }

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

    var herosListCard = this.add.container(1020, 210)
    for (let i = 0; i < userHeroList.length; i++) {
      if (i == 0) {
        herosListCard.add(createInteractiveImageContainer(this, 0, 10 + i * intervalleY, userHeroList[i].heroName, true))
        boutiqueCard.list[0].visible = true
      }
      else
        herosListCard.add(createInteractiveImageContainer(this, 0, 10 + i * intervalleY, userHeroList[i].heroName, false))
    }

    for (let i = 0; i < herosListCard.length; i++) {
      const cardImage = herosListCard.list[i].list[0];

      cardImage.setInteractive();

      cardImage.on("pointerdown", function () {
        for (let j = 0; j < herosListCard.length; j++) {
          herosListCard.list[j].list[0].setTexture("card");
          boutiqueCard.list[j].visible = false
        }
        cardImage.setTexture("cardFocus");
        boutiqueCard.list[i].visible = true
        document.body.style.cursor = "default";
      });
    }

    // Créez une fonction pour les objets image, les paramètres de description
    function createInteractiveImageContainer(scene, x, y, key, init) {
      const container = scene.add.container(x, y);

      const image = scene.add.image(0, 0, init ? "cardFocus" : "card");
      image.displayHeight = 65;
      image.displayWidth = 230;

      const portrait = scene.add.image(-85, 0, "portrait_" + key);
      portrait.setScale(0.75);

      const name = scene.add.text(-47, -30, key, setFontStyles("22px"));

      container.add([image, portrait, name]);

      image.setInteractive();

      image.on("pointerover", function () {
        document.body.style.cursor = "pointer";
      });

      image.on("pointerout", function () {
        document.body.style.cursor = "default";
      });

      return container;
    }

    function createEquipmentCard(scene, y, key, eqpValue, level,barreInfo) { // eqpValue : puissance d'attaque ou puissance de défense
      var card = scene.add.container(430, y);
      var eqp = scene.add.image(0, 0, key);

      let eqpType = key.split('_')[0];
      let heroName = key.split('_')[1];
      var description = scene.add.container(80, -50);

      var typeIcon = scene.add.image(0, 0, "attack");

      if (eqpType == "armour")
        typeIcon.setTexture("defense");

      typeIcon.setScale(0.12);
      var valueCard = scene.add.text(25, -12, eqpValue + (level - 1) * UPGRADE_VALUE, setFontStyles("20px"));
      var addValue = scene.add.text(50, -13, "+" + UPGRADE_VALUE, setFontStyles("22px", "#D2BA70"));
      addValue.visible = false;

      description.add([typeIcon, valueCard, addValue]);

      var intervalleX = 78;
      var leveCard = scene.add.container(70, 20);
      let padlockList = scene.add.container(0, 0);

      for (let j = 0; j < MAX_EQUIPEMENT_LEVEL - 1; j++) {
        let padlock;

        if (j < level - 1)
          padlock = scene.add.image(20 + j * (intervalleX + 4), 0, "check");
        else if (j === level - 1)
          padlock = scene.add.image(20 + j * (intervalleX + 4), 0, "padlockOpen");
        else
          padlock = scene.add.image(20 + j * (intervalleX + 4), 0, "padlock");

        padlock.setScale(0.15);

        padlockList.add(padlock);

        var piecesIcon = scene.add.image(0 + j * intervalleX, 42, "pieces");
        piecesIcon.setScale(0.10);
        var prix = scene.add.text(10 + j * intervalleX, 32, UPGRADE_PRICE_LIST[j], setFontStyles("18px"));

        leveCard.add([piecesIcon, prix]);
      }

      if (level != MAX_EQUIPEMENT_LEVEL) { 
        setPadlockEvents(scene, heroName, eqpType == "weapon" ? 0 : 1, padlockList, level, addValue, valueCard, eqpValue, barreInfo) // eqpValue : puissance d'attaque ou puissance de défense
        padlockList.list[level - 1].setInteractive()
      }

      leveCard.add(padlockList);

      card.add([description, leveCard, eqp, leveCard]);

      return card;
    }

    function setPadlockEvents(scene, heroName, eqpType, padlockList, level, addValue, valueCard, value, barreInfo) {

      for (let i = 0; i < padlockList.length; i++) {
        padlockList.list[i].on("pointerover", function () {
          addValue.visible = true;
          document.body.style.cursor = "pointer";
        });

        padlockList.list[i].on("pointerout", function () {
          addValue.visible = false;
          document.body.style.cursor = "default";
        });

        padlockList.list[i].on("pointerdown", function () {
          let prix = UPGRADE_PRICE_LIST[i]

          if (user.coins - prix >= 0) {
            padlockList.list[i].setTexture("check");

            // mise à jour level
            level++;
            user.updateEqpLevel(heroName, eqpType, level)
            // console.log(user)

            // mise à jour le value
            valueCard.setText((value + (level - 1) * UPGRADE_VALUE).toString());
            valueCard.setText((value + (level - 1) * UPGRADE_VALUE).toString());

            // Désactive l'interactivité de l'icône actuelle après l'avoir déverrouillée
            padlockList.list[i].disableInteractive();

            // Ajouter l'interactivité de l'icône suivante
            if (i != MAX_EQUIPEMENT_LEVEL - 2) {
              padlockList.list[i + 1].setTexture("padlockOpen");
              padlockList.list[i + 1].setInteractive()
            }
            addValue.visible = false;
            document.body.style.cursor = "default";

            // Perdre les événements de la souris après le déverrouillage
            padlockList.list[i].removeInteractive();
            user.updateCoins(-prix)

            barreInfo.updateCoins(user.coins)
          }

        });
      }

    }

  }
  update() { }
}

