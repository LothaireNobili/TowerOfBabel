/**
 * Enregistrer les liste des héros choisis sur localStorage
 * Item: listSelectedHeroes
 */

var listSelectedHeroes = ['null', 'null', 'null', 'null'];

class Temporis extends Phaser.Scene {
  constructor() {
    super({ key: 'Temporis' });
  }
  preload() {
   
  }
  create() {
    this.floor = this.add.text(600, 20, "Temporis", {
        font: "40px Arial",
        fill: "white",
      }); //DEBUG ONLY

      game.scene.start('bootFight');

  }
  update() { }
}

