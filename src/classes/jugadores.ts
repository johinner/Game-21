export class puntosJugadores {
    constructor(
        public id: string,
        public nombre: string,
        public puntos: number = 0,
        public cartasSelecionadas: string[],
    ){}
    set modificarPuntos(puntos: number){
         this.puntos = this.puntos + puntos;
    }
    mostrarDatosJuagador(){
       return console.log(`${this.nombre} Puntos Totales: ${this.puntos}`)
    }
}