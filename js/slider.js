class Slider {

    constructor(timer, divSlider, suivbtn, precbtn, pausebtn, playbtn) {
        this.slider = divSlider;
        this.timer = timer;
        this.suivbtn = suivbtn;
        this.precbtn = precbtn;
        this.pausebtn = pausebtn;
        this.playbtn = playbtn;
        this.marche = true;
        this.imageCourante = 0;
        this.interval;
        this.changerSlider = this.changerSlider.bind(this);
        this.demarerSlider = this.demarerSlider.bind(this);
        this.changerSliderClavier();
        this.demarerSlider();
        
    }


    demarerSlider() {
        this.interval = setInterval(this.changerSlider.bind(this, "droite"), this.timer);
        this.suivbtn.addEventListener("click", this.changerSlider.bind(this, "droite"));
        this.precbtn.addEventListener("click", this.changerSlider.bind(this, "gauche"));
        this.pausebtn.addEventListener("click", this.changerSlider.bind(this,"stop"));   
        this.playbtn.addEventListener("click", this.changerSlider.bind(this,"marche")); 
        window.addEventListener('keydown', this.changerSliderClavier.bind(this));
    }


    changerSlider(direction) {
        this.slider[this.imageCourante].classList.toggle("selected"); 

            if (direction == "droite") {
                if (this.imageCourante==this.slider.length-1){
                    this.imageCourante =0;
                
                } else {
                    this.imageCourante++;
                }
            }

            if (direction == "gauche") {
                if (this.imageCourante == 0){
                    this.imageCourante = this.slider.length -1;
                } else {
                    this.imageCourante--;
                }
            }

            if(direction == "stop"){
                //if(this.marche == true){
                    // cas ou le slider tourne
                    document.getElementById("pausebtn").style.display =' none' ;
                    document.getElementById("playbtn").style.display = 'block' ;
                    clearInterval(this.interval);
                    this.marche = false;
                }
               // } else {
            if(direction == "marche"){    
                document.getElementById("pausebtn").style.display =' block' ;
                document.getElementById("playbtn").style.display = 'none' ;   
                this.marche =true;
                if (this.imageCourante==this.slider.length-1){
                    this.imageCourante =0;
                
                } else {
                    this.imageCourante++;
                }
                    this.interval = setInterval(this.changerSlider.bind(this, "droite"), this.timer);
                    
            }
            
        this.slider[this.imageCourante].classList.toggle("selected"); 

            
    }


    changerSliderClavier(event) {
        if (event.keyCode == 39) {
            this.changerSlider("droite");
        }
        if (event.keyCode == 37) {
            this.changerSlider("gauche");
        }
    }
}
