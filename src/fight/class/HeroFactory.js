
// Common functions for all heroes
class HeroFactory{

    constructor(){
    }

    
      
      // Hero factory function
      createFighter(className, startPos, sprite) {

        this.bluePrint = new FighterBluePrint();
        // Check if the specified class exists in the blueprints
        if (!this.bluePrint.classBlueprints[className]) {
          throw new Error(`Class ${className} does not exist.`);
        }
      
        // Create the initial hero object by merging stats with common functions
        const hero = Object.assign(
            {},
            this.bluePrint.classBlueprints[className],
            this.bluePrint.commonFunctions);
        hero.position = startPos;
        hero.sprite = sprite;
        
        return hero;
    }
}

  