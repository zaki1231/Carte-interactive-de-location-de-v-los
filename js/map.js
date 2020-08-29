

class Map {
    constructor(stations){ 
        this.stations = stations;  
        this.macarte = L.map('carte').setView([43.605000, 1.440466], 12);
       


        this.greenIcon = L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
        });

        this.orangeIcon = L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
        });

        this.redIcon = L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
        });
       
        
        this.afficherMap();
        this.recuprerStation();
    }

    afficherMap(){ 
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        }).addTo(this.macarte);
        document.getElementById("bloc2").style.display = 'none';

    }

    recuprerStation(){
        let carte = this;
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                let response = JSON.parse(this.responseText);                
                carte.afficherStations(response);
              
            }
        }
        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=4c2a95f2ec1f6a07ba8b9b429f183e22bef3c44c");
        request.send();    
    }


    afficherStations(stations) { 
       for (let stationJson of stations) {
           let station = new Station(stationJson.name, stationJson.position, stationJson.address, stationJson.available_bikes, stationJson.bike_stands);
           let couleur = station.calculerDisponibilite();
           
           if(couleur == "vert") {
              
                this.creerMarker(this.greenIcon,station); 
           }
           else if(couleur == "orange") {
             
            this.creerMarker(this.orangeIcon,station); 
           }else {
            this.creerMarker(this.redIcon, station);    
              
           }

       }
    }
    
    creerMarker(couleur, station) {
        L.marker(station.position, {icon:couleur}).addTo(this.macarte).on('click', ()=> {
            
            document.getElementById("bloc1").style.display = 'none';
            document.getElementById("bloc2").style.display = 'block';
            document.getElementById("bloc_signature").style.display = 'none'; 
            this.afficherPanel(station);
        });

    }

    afficherPanel(station) {
        let nomStation = document.getElementById("nomStation");
        nomStation.innerHTML = station.nom;
        let adresseStation = document.getElementById("adresseStation");
        adresseStation.innerHTML = "Adresse Station" + " : " + station.adresse;
        let nbrDeVelosDispo = document.getElementById("nbrDeVelosDispo");
        let nbrDePlaces = document.getElementById("nbrDePlaces");
        let reservastionImpossible = document.getElementById("reservastionImpossible");

        if (station.nbrVelosDispo === 0) {
            nbrDeVelosDispo.innerHTML = "";
            nbrDePlaces.innerHTML = "";
            reservastionImpossible.innerHTML = "Réservation impossible (aucun vélo disponible)";
            document.getElementById("bouton_reserver").style.display ="none";
            document.getElementById("reservastionImpossible").style.color = "red"
        } else {
            reservastionImpossible.innerHTML = "";
            nbrDeVelosDispo.innerHTML = "Velos Disponible" + " : " + station.nbrVelosDispo;
            nbrDePlaces.innerHTML = "Places Disponibles" + " : " +  station.nbrPlaces;
            
            let timer = 20*60*1000;
            let maReservation = new Reservation(station , timer, null);  
        }
    }
}    
