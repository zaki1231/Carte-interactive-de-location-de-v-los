class Main {
    constructor() {
        this.lancerApplication();
        document.getElementById("bloc_signature").style.display = 'none'; 
        document.getElementById("playbtn").style.display = 'none' ;
     
    }

    initialiserSiUtilisateurExisteDeja(){

        if (localStorage.getItem('nom') && localStorage.getItem('prenom')){
            document.getElementById('nom').value= localStorage.getItem('nom')
            document.getElementById('prenom').value= localStorage.getItem('prenom')
        }

        if (sessionStorage.getItem('reservation')) {
            let reservation = JSON.parse(sessionStorage.getItem('reservation'));
            let resa = new Reservation(reservation.station, reservation.timer, sessionStorage.stoptimer, reservation.canvasSignature);
            resa.demarerMinuteur();
            
        }
        
    }
    
    lancerApplication() {
        this.initialiserSiUtilisateurExisteDeja();
        const divSlider = document.querySelectorAll("#slider figure");
        const suivbtn = document.getElementById("suivbtn");
        const precbtn = document.getElementById("precbtn");
        const pausebtn = document.getElementById("pausebtn");
        const playbtn = document.getElementById("playbtn");
        let monSlider = new Slider(5000, divSlider, suivbtn, precbtn,pausebtn, playbtn);
       
        let macarte = new Map();
       
    }
}

new Main();