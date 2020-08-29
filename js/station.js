 class Station {
    constructor (nom, position, adresse, nbrVelosDispo ,nbrPlaces){
        this.nom = nom;
        this.position = position;
        this.adresse = adresse;
        this.nbrVelosDispo = nbrVelosDispo;
        this.nbrPlaces = nbrPlaces;
    }
     
    calculerDisponibilite() {
        let tauxDisponibilite = (this.nbrVelosDispo * 100) / this.nbrPlaces;
        
        if (tauxDisponibilite >= 50) {
            return "vert";
        }      
        if (tauxDisponibilite < 50 && tauxDisponibilite > 0 ){
            return "orange";
        } else {
            return "rouge";
        }
    }
}

