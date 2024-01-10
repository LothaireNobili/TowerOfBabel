class GraphicManager{
    constructor(){
        this.spriteSheetDatas = {
            crusader : {
                wait:{
                    frameWidth: 158,
                    frameHeight: 401,
                    end: 30
                },
                idle:{
                    frameWidth: 171,
                    frameHeight: 334,
                    end: 32
                },
                walk:{
                    frameWidth: 177,
                    frameHeight: 335,
                    end: 32
                }
            },

            bandit : {
                wait:{
                    frameWidth: 182,
                    frameHeight: 296,
                    end: 28
                },
                idle:{
                    frameWidth: 175,
                    frameHeight: 301,
                    end: 30,
                },
                walk:{
                    frameWidth: 180,
                    frameHeight: 302,
                    end: 32
                }
            },
            plaguedoctor : {
                wait:{
                    frameWidth: 192,
                    frameHeight: 280,
                    end: 30
                },
                idle:{
                    frameWidth: 191,
                    frameHeight: 289,
                    end: 32
                },
                walk:{
                    frameWidth: 199,
                    frameHeight: 286,
                    end: 32
                }
            },
            vestal : {
                wait:{
                    frameWidth: 180,
                    frameHeight: 301,
                    end: 30
                },
                idle:{
                    frameWidth: 180,
                    frameHeight: 296,
                    end: 36
                },
                walk:{
                    frameWidth: 182,
                    frameHeight: 297,
                    end: 32
                }
            },
            hellion : {
                wait:{
                    frameWidth: 209,
                    frameHeight: 389,
                    end: 28
                },
                idle:{
                    frameWidth: 177,
                    frameHeight: 372,
                    end: 32
                },
                walk:{
                    frameWidth: 200,
                    frameHeight: 377,
                    end: 33
                }
            },
            skeleton : {
                wait:{
                    frameWidth: 144,
                    frameHeight: 284,
                    end: 28
                }
            },
            spider : {
                wait:{
                    frameWidth: 244,
                    frameHeight: 242,
                    end: 30
                }
            }

        }
    }

}