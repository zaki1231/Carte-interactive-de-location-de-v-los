class Reservation {
    constructor(station, timer, stopTimer) {
        this.bouton_reserver = document.getElementById("bouton_reserver");
        this.conteneurReservation = document.getElementById("conteneurReservation");
        this.bouton_valider = document.getElementById("bouton_valider");
        this.station = station;
        this.timer = timer;
        this.stopTimer = stopTimer;
        this.bouton_reserver.innerHTML = "Réservez !";
        this.intervalResevation = null;
        this.canvasSignature = new Canvas();
        document.getElementById("bouton_reserver").style.display="block";
        this.bouton_reserver.addEventListener("click", this.afficherCanvas.bind(this));
        this.bouton_reserver.addEventListener("touchend", this.afficherCanvas.bind(this), false);     
       
    }

    afficherCanvas() {
        this.canvasSignature.clearCanvas();
        document.getElementById("bloc_signature").style.display = 'block';
        this.bouton_valider.addEventListener("click", this.afficherReservation.bind(this));
        this.bouton_valider.addEventListener("touchend", this.afficherReservation.bind(this), false); 
      
    }

    afficherReservation() {
        if (this.canvasSignature.signatureTerminee == true 
            && document.getElementById('nom').value != "" &&  document.getElementById('prenom').value !="") {
            clearInterval(this.intervalResevation);
            sessionStorage.clear();
            this.sauvgarderDonnees();
            this.stopTimer = new Date().getTime() + this.timer;
            sessionStorage.stoptimer = this.stopTimer;
            sessionStorage.canvasSignature = this.canvasSignature;
            this.demarerMinuteur();
        }else {
            if (this.canvasSignature.signatureTerminee == false) {
                alert("Pas de signature effectuée");
            } else { 
                alert("Saisir votre nom et prénom");
            
            }
        }
        
    }

    sauvgarderDonnees() {
        localStorage.setItem('nom', document.getElementById('nom').value);
        localStorage.setItem('prenom', document.getElementById('prenom').value);
        sessionStorage.setItem('reservation', JSON.stringify(this));
    }

    demarerMinuteur() {
        this.intervalResevation = setInterval(() => {
            let startTimer = new Date().getTime();
            let distance = this.stopTimer - startTimer;
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // le nombre de minutes restantes
            let seconds = Math.floor((distance % (1000 * 60)) / 1000); // le nombre de secondes restantes
            let recupererNom = localStorage.getItem('nom');
            let recupererPrenom = localStorage.getItem('prenom');
            this.conteneurReservation.innerHTML = "Vélo réservé par" + " " + recupererNom + " " + recupererPrenom + " " + "à la satation" + " " + this.station.nom + " Temps restant" + " : "  + minutes + "minutes" + " " + seconds + "secondes" ;

            if (minutes <= 0 && seconds <= 0) {
                clearInterval(this.intervalResevation);
                this.conteneurReservation.innerHTML = "Session expirée";
                sessionStorage.clear();
                
            }
        
        }, 1000);
    }



}
