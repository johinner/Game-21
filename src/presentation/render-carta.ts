import { Jugador } from "../interfaces/jugador";
import { renderPuntos } from "./render-puntos";

export const renderCarta = (carta: string, dataJugador: Jugador): void => {

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/img/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    const insertar =  document.querySelector(`#${dataJugador.id} .divCartas`)
    insertar?.append(imgCarta);

    renderPuntos(dataJugador);
}