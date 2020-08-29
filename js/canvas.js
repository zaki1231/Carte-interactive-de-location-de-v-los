class Canvas {

    constructor() {
        this.canvasContainer = document.getElementById("canvas_container");
        this.context = this.canvasContainer.getContext("2d");
        this.limiteCanvas = null;
        this.x = 0;
        this.y = 0;
        this.dessinEnCours = false;
        this.signatureTerminee = false;
        this.signerSouris();
        this.SignerTactile();
    }

    signerSouris(){

    /**
     * Event de souris
     */
        this.canvasContainer.addEventListener('mousedown', e => {
            this.limiteCanvas = this.canvasContainer.getBoundingClientRect();
            this.dessinEnCours = true;
            this.x = e.clientX - this.limiteCanvas.left;
            this.y = e.clientY - this.limiteCanvas.top;
        });

        this.canvasContainer.addEventListener('mousemove', e => { 
            if (this.dessinEnCours === true) {
                let xCanvas = e.clientX - this.limiteCanvas.left;
                let yCanvas = e.clientY - this.limiteCanvas.top;
                this.dessiner(this.x, this.y, xCanvas, yCanvas);
                this.x = xCanvas;
                this.y = yCanvas;
            }
        });

        this.canvasContainer.addEventListener('mouseup', e => { 
            if (this.dessinEnCours === true) {
                let xCanvas = e.clientX - this.limiteCanvas.left;
                let yCanvas = e.clientY - this.limiteCanvas.top;
                this.dessiner(this.x, this.y, xCanvas, yCanvas);
                this.x = 0;
                this.y = 0;
                this.dessinEnCours = false;
                this.signatureTerminee = true;
            }
        });
    };


    SignerTactile(){ 
        /**
         * Event tactile
         */
        this.canvasContainer.addEventListener('touchstart', e => {
            console.log("touchstart");
            e.preventDefault();
            this.limiteCanvas = this.canvasContainer.getBoundingClientRect();
            this.dessinEnCours = true;
            this.x = e.touches[0].clientX - this.limiteCanvas.left;
            this.y = e.touches[0].clientY - this.limiteCanvas.top;

        });

        this.canvasContainer.addEventListener('touchmove', e => {
            console.log("touchmove");
            e.preventDefault();
            if (this.dessinEnCours === true) {
                let xCanvas = e.touches[0].clientX - this.limiteCanvas.left;
                let yCanvas = e.touches[0].clientY - this.limiteCanvas.top;
                this.dessiner(this.x, this.y, xCanvas, yCanvas);
                this.x = xCanvas;
                this.y = yCanvas;
            }
        });

        this.canvasContainer.addEventListener('touchend', e => {
            console.log("touchend");
            e.preventDefault();
            if (this.dessinEnCours === true) {
                let xCanvas = e.changedTouches[0].clientX - this.limiteCanvas.left;
                let yCanvas = e.changedTouches[0].clientY - this.limiteCanvas.top;
                this.dessiner(this.x, this.y, xCanvas, yCanvas);
                this.x = 0;
                this.y = 0;
                this.dessinEnCours = false;
                this.signatureTerminee = true;
            }
        });
    };

   

    dessiner(xDepart, yDepart, xFin, yFin) {
       this.context.beginPath();
       this.context.strokeStyle = 'blak';
       this.context.lineWidth = 4;
       this.context.moveTo(xDepart, yDepart);
       this.context.lineTo(xFin , yFin);
       this.context.stroke();
       this.context.closePath();
    }
        
    clearCanvas(){
        this.context.clearRect(0, 0, this.canvasContainer.width, this.canvasContainer.height);
    }


}