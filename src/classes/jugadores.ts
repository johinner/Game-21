export class puntosJugadores {
    constructor(
        public id: string,
        public nombre: string,
        public puntos: number,
    ){}
    set modificarPuntos(puntos: number){
         this.puntos = this.puntos + puntos;
    }
    mostrarDatosJuagador(){
       return console.log(`${this.nombre} Puntos Totales: ${this.puntos}`)
    }
}