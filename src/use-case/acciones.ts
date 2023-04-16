import { deck } from ".."

export const pedirCarta = ():string => {
    if(deck.length === 0 ) throw "no hay cartas en la baraja"
    return deck.pop() as string
}