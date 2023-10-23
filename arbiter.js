class Arbiter {
    
    constructor(){
        //get some context + better readability
        this.screenWidth = game.config.width;
        this.screenHeight = game.config.height;

        //fighters placement variable
        this.middle = this.screenWidth/2    //horizontal center
        this.firstOffSet = 90               //how far away the first fighter is from the center
        this.fightersOffSet = 120           //how far each fighter is from eachother (front to front)
        this.floor = 530                    //where the characters are placed vertically

        console.log(this.screenHeight);
        console.log(this.screenWidth);
    }

    getVerticalPosition(rank, team){
        //1 front, 4 back, shouldn't be called for anything but 1,2,3,4

        let result = this.firstOffSet + (rank - 1) * this.fightersOffSet

        if (team === "hero"){
            console.log(team)
            return(this.middle - result)
        }
        else{
            return(this.middle + result)
        }
    }


    
}