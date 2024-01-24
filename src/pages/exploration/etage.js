class Etage
{
    salles=[]
    couloirs=[]
    
    constructor()
    {
        
    }

    remplireSalles()
    {
        let rooms=Escalier.construireEtage()
        for (room in rooms)
        {
            position=this.determinerProchainePosition()
            this.salles.push(new Salle(room,position));

        }
    }

    determinerProchainePosition()
    {
        if(this.salles.length==0)return [0,0]
        else 
        {
            console.log(this.choisirSalleAleatoire())
        }

    }

    choisirSalleAleatoire()
    {
        return this.salles(Math.floor(Math.random()*this.salles.length))
    }
}