const MAX_EQUIPEMENT_LEVEL = 4
const UPGRADE_PRICE_LIST = [500, 1500, 5000, 12000]
const UPGRADE_VALUE = 0.25

class Forge extends Phaser.Scene {
  constructor() {
    super({ key: 'Forge' });
  }
  preload() {
    this.load.setBaseURL('./assets/')
    this.load.image("tony", "images/hameau/tony.png")
    this.load.image("check", "icons/check_mark.png")
    this.load.image("padlock", "icons/padlock.png")
    this.load.image("padlockOpen", "icons/padlock_open.png")
    this.load.image("attack", "icons/pointy_sword.png")
    this.load.image("defense", "icons/shield_echoes.png")

    for (let i = 0; i < user.heroes.length; i++) {
      for (let j = 0; j <= 4; j++) {
        this.load.image("armour_" + user.heroes[i].heroName + "_" + j, "images/heroes/" + user.heroes[i].heroName + "/icons_equip/eqp_armour_"+j+".png")
        this.load.image("weapon_" + user.heroes[i].heroName + "_" + j, "images/heroes/" + user.heroes[i].heroName + "/icons_equip/eqp_weapon_"+j+".png")
      }
    }
  }
  create() {
    document.body.style.cursor = "default";
    
    const heroListClass = new FighterBluePrint()
    var heroList = heroListClass.classBlueprints

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
    for (let i = 0; i < user.heroes.length; i++) {
      var eqpCard = this.add.container(0, 0)

      eqpCard.add(createEquipmentCard(this, 0, "weapon_" + user.heroes[i].heroName + "_" + user.heroes[i].equipment[0].level,
                                      user.heroes[i].equipment[0].attack, user.heroes[i].equipment[0].level,barreInfo))
      eqpCard.add(createEquipmentCard(this, 210, "armour_" + user.heroes[i].heroName + "_" + user.heroes[i].equipment[1].level, 
                                      user.heroes[i].equipment[1].defense, user.heroes[i].equipment[1].level,barreInfo))
      eqpCard.visible = false
      boutiqueCard.add(eqpCard)
    }

    var equipeBackground = this.add.image(1000, 440, "boutiqueBg")
    equipeBackground.displayWidth = 220;
    equipeBackground.displayHeight = 580;

    var text = this.add.text(897, 135, "Votre équipe", {
      fontFamily: "Pixel",
      fontSize: "24px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: { x: 25, y: 10 },
      color: "#ffffff",
    });

    text.setFixedSize(200, 50);

    var intervalleY = 65

    var herosListCard = this.add.container(1020, 210)
    for (let i = 0; i < user.heroes.length; i++) {
      if (i == 0) {
        herosListCard.add(createInteractiveImageContainer(this, 0, 10 + i * intervalleY, user.heroes[i].heroName, true))
        boutiqueCard.list[0].visible = true
      }
      else
        herosListCard.add(createInteractiveImageContainer(this, 0, 10 + i * intervalleY, user.heroes[i].heroName, false))
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
    /*
    création des cartes des perso à droites
    */
    function createInteractiveImageContainer(scene, x, y, key, init) {
      const container = scene.add.container(x, y);

      const image = scene.add.image(0, 0, init ? "cardFocus" : "card");
      image.displayHeight = 65;
      image.displayWidth = 230;

      const portrait = scene.add.image(-85, 0, "portrait_" + key);
      portrait.setScale(0.75);
  
      let theName = heroList[key].display_name.replace(" ", " \n")
      var name = scene.add.text(-47, -30, theName, setFontStyles("20px"));

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


    /*
    créer la carte des armes et armures (image + icon atk/dfs + btn d'unlock)
    */
    function createEquipmentCard(scene, y, key, eqpValue, level, barreInfo) {
      var card = scene.add.container(430, y);
      var eqp = scene.add.image(0, 0, key);
    
      let eqpType = key.split('_')[0];
      let heroName = key.split('_')[1];
      var description = scene.add.container(80, -50);
    
      var typeIcon = scene.add.image(0, 0, "attack");
    
      if (eqpType == "armour")
        typeIcon.setTexture("defense");
    
      typeIcon.setScale(0.12);
      var valueCard = scene.add.text(25, -12, "x" + (eqpValue + (level) * UPGRADE_VALUE), setFontStyles("20px"));
      var addValue = scene.add.text(80, -12, "+ " + UPGRADE_VALUE, setFontStyles("22px", "#D2BA70"));
      addValue.visible = false;
    
      description.add([typeIcon, valueCard, addValue]);
    
      var intervalleX = 78;
      var leveCard = scene.add.container(70, 20);
      let padlockList = scene.add.container(0, 0);
    
      for (let j = 0; j < MAX_EQUIPEMENT_LEVEL; j++) {
        let padlock;
    
        if (j < level)
          padlock = scene.add.image(20 + j * (intervalleX + 4), 0, "check");
        else if (j === level)
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
    
      let newKey = key.split('_')[0]+"_"+key.split('_')[1]


      if (level != MAX_EQUIPEMENT_LEVEL) {
        setPadlockEvents(scene, heroName, eqpType == "weapon" ? 0 : 1, padlockList, level, addValue, valueCard, eqpValue, barreInfo, eqp, newKey); // eqpValue : puissance d'attaque ou puissance de défense
        padlockList.list[level].setInteractive();

      }
    
      leveCard.add(padlockList);
    
      card.add([description, leveCard, eqp, leveCard]);
    
      // Set the dynamic image source based on the level
      
      eqp.setTexture(newKey + "_" + level);
    
      return card;
    }
    

    /*
    création des padlocks
    */
    function setPadlockEvents(scene, heroName, eqpType, padlockList, level, addValue, valueCard, value, barreInfo, eqp, newKey) {

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
            user.saveToBDD()

            // mise à jour le value

            valueCard.setText(("x" + (value + (level) * UPGRADE_VALUE)));
            valueCard.setText(("x" + (value + (level) * UPGRADE_VALUE)));

            // Désactive l'interactivité de l'icône actuelle après l'avoir déverrouillée
            padlockList.list[i].disableInteractive();

            eqp.setTexture(newKey + "_" + level);

            // Ajouter l'interactivité de l'icône suivante
            if (i != MAX_EQUIPEMENT_LEVEL - 1) {
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
          else {
            barreInfo.message("Not enough coins.")
          }

        });
      }

    }

  }
  update() { }
}

