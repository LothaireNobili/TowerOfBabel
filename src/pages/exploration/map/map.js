class Map extends Phaser.Scene {
    constructor() {
        super({ key: 'Map' });
    }

    preload() {
        this.load.setBaseURL('./assets/')
        this.load.image("background", "images/mapBackground.jpg");
        this.load.image("chest", "images/exploration/chest.jpg");
        this.load.image("crusader","images/heroes/crusader/idle.png")
        this.load.image("bandit","images/heroes/bandit/skill1.png")
    }

    create() {
        
        this.add.image(540, 360, "background");
        var crusader=this.add.image(400,450,'crusader');
        var bandit=this.add.image(300,450,'bandit');
        var curio = this.add.image(540,450,"chest")
        curio.setScale(0.15)
        crusader.setScale(0.3)
        bandit.setScale(0.3)

        curio.setInteractive();
        curio.on('pointerdown', ()=>
        {
            console.log("curious clicked")
        })

    }
    
    update() {
        
     }
}

