
/**
 * Enregistrer les liste des héros choisis sur localStorage
 * Item: listSelectedHeroes
 * Le format de chaque élément :
 { heroName, potionName, potionQte }
 */
var listSelectedHeroes;
var GOLDEARNT;

//
var listSelectedPotionContainer;
var listStockPotionContainer;
var tmpUser = new User();


class ComposerEquipe extends Phaser.Scene {
  constructor() {
    super({ key: 'ComposerEquipe' });
  }
  preload() {
    this.load.setBaseURL('./assets/')
    this.load.image("frame", "icons/frame.png")
    this.load.image("goBtn", "icons/go.png")
    this.load.image("goBtnFocus", "icons/go_focus.png")
    this.load.image("potionIcon", "icons/potion.png")
    this.load.image("potionIconFocus", "icons/potion-focus.png")
    this.load.image("closeIcon", "icons/red_cross.png")
  }
  create() {
    tmpUser.upDateUserClass()
    listSelectedPotionContainer = []
    listStockPotionContainer = []
    listSelectedPotionContainer = [null, null, null, null]
    document.body.style.cursor = "default";

    const heroListClass = new FighterBluePrint()
    var heroList = heroListClass.classBlueprints
    listSelectedHeroes = Array.from({ length: 4 }, () => (createSelectedHeroObject(null, null, 0)));
    saveListSelectedHeroes()

    let positionSelectedFocus = null; // Pour ajouter une potion à un héros désigné

    this.add.image(540, 360, "hameauBg");

    // Barre d'information
    var enseigne = this.add.image(200, 85, "enseigne");
    createEnseigneReturnBtn(this, enseigne)
    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();  // Crée la barre d'information

    var message = this.add.text(320, 75, "Formez un groupe à partir de la liste de recrues", setFontStyles("24px", "#ff6666"));
    message.setDepth(99);
    message.setVisible(false);

    // button start
    var startBtn = this.add.image(700, 655, "goBtn")
    startBtn.setScale(0.20)

    startBtn.setInteractive();

    startBtn.on("pointerover", function () {
      startBtn.setTexture("goBtnFocus");
      document.body.style.cursor = "pointer";
    });

    startBtn.on("pointerout", function () {
      startBtn.setTexture("goBtn");
      document.body.style.cursor = "default";
    });

    startBtn.on('pointerdown', function () {
      // Vérifier le nombre de heros
      var go = true;
      for (let i = 0; i < 4; i++) {
        if (!listSelectedHeroes[i].heroName) {
          go = false;
          message.setVisible(true);
          break;
        }
      }
      if (go) {
        GOLDEARNT = user.coins
        message.setVisible(false);

        saveListSelectedHeroes()
        deletePotionSelectedToUserClass()

        user.saveToLocalStorage()
        user.saveToBDD()

        game.scene.stop("ComposerEquipe")
        game.scene.start('Salle');
        document.body.style.cursor = "default";
      }
    });

    // inventaire de potions
    let inventaireContainer = this.add.container(200, 400)
    let inventaireBg = this.add.image(245, 20, "boutiqueBg")
    inventaireBg.displayWidth = 600
    inventaireBg.displayHeight = 220
    let closeIcon = this.add.image(525, -80, "closeIcon");
    closeIcon.setScale(0.03);
    closeIcon.setInteractive();
    closeIcon.on("pointerover", function () { document.body.style.cursor = "pointer"; });
    closeIcon.on("pointerout", function () { document.body.style.cursor = "default"; });
    closeIcon.on('pointerdown', function () { inventaireContainer.setVisible(false) });

    inventaireContainer.add([inventaireBg, closeIcon])

    let intervalleX = 110
    for (let i = 0; i < user.potions.length; i++) {
      let image = createPotionCard(this, 20 + i * intervalleX, 0, user.potions[i].potionName, user.potions[i].qte)
      inventaireContainer.add(image)
    }

    inventaireContainer.setVisible(false);

    // equipe
    var cadreSelected = this.add.container(400, 650);

    var text = this.add.text(897, 100, "Votre équipe", {
      fontFamily: "Pixel",
      fontSize: "24px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: { x: 25, y: 10 },
      color: "#ffffff",
    });
    text.setFixedSize(200, 50);

    var intervalleY = 65
    for (let i = 0; i < user.heroes.length; i++) {
      createHeroCard(this, 1012, 185 + i * intervalleY, user.heroes[i].heroName, cadreSelected)
    }

    // Cadre de sélection des équipes
    var cadreBG = this.add.image(0, 0, "boutiqueBg");
    cadreBG.displayWidth = 440
    cadreBG.displayHeight = 110
    cadreSelected.add([cadreBG])

    let list = []; //liste de framePotion
    listSelectedPotionContainer = [null, null, null, null]
    for (let i = 0; i < 4; i++) {
      // heros
      let frameHero = this.add.image(-140 + i * 95, 0, "frame")
      frameHero.displayWidth = 80
      frameHero.displayHeight = 80
      // potions
      let framePotion = this.add.image(-140 + i * 95, -80, "potionIcon")
      framePotion.setScale(0.125)
      // événement
      framePotion.setInteractive()
      framePotion.on("pointerover", function () { document.body.style.cursor = "pointer"; });
      framePotion.on("pointerout", function () { document.body.style.cursor = "default"; });
      framePotion.on('pointerdown', function () {
        list.forEach(e => { e[0].setTexture("potionIcon"); });
        framePotion.setTexture("potionIconFocus");
        positionSelectedFocus = 3 - i
        inventaireContainer.setVisible(true)
      });

      cadreSelected.add([frameHero, framePotion])
      list.push([framePotion]) //liste de framePotion
    }

    // Créez une fonction pour les objets image, les paramètres de description
    function createHeroCard(scene, x, y, key, selectedContainer) {
      var card = scene.add.container(x, y);
      var image = scene.add.image(0, 0, "card");
      image.displayHeight = 65;
      image.displayWidth = 230;

      var portrait = scene.add.image(-85, 0, "portrait_" + key);
      portrait.setScale(0.75);

      let theName = heroList[key].display_name.replace(" ", " \n")
      var name = scene.add.text(-47, -30, theName, setFontStyles("20px"));
      card.add([image, portrait, name]);

      image.setInteractive();

      var descriptionContainer = scene.add.container(450, 380);
      descriptionContainer.setDepth(90);
      var descriptionBg = scene.add.image(0, 0, "boutiqueBg");
      descriptionBg.displayWidth = 700;
      descriptionBg.displayHeight = 400;

      let theHeroName = heroList[key].display_name
      var heroName = scene.add.text(-60, -155, theHeroName.toUpperCase(), setFontStyles("24px", "#D2BA70"));

      var heroImage = scene.add.sprite(-210, 160, "idle_" + key).play(key + "_idle").setOrigin(0.5, 1).setScale(0.9);

      descriptionContainer.add([descriptionBg, heroName, heroImage]);

      var qualityContainer = scene.add.container(-50, -50);
      var hp = scene.add.text(0, -50, "HP : " + heroList[key].max_hp, setFontStyles("20px"))
      var dodge = scene.add.text(0, -10, "Dodge : " + heroList[key].dodge, setFontStyles("20px"))
      var prot = scene.add.text(0, 30, "Armor : " + heroList[key].prot, setFontStyles("20px"))
      var speed = scene.add.text(0, 70, "Speed : " + heroList[key].speed, setFontStyles("20px"))
      var crit = scene.add.text(0, 110, "Crit : " + heroList[key].crit + "%", setFontStyles("20px"))
      qualityContainer.add([hp, dodge, prot, speed, crit])

      var skillContainer = scene.add.container(140, -30);
      for (var i = 0; i < 4; i++) {
        var skillCard = scene.add.image(-10, -50 + i * 65, key + "Skill" + (i + 1) + "Icon");
        skillCard.setScale(0.6);
        var skillName = scene.add.text(15, -70 + i * 65, heroList[key].skills[i].name, setFontStyles("18px"));
        skillContainer.add([skillCard, skillName]);

        var positionCard = createPositionCard(scene, -36 + i * 65, heroList[key].skills[i].requiered_pos, heroList[key].skills[i].reach, heroList[key].skills[i].target);

        skillContainer.add(positionCard);
      }

      descriptionContainer.add([qualityContainer, skillContainer])
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

      image.on("pointerdown", function () {
        for (let i = 0; i < 4; i++) {
          if (!listSelectedHeroes[i].heroName && !listSelectedHeroes.some(obj => obj.heroName === key)) { //  && !listSelectedHeroes.includes(key)
            listSelectedHeroes[i].heroName = key;
            createSelectedPortrait(scene, 145 - i * 95, 0, key, selectedContainer, i)
            break;
          }
        }
      });

      return image;
    }

    function createSelectedPortrait(scene, x, y, key, container, index) {
      var portrait = scene.add.image(x, y, "portrait_" + key);
      portrait.setScale(0.75);

      portrait.setInteractive()

      portrait.on("pointerover", function () {
        portrait.setScale(0.85);
        document.body.style.cursor = "pointer";
      });

      portrait.on("pointerout", function () {
        portrait.setScale(0.75);
        document.body.style.cursor = "default";
      });

      portrait.on("pointerdown", function () {
        // supprimer les potions
        if (listSelectedPotionContainer[index] != null || listSelectedPotionContainer[index] != undefined) {
          let key = listSelectedHeroes[index]
          listStockPotionContainer.forEach(e => {
            if (e.name.text === key.potionName) {
              e.qte.setText((key.potionQte + tmpUser.getPotionQte(key.potionName)).toString())
              tmpUser.addPotion(key.potionName, key.potionQte)
              key.potionName = undefined
              key.potionQte = 0

              listSelectedPotionContainer[index].destroy()
              listSelectedPotionContainer[index] = null
              return;
            }
          });
        }

        listSelectedHeroes[index].heroName = null
        portrait.destroy();
        document.body.style.cursor = "default";
      });

      container.add(portrait)
    }

    function createPotionCard(scene, x, y, key) {
      let card = scene.add.container(x, y);
      let bg = scene.add.image(0, 0, "card");
      bg.setScale(0.18);

      let image = scene.add.image(0, -20, "potionIcon");
      image.displayHeight = 80;
      image.displayWidth = 80;

      let name = scene.add.text(-40, 70, key, setFontStyles("18px"))
      let qteIcon = scene.add.image(13, 53, "inventaire")
      qteIcon.setScale(0.08)
      // let qte = tmpUser.getPotionQte(key) // inventaire de potions
      let qteTxt = scene.add.text(25, 45, tmpUser.getPotionQte(key), setFontStyles("18px"))

      let stockPotionObjet = {
        name: name,
        qte: qteTxt
      }
      listStockPotionContainer.push(stockPotionObjet);

      bg.setInteractive()

      bg.on("pointerover", function () {
        bg.setTexture("cardFocus");
        document.body.style.cursor = "pointer";
      });

      bg.on("pointerout", function () {
        bg.setTexture("card");
        document.body.style.cursor = "default";
      });

      let listSelectedPotionQte = [null, null, null, null];
      bg.on("pointerdown", function () {
        let hero = listSelectedHeroes[positionSelectedFocus]
        if (tmpUser.getPotionQte(key) > 0) {
          if (!hero.potionName) {
            // ajouter la potion
            hero.potionName = key
            hero.potionQte = 1
            let potionSelectedContainer = scene.add.container(543 - positionSelectedFocus * 95, 570)
            let image = scene.add.image(0, 0, "potionIcon") //CHANGE
            image.setScale(0.13) //CHANGE
            let qteTextSelected = scene.add.text(15, 5, hero.potionQte, setFontStyles("20px"))
            potionSelectedContainer.add([image, qteTextSelected])
            listSelectedPotionQte[positionSelectedFocus] = qteTextSelected
            listSelectedPotionContainer[positionSelectedFocus] = potionSelectedContainer

            tmpUser.usePotion(key, 1) // inventaire de potions
            qteTxt.setText(tmpUser.getPotionQte(key))

            // Supprimer la potion
            image.setInteractive()
            image.on("pointerover", function () {
              image.setScale(0.15)
              document.body.style.cursor = "pointer";
            });

            image.on("pointerout", function () {
              image.setScale(0.13)
              document.body.style.cursor = "default";
            });

            image.on("pointerdown", function () {
              hero.potionQte--
              qteTextSelected.setText(hero.potionQte)
              tmpUser.addPotion(key, 1)  // inventaire de potions
              qteTxt.setText(tmpUser.getPotionQte(key))

              if (hero.potionQte === 0) {
                hero.potionName = null
                potionSelectedContainer.destroy();
              }

              document.body.style.cursor = "default";
            });

          }
          else if (hero.potionName === key && hero.potionQte + 1 <= 5) {
            tmpUser.usePotion(key, 1) // inventaire de potions
            qteTxt.setText(tmpUser.getPotionQte(key))
            hero.potionQte++
            listSelectedPotionQte[positionSelectedFocus].setText(hero.potionQte)
          }
          else if (hero.potionName === key && hero.potionQte + 1 > 5) {
            listSelectedPotionQte[positionSelectedFocus].setText('MAX').setStyle({ fontSize: '20px', color: '#ff0000' });
            setTimeout(() => {
              listSelectedPotionQte[positionSelectedFocus].setText(hero.potionQte).setStyle(setFontStyles("20px"))
            }, 2500);
          }
        }
      });

      card.add([bg, image, name, qteIcon, qteTxt])
      return card
    }

    function createSelectedHeroObject(heroName, potionName, potionQte) {
      var heroInfo = {
        heroName: heroName,
        potionName: potionName,
        potionQte: potionQte
      };

      return heroInfo;
    }

    // Enregistrer les liste des héros choisis sur localStorage
    function saveListSelectedHeroes() {
      localStorage.setItem("listSelectedHeroes", JSON.stringify(listSelectedHeroes));
    }

    // Enregistrer les liste des héros choisis sur localStorage
    function deletePotionSelectedToUserClass() {
      listSelectedHeroes.forEach(e => {
        user.usePotion(e.potionName, e.potionQte)
      });
    }

  }
  update() { }
}
