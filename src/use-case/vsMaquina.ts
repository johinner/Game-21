import { $btnDetener, $btnPedir, btnDisabled, deck, jugadores, nombre } from "..";
import { puntosJugador } from "../classes/jugadores";
import { renderBloqueJugador } from "../presentation/render-bloque-jugador";
import { renderCarta } from "../presentation/render-carta";

import * as acciones from "./acciones";

import { v4 as uuidv4 } from "uuid";

export const vsMaquina = () => {
    btnDisabled(false);
    
    jugadores.push(new puntosJugador(`id-${uuidv4()}`, nombre, 0, []));
    renderBloqueJugador(jugadores[0], "localJudador");

    $btnPedir.addEventListener("click", () => {
      const carta = acciones.pedirCarta();
      acciones.acumularPuntos(carta, false);
      renderCarta(carta, jugadores[0]);

      if (jugadores[0].puntos > 21) {
        console.error("Perdiste!! superaste los 21");
        btnDisabled(true);
        acciones.turnoComputadora(jugadores[0].puntos);
      }
    });

    $btnDetener.addEventListener("click", () => {
      btnDisabled(true);
      acciones.turnoComputadora(jugadores[0].puntos);
      acciones.determinarGanador();
    });
    console.log(deck);
  };

