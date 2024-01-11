
function setFontStyles(
    fontSize = "24px",
    color = "#fff",
    fontFamily = "Comic Sans MS",
) {
    var fontStyles = {
        fontFamily: fontFamily,
        fontSize: fontSize,
        fill: color,
    };

    return fontStyles;
}

function createEnseigneReturnBtn(scene, enseigne) {
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

function createPositionCard(scene, y, teamPosition, attackRange, type) {
    var card = scene.add.container(0, 0);
    var positions = [];
    var ranges = [];

    // Initialiser l’icône de position de capacité
    for (var i = 0; i < 4; i++) {
        var position = scene.add.image(36 + i * 13, y, "cercleWhite");
        position.setScale(0.2);

        positions.push(position);
        card.add(position);
    }

    // Parcourez teamPosition, modifiez l’icône de la position
    teamPosition.forEach(e => {
        if (positions[e - 1]) {
            positions[e - 1].setTexture("cercleYellow");
        }
    });

    if (type != "team" && type != "hero") {
        for (let i = 0; i < 4; i++) {
            var range = scene.add.image(100 + i * 13, y, "cercleWhite");
            range.setScale(0.2);

            ranges.push(range);
            card.add(range);
        }
        // Parcourez attackRange, modifiez l’icône de la position
        attackRange.forEach(e => {
            if (ranges[e - 1]) {
                ranges[e - 1].setTexture("cercleRed");
            }
        });
    }
    return card;
}
