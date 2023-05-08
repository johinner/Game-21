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
  $btnNuevo.disabled = boolean;
};

let detener = false;

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

    jugadores.push(new puntosJugador(id, nombre, 0, [], false));
    renderBloqueJugador(jugadores[0], "localJudador");

    $btnPedir.addEventListener("click", () => {
      const carta = acciones.pedirCarta();
      acciones.acumularPuntos(carta, false);

      enviarCartaSeleccionada(carta, jugadores[0].puntos);

      renderCarta(carta, jugadores[0]);
    });

    $btnDetener.addEventListener("click", () => {
      jugadores[0].jugadaFinalizada = true;
      btnDisabled(true);
      enviarDatos(nombre, true);

      const esperaStopJugador = () => {
        console.log("Ejecutando...");
        //TODO: Escucha cuando el rival finalice su jugada
        const resultado = jugadores.find(
          (jugador) => jugador.jugadaFinalizada === false
        );
        obtenerRivales(true);

        if (resultado === undefined) {
          clearInterval(intervalId);
          jugadores.forEach((jugador: Jugador) => {
            if (jugador.id != id) {
              jugador.cartas.forEach((carta: string) => {
                renderCarta(carta, jugador);
              });
            }
          });
          acciones.determinarGanador();
        }
      };
      const intervalId = setInterval(esperaStopJugador, 1000);
    });
  };

  $buscarRival.addEventListener("click", async () => {
    $buscarRival.disabled = true;
    const intervalTime: number = 1000;
    const totalTime: number = 10000;

    $loader.style.display = "block";
    id = (await obtenerId("http://localhost:8080/unirse")) || "";
    enviarDatos(nombre, false);

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

  const enviarDatos = (nombre: string, jugadaFinalizada: boolean) => {
    fetch(`http://localhost:8080/21/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        jugadaFinalizada,
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
          jugadores[jugadorIndex].jugadaFinalizada = jugador.jugadaFinalizada;
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

})();
