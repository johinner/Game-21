//serve --mode development --open --port=8081
import { v4 as uuidv4 } from 'uuid';

import express from 'express';
import cors from "cors"

const jugadores = [];

class Jugador {
    constructor(id){
        this.id = id
        this.cartas = []
    }

    asignarNombre(nombre){
        this.nombre = nombre
    }
    asignarPuntos(puntos){
        this.puntos = puntos
    }
    guardarCartas(carta){
        this.cartas.push(carta);
    }
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/unirse", (req, res) => {
    const id = `id-${uuidv4()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

app.post("/21/:jugadorId", (req, res) => {

    const jugadorId = req.params.jugadorId || "";
    const nombre = req.body.nombre || "";

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

     if(jugadorIndex >= 0 ){
         jugadores[jugadorIndex].asignarNombre(nombre)
     }
    res.end()
    console.log(jugadores)
})

app.post('/21/:jugadorId/cartaSelecion', (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const carta = req.body.carta || '';
    const puntos = req.body.puntos || 0;

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

     if(jugadorIndex >= 0 ){
         jugadores[jugadorIndex].guardarCartas(carta)
         jugadores[jugadorIndex].asignarPuntos(puntos)
     }
     res.end()
     console.log(jugadores)
})

app.get("/21/:jugadorId/jugadores", (req, res) => {
    const jugadorId = req.params.jugadorId || "";

    const rivales = jugadores.filter((jugadorLocal) => jugadorId !== jugadorLocal.id)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(rivales)
})

app.listen(8080, () => {
    console.log('Servidor en linea')
})