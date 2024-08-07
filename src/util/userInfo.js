class User {
    constructor(id, username, coins, heroes, potions, connected) {
        this.userId = id || null;
        this.username = username || null;
        this.coins = coins || null;
        this.heroes = heroes || []; // heroes:[{heroName, equipment:[{equipmentName, level, attack},{equipmentName, level, defense}]}]
        this.potions = potions || []; // potions:[{potionName, qte}]
        if (connected) {
            this.connected = 1
        }
    }

    saveToLocalStorage() {
        // Enregistrer les données utilisateur sur localStorage
        localStorage.setItem("userData", JSON.stringify(this));

        // Recharger les données utilisateur
        this.upDateUserClass()
    }

    // Charger des données utilisateur à partir de localStorage
    loadUserFromLocalStorage() {
        const storedUserData = localStorage.getItem("userData"); //.loadUserFromLocalStorage()
        // L'ajout d'un horodatage, obliger le navigateur à recharger les dernières données à chaque appel.
        return storedUserData ? JSON.parse(storedUserData) : null;
    }

    saveToBDD() {
        fetch("./API/UpdateSaveFile.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: this.userId, saveFileData: this.getSaveFile() })
        })
            .then((response) => response.json())
            .then((data) => { })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
 

    upDateUserClass() {
        const reloadedUser = this.loadUserFromLocalStorage();
        if (reloadedUser) {
            this.userId = reloadedUser.userId
            this.username = reloadedUser.username
            this.coins = reloadedUser.coins;
            this.heroes = reloadedUser.heroes;
            this.potions = reloadedUser.potions;
            this.connected = 1
        }
    }

    upDateUnconnectedUserClass() {
        this.userId = -1
        this.username = "Guest"
        this.coins = 10000
        this.heroes = []
        this.potions = []
        this.connected = 0

    }

    // Ajouter des informations sur le héros et l'équipement
    addHero(heroName, attackEquipment, defenseEquipment) {
        const heroIndex = this.heroes.findIndex(hero => hero.heroName === heroName);

        if (heroIndex === -1) {
            this.heroes.push({
                heroName,
                equipment: [
                    {
                        equipmentName: attackEquipment.equipmentName,
                        level: attackEquipment.level,
                        attack: attackEquipment.attack
                    },
                    {
                        equipmentName: defenseEquipment.equipmentName,
                        level: defenseEquipment.level,
                        defense: defenseEquipment.defense
                    }
                ]
            });

            this.saveToLocalStorage()
        }
    }

    // Ajouter la potion et sa quantité
    addPotion(potionName, quantity) {
        const targetPotion = this.potions.find(potion => potion.potionName === potionName);
        if (targetPotion) {
            targetPotion.qte += quantity
        } else {
            this.potions.push({
                potionName: potionName,
                qte: quantity
            });
        }
        // this.saveToLocalStorage()
    }

    usePotion(potionName, qte) {
        const targetPotion = this.potions.find(potion => potion.potionName === potionName);

        if (targetPotion && targetPotion.qte - qte >= 0) {
            targetPotion.qte = targetPotion.qte - qte
            // ...
        } else {
            // ...
        }
        // this.saveToLocalStorage()
    }

    getPotionQte(potionName) {
        const targetPotion = this.potions.find(potion => potion.potionName === potionName);
        if (targetPotion) {
            return targetPotion.qte
        }
        return 0
    }

    updateEqpLevel(heroName, eqpType, newLevel) {
        const heroIndex = this.heroes.findIndex(hero => hero.heroName === heroName);
        if (heroIndex !== -1) {
            this.heroes[heroIndex].equipment[eqpType].level = newLevel;
        } else {
            console.error(`Hero ${heroName} not found.`);
        }
        this.saveToLocalStorage()
    }

    updateCoins(value) { //Augmentation ou diminution de valeur
        if (this.coins + value >= 0) {
            this.coins = this.coins + value
            this.saveToLocalStorage()
        } else {
            console.error("Gold coins cannot be less than 0");
        }
    }

    getSaveFile(){
        const saveFileData = {
            coins: this.coins,
            heroes: this.heroes,
            potions: this.potions,
        };

        const saveFileJson = JSON.stringify(saveFileData);

        return saveFileJson;
    }

    loadFromSaveFile(saveFileData) {
        try {
            // Mettre à jour les propriétés de l'instance de la classe User
            this.coins = saveFileData.coins;
            this.heroes = saveFileData.heroes;
            this.potions = saveFileData.potions;

            // Enregistrer les données mises à jour sur localStorage
            this.saveToLocalStorage();
        } catch (error) {
            console.error("Error loading data from save file:", error);
        }
    }

}


