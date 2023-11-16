class Salle extends Phaser.Scene
{
    coord_x;
    coord_y;
    categorie;
    contenue;
    nord;
    sud;
    est;
    ouest;

    constructor(coord_x,coord_y,nord,est,sud,ouest,contenue,categorie)
    {
        super({ key: 'Salle' });
        this.coord_x=coord_x;
        this.coord_y=coord_y;
        this.nord=nord;
        this.est=est;
        this.sud=sud;
        this.ouest=ouest;
        this.contenue=contenue
        this.categorie=categorie
    }
    
    preload() {
        this.load.setBaseURL('../../../assets/')
        this.load.image("salle", "http://placehold.it/30x30");
      }

    genererNouvelleSalleNord()
    {
       this.setNord(new Salle(this.coord_x,this.coord_y+1,null,null,this,null,null,null))
    }
    genererNouvelleSalleEst()
    {
        this.setEst(new Salle(this.coord_x+1,this.coord_y,null,this,null,null,null,null));    
    }
    genererNouvelleSalleSud()
    {
        this.setSud(new Salle(this.coord_x,this.coord_y-1,null,this,null,null,null,null));    
    }
    genererNouvelleSalleOuest()
    {
        this.setOuest(new Salle(this.coord_x-1,this.coord_y,null,this,null,null,null,null));    
    }
   
    afficherMapText(dejaExplorer) {
        dejaExplorer.push(this);
       // console.log(this.coord_x, this.coord_y); 
        if (this.nord != null && !dejaExplorer.includes(this.nord)) this.nord.afficherMapText(dejaExplorer);
        if (this.est != null && !dejaExplorer.includes(this.est)) this.est.afficherMapText(dejaExplorer);
        if (this.sud != null && !dejaExplorer.includes(this.sud)) this.sud.afficherMapText(dejaExplorer);
        if (this.ouest != null && !dejaExplorer.includes(this.ouest)) this.ouest.afficherMapText(dejaExplorer);
    }
    
   

    setNord(salle)
    {
        this.nord=salle;
    }
    setEst(salle)
    {
        this.est=salle
    }
    setSud(salle)
    {
        this.sud=salle;
    }
    setOuest(salle)
    {
        this.ouest=salle
    }
    toString()
    {
        console.log(this.coord_x,this.coord_y);
    }
}
let salle=new Salle(0,0,null,null,null,null);
/*
salle.toString()
salle.genererNouvelleSalleNord();
salle.nord.genererNouvelleSalleNord();
salle.genererNouvelleSalleEst();
salle.genererNouvelleSalleOuest();
salle.genererNouvelleSalleSud();


salle.afficherMapText([]);*/