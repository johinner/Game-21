import { deck } from "..";
import * as elemento from "./elementosHtml";

const crearBarajas = (tipos:string[], especiales:string[]):string[] => {
    if(deck.length === 0){
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        } 
    }
    return deck.sort(function() {return Math.random() - 0.5})
}

const valorCartaSeleccionada = (carta: string):number  => {
    const cadenaExtraida: any = carta.substring(0, carta.length - 1)
    return isNaN(cadenaExtraida) ? (cadenaExtraida === "A") ? 11 : 10 : cadenaExtraida * 1;
}

const renderCarta = (carta: string, numeroElementoHTML: number): void => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/img/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    elemento.$divCartasJugadore[numeroElementoHTML].append(imgCarta);
}

export default {
    crearBarajas,
    valorCartaSeleccionada,
    renderCarta
}
