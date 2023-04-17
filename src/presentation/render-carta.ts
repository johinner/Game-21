
export const renderCarta = (carta: string, html_id: string): void => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/img/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    const insertar =  document.querySelector(`#${html_id} .divCartas`)
    insertar?.append(imgCarta);
}