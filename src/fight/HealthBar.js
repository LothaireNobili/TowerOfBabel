class LifeBar {
    constructor(scene, character, team, arbiter) {
        this.scene = scene;
        this.character = character;
        this.helper = arbiter;
        this.team = team;
        this.offSet = 25

        // Create lifebar background
        this.background = this.scene.add.rectangle(this.helper.getVerticalPosition(character.position, this.team), 
                                this.helper.floor+this.offSet, 100, 10, 0x151515);
        
        // Create lifebar
        this.bar = this.scene.add.rectangle(this.helper.getVerticalPosition(character.position, this.team), 
                                this.helper.floor+this.offSet, 100, 10, 0x992525);

       // console.log(graphicManager.getVerticalPosition(1, "hero"))

        // Set the origin of the lifebar to the left
        this.background.setOrigin(0.5, 1);
        this.bar.setOrigin(0.5, 1);

        // Set the initial width of the lifebar
        this.bar.displayWidth = this.calculateBarWidth();
    }

    update() {
        // Update the lifebar width based on character health
        this.bar.displayWidth = this.calculateBarWidth();
    }

    calculateBarWidth() {
        // Calculate and return the lifebar width based on character health
        return (this.character.max_hp / this.character.max_hp) * 100;
    }
}