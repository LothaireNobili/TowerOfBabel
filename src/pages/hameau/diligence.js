class Diligence extends Phaser.Scene {
  constructor() {
    super({ key: 'Diligence' });
  }
  preload() {
  }
  create() {
    const heroListClass = new FighterBluePrint()
    var heroList = heroListClass.classBlueprints

    document.body.style.cursor = "default";

    this.add.image(540, 360, "hameauBg");

    // Barre d'information
    var enseigne = this.add.image(200, 85, "enseigne");
    createEnseigneReturnBtn(this, enseigne)
    const barreInfo = new BarreInfo(this);
    barreInfo.creerBarreInfo();  // Crée la barre d'information



    // La boutique
    var boutiqueBackground = this.add.image(400, 440, "boutiqueBg")
    boutiqueBackground.displayWidth = 700;
    boutiqueBackground.displayHeight = 580;
    var diligence = this.add.image(300, 450, "Diligence")
    diligence.setScale(0.6)

    // Ajouter des heros
    var intervalleY = 65
    let count = 0;
    for (let heroOfList of game.config.allHeroList) {
      const heroIndex = user.heroes.findIndex(hero => hero.heroName === heroOfList);
      if (heroIndex == -1) {
        createInteractiveImage(this, 680, 230 + count * intervalleY, heroOfList, 1000, true)
        count++;
      }
    }


    // equipe
    var equipeBackground = this.add.image(1020, 440, "boutiqueBg")
    equipeBackground.displayWidth = 400;
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
    for (let i = 0; i < user.heroes.length; i++) {
      createInteractiveImage(this, 965, 230 + i * intervalleY, user.heroes[i].heroName)
    }


    // Créez une fonction pour les objets image, les paramètres de description
    function createInteractiveImage(scene, x, y, key, prix, onSale) {
      var card = scene.add.container(x, y);
      var image = scene.add.image(0, 0, "card");
      let heroSkills = heroList[key].skills
      
      var portrait = scene.add.image(-85, 0, "portrait_" + key);
      portrait.setScale(0.75);
      image.displayHeight = 65;
      image.displayWidth = 230;

      if(key == "plaguedoctor"){
        var name = scene.add.text(-47, -30, "Plague Doctor", setFontStyles("20px"));
      }
      else if(key == "graverobber"){
        var name = scene.add.text(-47, -30, "Grave Robber", setFontStyles("20px"));
      }
      else{
        var name = scene.add.text(-47, -30, key.slice(0,1).toUpperCase()+key.slice(1), setFontStyles("20px"));
      }
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

      if(key == "plaguedoctor"){
        var heroName = scene.add.text(-200, -200, "PLAGUE DOCTOR", setFontStyles());
      }
      else if(key == "graverobber"){
        var heroName = scene.add.text(-200, -200, "GRAVE ROBBER", setFontStyles());
      }
      else{
        var heroName = scene.add.text(-200, -200, key.toUpperCase(), setFontStyles());
      }
      
      var heroImage = scene.add.sprite(-130, 20, "idle_" + key).play(key+"_idle").setOrigin(0.5, 0.5).setScale(0.95);

      descriptionContainer.add([descriptionBg, heroName, heroImage]);

      for (var i = 0; i < 4; i++) {
        var skillCard = scene.add.image(0, -50 + i * 80, key + "Skill" + (i + 1) + "Icon");
        skillCard.setScale(0.6);
        var skillName = scene.add.text(30, -72 + i * 80, heroSkills[i].name, setFontStyles("18px"));
        descriptionContainer.add([skillCard, skillName]);
        
        var positionCard = createPositionCard(scene, -40 + i * 80, heroSkills[i].requiered_pos, heroSkills[i].reach, heroSkills[i].target);
        // var damage = scene.add.text(100, -72 + i * 80, heroSkills[i].damage_low + '-' + heroSkills[i].damage_high, setFontStyles("18px")) 
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
              attack: 5
            }
            let eqpArmour = {
              equipmentName: "eqpArmour",
              level: 1,
              defense: 3
            }

            // Retirer le héros de la boutique
            image.destroy();
            card.destroy();

            user.addHero(key, eqpWeapon, eqpArmour)
            user.updateCoins(-prix)

            scene.scene.restart();
          }
          else{
            barreInfo.message("Pas assez de pièces")
          }

        });

      }

      return image;
    }

  }
  update() { }
}