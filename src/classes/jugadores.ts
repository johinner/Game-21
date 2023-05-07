export class puntosJugador {
    constructor(
        public id: string,
        public nombre: string,
        public puntos: number = 0,
        public cartas: string[],
    ){}
    set modificarPuntos(puntos: number){
         this.puntos = this.puntos + puntos;
    }
    mostrarDatosJuagador(){
       return console.log(`${this.nombre} Puntos Totales: ${this.puntos}`)
    }
}