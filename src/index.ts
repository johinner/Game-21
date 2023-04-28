"use strict";

import { puntosJugadores } from "./classes/jugadores";
import { renderCarta } from "./presentation/render-carta";
import { renderBloqueJugador } from "./presentation/render-bloque-jugador";
import * as acciones from "./use-case/acciones";
import crearDeck from "./use-case/crearDeck";
import { Jugador } from "./interfaces/jugador";

const d = document,
 $vsMaquina = d.getElementById('vsMaquina') as HTMLButtonElement,
 $buscarRival = d.getElementById('buscarRival') as HTMLButtonElement,

 $btnNuevo = d.getElementById('btnNuevo') as HTMLButtonElement ,
 $btnPedir = d.getElementById('btnPedir') as HTMLButtonElement,
 $btnDetener = d.getElementById('btnDetener') as HTMLButtonElement;


export let deck: string[] = [];

export let jugadores: Jugador[] = [];

const tipos: string[] = ["C", "D", "H", "S"],
  especiales: string[] = ["J", "K", "Q", "A"];

(()=>{
    const iniciarJuego = () => {
        btnDisabled(false)

        deck = [];
        crearDeck.crearBarajas(tipos, especiales);

        jugadores.push(new puntosJugadores('anfitrion', 'madariaga', 0, []))
        
        renderBloqueJugador(jugadores[0], "localJudador")

        $btnPedir.addEventListener('click', ()=> {
          const carta = acciones.pedirCarta()
          acciones.acumularPuntos(carta, false)
          renderCarta(carta, jugadores[0])

          if(jugadores[0].puntos > 21){
            console.error('Perdiste!! superaste los 21')
            btnDisabled(true)
            acciones.turnoComputadora(jugadores[0].puntos)
          }
        })


        $btnDetener.addEventListener('click', ()=> {
          btnDisabled(true);

          acciones.turnoComputadora(jugadores[0].puntos)
          
          acciones.determinarGanador();
        })
        
        console.log(deck)
    }

    $vsMaquina?.addEventListener('click', ()=> {
      iniciarJuego();
    })

    const btnDisabled = (boolean: boolean): void => {
      $btnPedir.disabled = boolean;
      $btnDetener.disabled = boolean;
    }
    
})()





