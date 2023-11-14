// Barre d'information
class BarreInfo {

    constructor(hudBackground,userIDText,nbPiecesText) {
        this.userID = localStorage.getItem('userID') || "USER_ID"; // Obtenir ID de l'utilisateur à partir du  localstorage. S'il n'existe pas, utiliser la valeur par défaut.
        this.nbPieces = localStorage.getItem('nbPiece') || 0; // Obtenir la quantité de pièces depuis le localstorage.
        this.hudBackground = hudBackground
        this.userIDText = userIDText
        this.nbPiecesText = nbPiecesText
    }

    creerBarreInfo() {
        this.hudBackground.fillStyle(0x181818, 1);
        this.hudBackground.fillRect(0, 0, 1080, 50);
        return this.hudBackground
    }

    // Enregistrer ID et la quantité de pièces dans Localstorage
    saveUserInfoToLocalStorage() {
        localStorage.setItem('userID', userID);
        localStorage.setItem('nbPiece', nbPiece);
    }

    // La fonction de mise à jour du nom et du nombre de pièces
    setUserInfo() {
        this.userIDText.setText(this.userID);
        this.nbPiecesText.setText(this.nbPieces);

        return [this.userIDText, this.nbPiecesText]
    }
}