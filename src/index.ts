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
        $btnPedir.disabled = false;
        $btnDetener.disabled = false;

        deck = [];
        crearDeck.crearBarajas(tipos, especiales);

        jugadores.push(new puntosJugadores('anfitrion', 'madariaga', 0, []))
        
        renderBloqueJugador(jugadores[0], "localJudador")

        $btnPedir.addEventListener('click', ()=> {
          const carta = acciones.pedirCarta()
          acciones.acumularPuntos(carta, false)
          renderCarta(carta, jugadores[0].id)
        })


        $btnDetener.addEventListener('click', ()=> {
          $btnPedir.disabled = true;
          $btnDetener.disabled = true;

          acciones.turnoComputadora(jugadores[0].puntos)
          console.log({jugadores})
        })


        
        //renderBloqueJugador(jugadores[1], "grupoRivales")
       // console.log({jugadores})


        
        console.log(deck)
    }

    $vsMaquina?.addEventListener('click', ()=> {
      iniciarJuego();
    })
    
})()





