"use strict";

import { puntosJugador } from "./classes/jugadores";
import { renderCarta } from "./presentation/render-carta";
import { renderBloqueJugador } from "./presentation/render-bloque-jugador";
import * as acciones from "./use-case/acciones";
import crearDeck from "./use-case/crearDeck";
import { Jugador } from "./interfaces/jugador";
import { vsMaquina } from "./use-case/vsMaquina";

export const d = document,
  $vsMaquina = d.getElementById("vsMaquina") as HTMLButtonElement,
  $buscarRival = d.getElementById("buscarRival") as HTMLButtonElement,
  $btnNuevo = d.getElementById("btnNuevo") as HTMLButtonElement,
  $btnPedir = d.getElementById("btnPedir") as HTMLButtonElement,
  $btnDetener = d.getElementById("btnDetener") as HTMLButtonElement,
  $loader = d.querySelector(".loader") as HTMLDivElement;

export let deck: string[] = [];

export let jugadores: Jugador[] = [];

export let nombre: string = "";
let id: any = null;

const tipos: string[] = ["C", "D", "H", "S"],
  especiales: string[] = ["J", "K", "Q", "A"];

export const btnDisabled = (boolean: boolean): void => {
  $btnPedir.disabled = boolean;
  $btnDetener.disabled = boolean;
};

(() => {
  nombre = prompt("¿Cómo te llamas?") || "Jugador Local";
  const iniciarJuego = () => {
    deck = [];
    crearDeck.crearBarajas(tipos, especiales);
  };

  $vsMaquina?.addEventListener("click", () => {
    iniciarJuego();
    vsMaquina();
  });

  const iniciarJuegoMultiJugador = () => {
    btnDisabled(false);
    iniciarJuego();

    jugadores.push(new puntosJugador(id, nombre, 0, []));
    renderBloqueJugador(jugadores[0], "localJudador");

    $btnPedir.addEventListener("click", () => {
      const carta = acciones.pedirCarta();
      acciones.acumularPuntos(carta, false);

      enviarCartaSeleccionada(carta, jugadores[0].puntos);

      renderCarta(carta, jugadores[0]);

    });

    $btnDetener.addEventListener("click", () => {
      btnDisabled(true);
      obtenerRivales(true);

      //TODO: Escucha cuando el rival finalice su jugada
      jugadores.forEach((jugador: Jugador)=> {
        if(jugador.id != id){
          console.log(jugador.cartas)
          jugador.cartas.forEach((carta: string)=> {
            renderCarta(carta, jugador);
          })
          
        }
      })
      
      console.log(jugadores)
    });
    $btnNuevo.disabled = true;
  };

  $buscarRival.addEventListener("click", async () => {
    $buscarRival.disabled = true;
    const intervalTime: number = 1000;
    const totalTime: number = 10000;

    $loader.style.display = "block";
    id = (await obtenerId("http://localhost:8080/unirse")) || "";
    enviarDatos(nombre);

    const intervalId = setInterval(obtenerRivales, intervalTime);

    setTimeout(() => {
      clearInterval(intervalId);
      $loader.style.display = "none";

      jugadores.forEach((jugador: Jugador) => {
        if (jugador.id != id) {
          renderBloqueJugador(jugador, "grupoRivales");
        }
      });
    }, totalTime);

    iniciarJuegoMultiJugador();
  });

  $btnNuevo.addEventListener("click", () => {});

  // unirse
  const obtenerId = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      return data;
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
    }
  };

  const enviarDatos = (nombre: string) => {
    fetch(`http://localhost:8080/21/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
      }),
    });
  };

  const enviarCartaSeleccionada = (carta: string, puntos: number) => {
    console.log(carta);
    fetch(`http://localhost:8080/21/${id}/cartaSelecion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carta,
        puntos,
      }),
    });
  };

  const obtenerRivales = async (actualizar = false) => {
    try {
      const response = await fetch(`http://localhost:8080/21/${id}/jugadores`);
      const data: [] = await response.json();
      data.forEach((jugador: any) => {
        const jugadorIndex = jugadores.findIndex(
          (jugadorRegistrado) => jugador.id === jugadorRegistrado.id
        );

        if (actualizar) {
          jugadores[jugadorIndex].cartas = jugador.cartas;
          jugadores[jugadorIndex].puntos = jugador.puntos;
        } else {

          if (jugadorIndex === -1) {
            jugadores.push(jugador);
          }
        }
      });
      //return data;
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
    }
  };


  /* const obtenerRivales = (url: string) => {
  const esperar = new Promise(resolve => {
    setTimeout(resolve, 5000);
  });
  
  // Utiliza Promise.all() para ejecutar las promesas en paralelo
  Promise.all([fetch(url), esperar])
    .then(([respuesta]) => respuesta.json())
    .then(datos => {
  
      // Haz algo con los datos que has recibido
      console.log(datos);
      console.log(datos.length)
    })
    .catch(error => {
      console.error(error);
    });
  } */
})();
