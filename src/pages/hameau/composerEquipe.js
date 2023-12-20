/**
 * Enregistrer les liste des héros choisis sur localStorage
 * Item: listSelectedHeroes
 */

var listSelectedHeroes = ['null', 'null', 'null', 'null'];

class ComposerEquipe extends Phaser.Scene {
  constructor() {
    super({ key: 'ComposerEquipe' });
  }
  preload() {
    this.load.setBaseURL('./assets/')
    this.load.image("frame", "icons/frame.png")
    this.load.image("king", "icons/king.png")
    this.load.image("cercleYellow", "icons/cercle_yellow.png")
    this.load.image("startBtn", "icons/go.png")
    this.load.image("startBtnFocus", "icons/go_focus.png")

    localStorage.setItem("listSelectedHeroes", ["null","null","null","null"]); //initalize the list of selected heroes
  }
  create() {
    document.body.style.cursor = "default";

    this.add.image(540, 360, "hameauBg");

    // Barre d'information
    var enseigne = this.add.image(200, 85, "enseigne");
    createEnseigneReturnBtn(this, enseigne)
    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();  // Crée la barre d'information

    var message = this.add.text(195, 576, "Formez un groupe à partir de la liste de recrues", setFontStyles("18px", "#ff6666"));
    message.setVisible(false);

    // button start
    var startBtn = this.add.image(700, 655, "startBtn")
    startBtn.setScale(0.20)

    startBtn.setInteractive();

    startBtn.on("pointerover", function () {
      startBtn.setTexture("startBtnFocus");
      document.body.style.cursor = "pointer";
    });

    startBtn.on("pointerout", function () {
      startBtn.setTexture("startBtn");
      document.body.style.cursor = "default";
    });

    startBtn.on('pointerdown', function () {
      // Vérifier le nombre de heros
      var go = true;
      for (let i = 0; i < 4; i++) {
        if (listSelectedHeroes[i] === "null") {
          go = false;
          message.setVisible(true);
          break;
        }
      }
      if(go){
        message.setVisible(false);
        game.scene.start('bootFight');
        document.body.style.cursor = "default";
      }
    });


    // equipe
    // var equipeBackground = this.add.image(1000, 350, "boutiqueBg")
    // equipeBackground.displayWidth = 220;
    // equipeBackground.displayHeight = 580;
    var cadreSelected = this.add.container(400, 650);

    var text = this.add.text(897, 100, "Votre équipe", {
      fontFamily: "Comic Sans MS",
      fontSize: "24px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: { x: 25, y: 10 },
      color: "#ffffff",
    });
    text.setFixedSize(200, 50);

    var intervalleY = 70
    for (let i = 0; i < user.heroes.length; i++) {
      createEquipeCard(this, 1012, 185 + i * intervalleY, user.heroes[i].heroName, cadreSelected)
    }

    //
    var cadreBG = this.add.image(0, 0, "boutiqueBg");
    cadreBG.displayWidth = 440
    cadreBG.displayHeight = 110
    cadreSelected.add([cadreBG])

    for (let i = 0; i < 4; i++) {
      let frame = this.add.image(-140 + i * 95, 0, "frame")
      frame.displayWidth = 80
      frame.displayHeight = 80
      cadreSelected.add(frame)
    }

    loadListSelectedHeroes()

    for (let i = 0; i < listSelectedHeroes.length; i++) {
      if (listSelectedHeroes[i] !== 'null') {
        createSelectedPortrait(this, 145 - i * 95, 0, listSelectedHeroes[i], cadreSelected, i)
      }
    }


    // Créez une fonction pour les objets image, les paramètres de description
    function createEquipeCard(scene, x, y, key, selectedContainer) {
      var card = scene.add.container(x, y);
      var image = scene.add.image(0, 0, "card");
      image.displayHeight = 65;
      image.displayWidth = 230;

      var portrait = scene.add.image(-85, 0, "portrait_" + key);
      portrait.setScale(0.75);

      var name = scene.add.text(-47, -30, key, setFontStyles("22px"));
      card.add([image, portrait, name]);

      image.setInteractive();

      var descriptionContainer = scene.add.container(450, 380);

      var descriptionBg = scene.add.image(0, 0, "boutiqueBg");
      descriptionBg.displayWidth = 700;
      descriptionBg.displayHeight = 400;
      var heroName = scene.add.text(-270, -150, key.toUpperCase(), setFontStyles());
      var heroImage = scene.add.image(-210, 40, "idle_" + key);
      heroImage.setScale(0.4);
      var description = scene.add.text(-70, -20, "Description", setFontStyles())
      var qualiteIcon = scene.add.image(-50, -100, "king");
      qualiteIcon.setScale(0.08)

      descriptionContainer.add([descriptionBg, heroName, heroImage, description, qualiteIcon]);

      for (let i = 0; i < 2; i++) {
        var icon = scene.add.image(i * 160, -100, "cercleYellow")
        icon.setScale(0.25)
        var qualite = scene.add.text(16 + i * 160, -118, "qualite " + (i + 1), setFontStyles())
        descriptionContainer.add([icon, qualite])
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

      image.on("pointerdown", function () {
        for (let i = 0; i < 4; i++) {
          if (listSelectedHeroes[i] === 'null' && -listSelectedHeroes.indexOf(key)) {
            listSelectedHeroes[i] = key;
            createSelectedPortrait(scene, 145 - i * 95, 0, key, selectedContainer, i)
            saveListSelectedHeroes()
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
        listSelectedHeroes[index] = 'null'
        portrait.destroy();
        document.body.style.cursor = "default";
        saveListSelectedHeroes()
      });

      container.add(portrait)
    }

    function loadListSelectedHeroes() {
      // L'ajout d'un horodatage, obliger le navigateur à recharger les dernières données à chaque appel.
      const storedListData = localStorage.getItem("listSelectedHeroes");

      if (storedListData === null) {
        // Sélectionnez d’abord les quatre premiers héros dans l’ordre de l’équipe
        for (let i = 0; i < 4; i++) {
          if (i < user.heroes.length) {
            listSelectedHeroes[i] = user.heroes[i].heroName;
          } else {
            break;
          }
        }
        saveListSelectedHeroes()
      }
      else {
        listSelectedHeroes = JSON.parse(storedListData)
      }
    }

    // Enregistrer les liste des héros choisis sur localStorage
    function saveListSelectedHeroes() {
      localStorage.setItem("listSelectedHeroes", JSON.stringify(listSelectedHeroes));
    }

    // supprimer les liste des héros choisis sur localStorage
    function delListSelectedHeroes() {
      localStorage.removeItem("listSelectedHeroes");
    }

  }
  update() { }
}

