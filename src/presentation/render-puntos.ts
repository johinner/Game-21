import { Jugador } from "../interfaces/jugador"

export const renderPuntos = (dataJugador: Jugador):void => {
    const $small = document.querySelector(`#${dataJugador.id} small`)
    if($small) $small.textContent = dataJugador.puntos.toString()
}