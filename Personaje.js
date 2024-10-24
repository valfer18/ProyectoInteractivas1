export default class Personaje {

    vida;
    speed;    

    constructor() {
       this.vida = 3;
       this.speed = 175;
    }

    perderVida(){
        this.vida--;      
    }

    incrementarVida(){
        this.vida++;      
    }

    
}