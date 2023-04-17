import { deck, jugadores } from ".."
import { puntosJugadores } from "../classes/jugadores"
import { Jugador } from "../interfaces/jugador"
import { renderBloqueJugador } from "../presentation/render-bloque-jugador"
import { renderCarta } from "../presentation/render-carta"
import crearDeck from "./crearDeck"

export const pedirCarta = ():string => {
    if(deck.length === 0 ) throw "no hay cartas en la baraja"
    return deck.pop() as string
}

// el indice 0 siempre va a hecer el local 
export const acumularPuntos = (cartaSelecionada: string, maquina?:boolean):Jugador => {
    let indice:number = (maquina)? 1 : 0;

    jugadores[indice].puntos = jugadores[indice].puntos + crearDeck.valorCartaSeleccionada(cartaSelecionada);
    jugadores[indice].cartasSelecionadas.push(cartaSelecionada);
        return jugadores[indice]
}

export const turnoComputadora = (puntosMinimos: number):void => {
    jugadores.push(new puntosJugadores('maquina', 'computadora', 0, []))
    renderBloqueJugador(jugadores[1], "grupoRivales")
    do{
        const carta = pedirCarta()
        acumularPuntos(carta, true);
        renderCarta(carta, jugadores[1].id)
    }while ((jugadores[1].puntos < puntosMinimos) && puntosMinimos <= 21);
}