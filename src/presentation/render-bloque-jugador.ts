import { id } from "..";
import { Jugador } from "../interfaces/jugador";

export const renderBloqueJugador = (dataJugador:Jugador , renderUbicacion: string): void => {

  const bloqueDiv = document.querySelector(`.${renderUbicacion}`);
  let $loader;

  const div = document.createElement("div");
  div.classList.add("row", "container", "mt-2");
  div.setAttribute('id', dataJugador.id)
  div.innerHTML = ` 
        <div class="col">
            <h1>
                ${dataJugador.nombre} <br>
            </h1>
            <h5> Puntos Totales: <small>0</small></h5>
            <div class="divCartas">
            <div class="loader"></div>
            </div>
        </div>
`;
  bloqueDiv?.append(div); 
  if(dataJugador.id != id){
    $loader = document.querySelector(`#${dataJugador.id} .loader`) as HTMLDivElement;
    $loader.style.display = "block";
  }
 
};
