class Etage {
    salles;
    couloires;
    difficulte;
    salleDebut;
    salleFin;
    rangeSalle = [[2, 4], [3, 6], [5, 9], [12, 17]]
    constructor(difficulte) {
        this.salles = []
        this.difficulte=difficulte
        this.salleDebut = new Salle(0, 0, null, null, null, null, "tresor", "Debut");
        this.salles.push(this.salleDebut)
    }

    genererEtage()
    {
        if (this.difficulte == 0) 
        {
            //si la difficulté est égal a -1 alors on genere un donjon prédeterminé
            this.salleDebut.genererNouvelleSalleEst();
            this.salleFin = this.salleDebut.est;
            this.salleFin.contenue = "tresor";
            this.salleFin.categorie = "Fin";
            this.salles.push(this.salleFin)
        }
        else 
        {
           while(this.salleFin==null)
           {
            let salleAjoutee=this.pickRandomFromList(this.salles); //salle a laquelle on ajoute une voisine
            console.log(salleAjoutee);
            if(this.canHaveMoreNeighbours(salleAjoutee))
            {   
                console.log('avant' ,  salleAjoutee)
                let sallePossible=this.lookupFreeNeighbours(salleAjoutee); // liste des possibles emplacement de la nouvelle salle
                switch(this.pickRandomFromList(sallePossible))
                {
                    case "nord": salleAjoutee.genererNouvelleSalleNord(); this.salles.push(salleAjoutee.nord); break;
                    case "sud": salleAjoutee.genererNouvelleSalleSud(); this.salles.push(salleAjoutee.sud); break;
                    case "est": salleAjoutee.genererNouvelleSalleEst(); this.salles.push(salleAjoutee.est); break;
                    case "ouest": salleAjoutee.genererNouvelleSalleOuest(); this.salles.push(salleAjoutee.ouest); break;

                }
                console.log('apres' , salleAjoutee)
                this.salleFin=salleAjoutee;
            }
           }
        }
        
    }

    toString() {
        console.log(this.salles)
    }

    // verifie si la salle en parametre peut avoir de nouvelle salles a ses coté
    canHaveMoreNeighbours(salle) {
        return this.lookupFreeNeighbours(salle)!=[];
    }

    //recherche une salle parmis toutes les salles de l'etage en utilisant ses coordonnés
    lookupRoom(x, y) {
        let found = false
        this.salles.forEach(salle => {
            if (salle.coord_x == x && salle.coord_y == y) found = salle;
        });

        return found;
    }

    //recherches tous les endroits ou une salle peut accueillir un nouveau voisins 
    //renvoie une liste 
    //cette liste peut avoir un maximum de 4 items et un minimum de 0
    lookupFreeNeighbours(salleTestee)
    {
        let free=[]
        if(!this.lookupRoom(salleTestee.coord_x, salleTestee.coord_y + 1))free.push("nord");
        if(!this.lookupRoom(salleTestee.coord_x + 1, salleTestee.coord_y))free.push("est");
        if(!this.lookupRoom(salleTestee.coord_x - 1, salleTestee.coord_y))free.push("ouest");
        if(!this.lookupRoom(salleTestee.coord_x, salleTestee.coord_y - 1))free.push("sud");
        return free
    }

    pickRandomFromList(liste)
    {
        return liste[Math.floor(Math.random() * liste.length)];
    }

}