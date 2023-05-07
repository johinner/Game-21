import { Jugador } from "../interfaces/jugador";

export const renderBloqueJugador = (dataJugador:Jugador , renderUbicacion: string): void => {

  const bloqueDiv = document.querySelector(`.${renderUbicacion}`);

  const div = document.createElement("div");
  div.classList.add("row", "container", "mt-2");
  div.setAttribute('id', dataJugador.id)
  div.innerHTML = ` 
        <div class="col">
            <h1>
                ${dataJugador.nombre}
                <small>0</small>
            </h1>
            <div class="divCartas">

            </div>
        </div>
`;
  bloqueDiv?.append(div);
};
