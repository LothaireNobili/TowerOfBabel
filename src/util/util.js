
function setFontStyles(
    fontSize = "24px",
    color = "#fff",
    fontFamily = "Pixel",
) {
    var fontStyles = {
        fontFamily: fontFamily,
        fontSize: fontSize,
        fill: color,
    };

    return fontStyles;
}

function createEnseigneReturnBtn(scene,enseigne) {
    enseigne.setScale(0.55)
    var retourText = scene.add.text(150, 115, "RETOUR", setFontStyles());
    enseigne.setInteractive();

    enseigne.on("pointerover", function () {
        enseigne.setTexture("enseigneFocus");
        retourText.setTint("0xD2BA70")
        document.body.style.cursor = "pointer";
    });

    enseigne.on("pointerout", function () {
        document.body.style.cursor = "default";
        enseigne.setTexture("enseigne");
        retourText.setTint("0xffffff")
        document.body.style.cursor = "default";
    });

    enseigne.on('pointerdown', function () {
        scene.scene.start('Hameau');
        document.body.style.cursor = "default";
        setTimeout(() => {
            scene.scene.setVisible(false, 'PassDataScene')
            setTimeout(() => {
                scene.scene.setVisible(true, 'PassDataScene')
            }, 5000)
        }, 5000)
    }, scene);
}

function addSellQuantityToPotions(potionsList) {
    for (let i = 0; i < potionsList.length; i++) {
        const sellQuantity = Math.floor(Math.random() * 5) + 1;
        potionsList[i].sellQuantity = sellQuantity;
    }
}

// function InitialisationCompte(user) {
//     user.
// }