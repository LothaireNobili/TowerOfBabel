

class Accueil extends Phaser.Scene {
    constructor() {
        super({ key: 'Accueil' });
    }

    preload() {
        this.load.setBaseURL('assets/')
        this.load.image("accueilBg", "images/babel.jpg");
        this.load.image("title", "images/accueil/title.png");
        this.load.image("startBtn", "images/accueil/startBtn.png");
        this.load.image("startBtnFocus", "images/accueil/startBtn_focus.png");
    }

    create() {
        var background = this.add.image(540, 360, "accueilBg");
        background.displayWidth = 1080
        background.displayHeight = 720

        var title = this.add.image(540, 150, "title")
        title.setScale(0.7)

        var message = this.add.text(350, 460, "Veuillez vous connecter pour jouer.", setFontStyles(undefined, "#ff6666"))
        message.setVisible(false);

        var startBtn = this.add.image(540, 550, "startBtn")
        startBtn.setScale(0.22)

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
            isLogged(message);
        });

        function isLogged(message) {
            
            if (storedUserData) {
                game.scene.start('Hameau');
                game.scene.stop('Accueil');
                document.body.style.cursor = "default";
            } else {
                message.setVisible(true);
            }
        }
    }

    update() { }
}