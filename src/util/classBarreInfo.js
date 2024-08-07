// Barre d'information
class BarreInfo {

    constructor(scene) {
        //if(user.connected){
            this.userID = user.username; // Obtenez ID depuis le class User
            this.nbPieces = user.coins; // Obtenez nombre de pièces depuis depuis le class User
        //}
        /*else{
            this.userID = "Guest"
            this.nbPieces = 10000
        }//<- good idea but won't work as intended. If no other solution find a way to work around with a savefile*/
        
        this.scene = scene;

        // Créer des éléments dans la scène
        this.hudBackground = this.scene.add.graphics();
        this.userIDText = this.scene.add.text(30, 10, '', setFontStyles());
        this.nbPiecesText = this.scene.add.text(970, 9, '', setFontStyles());
        this.pieceIcon = this.scene.add.image(940, 25, "pieces");
        this.scene.add.text(448, 10, "Tower of Babel", setFontStyles("26px"));
        this.pieceIcon.setScale(0.28);

        // Initialiser les informations utilisateur
        this.userIDText.setText(this.userID);
        this.nbPiecesText.setText(this.nbPieces);
    }

    creerBarreInfo() {
        this.hudBackground.fillStyle(0x181818, 1);
        this.hudBackground.fillRect(0, 0, 1080, 50);
        return this.hudBackground;
    }

    // Mettre à jour les informations utilisateur
    updateCoins(nbPieces) {
        this.nbPiecesText.setText(nbPieces);
        return this.nbPiecesText;
    }

    message(text) {
        let message = this.scene.add.text(540, 70, text, setFontStyles("Arial", "red"))
        message.setOrigin(0.5, 0);
        message.setFontSize(50);
        message.setStroke('#000000', 6);
        setTimeout(() => {
            message.destroy();
        }, 2500);

    }
}
