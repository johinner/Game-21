import { deck, jugadores } from "..";
import { puntosJugador } from "../classes/jugadores";
import { Jugador } from "../interfaces/jugador";
import { renderBloqueJugador } from "../presentation/render-bloque-jugador";
import { renderCarta } from "../presentation/render-carta";
import crearDeck from "./crearDeck";

import { v4 as uuidv4 } from 'uuid';

export const pedirCarta = (): string => {
  if (deck.length === 0) throw "no hay cartas en la baraja";
  return deck.pop() as string;
};

// el indice 0 siempre va a hecer el local
export const acumularPuntos = (
  cartaSelecionada: string,
  maquina?: boolean
): Jugador => {
  let indice: number = maquina ? 1 : 0;

  jugadores[indice].puntos =
    jugadores[indice].puntos +
    crearDeck.valorCartaSeleccionada(cartaSelecionada);
  jugadores[indice].cartas.push(cartaSelecionada);
  return jugadores[indice];
};

export const turnoComputadora = (puntosMinimos: number): void => {
  jugadores.push(new puntosJugador(`id-${uuidv4()}`, "computadora", 0, [], false));
  renderBloqueJugador(jugadores[1], "grupoRivales");
  do {
    const carta = pedirCarta();
    acumularPuntos(carta, true);
    renderCarta(carta, jugadores[1]);
  } while (jugadores[1].puntos < puntosMinimos && puntosMinimos <= 21);
};

export const determinarGanador = (): object => {
  let puntosReferencia: number = 0;
  let jugadorGanador: object = {};
  let jugadoresEmpatados: any = [];
  
  jugadores.forEach((elem) => {
    if (elem.puntos > puntosReferencia && elem.puntos <= 21) {
      puntosReferencia = elem.puntos;
      jugadorGanador = elem;
    }
  });

  jugadores.forEach((elem) => {
    if (elem.puntos === puntosReferencia) {
      jugadoresEmpatados.push(elem);
    }
  });

  if(jugadoresEmpatados.length > 1){
    console.info(`Empate:`)
    console.log(jugadoresEmpatados)
    return {
        jugadoresEmpatados
    }
  }
  console.info(`Jugador Ganador:`)
  console.log(jugadorGanador)
  return jugadorGanador;
};
