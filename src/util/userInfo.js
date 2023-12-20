class User {
    constructor(username, coins, heroes, potions) {
        this.username = username;
        this.coins = coins;
        this.heroes = heroes || []; // heroes:[{heroName, equipment:[{equipmentName, level, attack},{equipmentName, level, defense}]}]
        this.potions = potions || []; // potions:[{potionName, qte}]

        // Charger les informations utilisateur dans le constructeur
        const storedUser = User.loadUserFromLocalStorage();
        if (storedUser) {
            this.coins = storedUser.coins;
            this.heroes = storedUser.heroes;
            this.potions = storedUser.potions;
            console.log(storedUser)
        }
    }

    saveToLocalStorage() {
        // Enregistrer les données utilisateur sur localStorage
        localStorage.setItem("userData", JSON.stringify(this));

        // Recharger les données utilisateur
        const reloadedUser = User.loadUserFromLocalStorage();
        if (reloadedUser) {
            this.coins = reloadedUser.coins;
            this.heroes = reloadedUser.heroes;
            this.potions = reloadedUser.potions;
        }
    }

    // Charger des données utilisateur à partir de localStorage
    static loadUserFromLocalStorage() {
        const storedUserData = localStorage.getItem("userData?timestamp=" + new Date().getTime());
        // L'ajout d'un horodatage, obliger le navigateur à recharger les dernières données à chaque appel.
        return storedUserData ? JSON.parse(storedUserData) : null;
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
        this.saveToLocalStorage()
    }

    usePotion(potionName) {
        const targetPotion = this.potions.find(potion => potion.potionName === potionName);

        if (targetPotion && targetPotion.qte > 0) {
            targetPotion.qte--;
            // ...
        } else {
            // ...
        }
        this.saveToLocalStorage()

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
            console.log(`Hero ${heroName} not found.`);
        }
        this.saveToLocalStorage()
    }

    updateCoins(value) { //Augmentation ou diminution de valeur
        if (this.coins + value >= 0) {
            this.coins = this.coins + value
            this.saveToLocalStorage()
        } else {
            console.log("Gold coins cannot be less than 0");
        }
    }

}

// Exemples de données
const user = new User("User1", 10000, [
    {
        heroName: "crusader",
        equipment: [
            {
                equipmentName: "eqpWeapon",
                level: 1,
                attack: 5
            },
            {
                equipmentName: "eqpArmour",
                level: 1,
                defense: 8
            },
        ]
    },
    {
        heroName: "bandit",
        equipment: [
            {
                equipmentName: "eqpWeapon",
                level: 1,
                attack: 5
            },
            {
                equipmentName: "eqpArmour",
                level: 1,
                defense: 8
            },
        ]
    }
], [
    {
        potionName: "exemple1",
        qte: 2
    }
]);

user.saveToLocalStorage();
