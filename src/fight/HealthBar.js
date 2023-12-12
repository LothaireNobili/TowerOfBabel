class HealthBar {
    constructor(scene, character, team, arbiter) {
        this.scene = scene;
        this.character = character;
        this.helper = arbiter;
        this.team = team;
        this.offSet = 25
        this.size = 100

        // Create healthbar background
        this.background = this.scene.add.rectangle(this.helper.getVerticalPosition(character.position, this.team)-this.size/2, 
                                this.helper.floor+this.offSet, this.size, 10, 0x151515);
        
        // Create healthbar
        this.bar = this.scene.add.rectangle(this.helper.getVerticalPosition(this.character.position, this.team)-this.size/2, 
                                this.helper.floor+this.offSet, this.size, 10, 0x992525);

       // console.log(graphicManager.getVerticalPosition(1, "hero"))

        // Set the origin of the healthbar to the left
        this.background.setOrigin(0, 1);
        this.bar.setOrigin(0, 1);

        // Set the initial width of the healthbar
        this.bar.displayWidth = this.calculateBarWidth();
    }

    update() {
        console.log("update of "+this.character.name+"'s healthbar in progress")
        this.destroy()
        this.background = this.scene.add.rectangle(this.helper.getVerticalPosition(this.character.position, this.team)-this.size/2, 
                                this.helper.floor+this.offSet, this.size, 10, 0x151515);
        this.bar = this.scene.add.rectangle(this.helper.getVerticalPosition(this.character.position, this.team)-this.size/2, 
                                this.helper.floor+this.offSet, this.size, 10, 0x992525);

        this.background.setOrigin(0, 1);
        this.bar.setOrigin(0, 1);
        
        this.bar.displayWidth = this.calculateBarWidth();
    }

    calculateBarWidth() {
        // Calculate and return the healthbar width based on character health
        return (this.character.hp / this.character.max_hp) * 100;
    }

    destroy() {
        // Destroy the lifebar and its components
        this.background.destroy();
        this.bar.destroy();
    }
}