"use strict";

import { puntosJugadores } from "./classes/jugadores";
import { pedirCarta } from "./use-case/acciones";
import crearDeck from "./use-case/crearDeck";

export let deck: string[] = [];

let jugadores = [];

const tipos: string[] = ["C", "D", "H", "S"],
  especiales: string[] = ["J", "K", "Q", "A"];

//jugadores.push(new puntosJugadores("jfdjfdn42",'johinner', 8))
(()=>{
    const iniciarJuego = () => {
        crearDeck.crearBarajas(tipos, especiales);
        
        crearDeck.renderCarta(pedirCarta(), 0)
        console.log(deck)
    }
    iniciarJuego();
})()





