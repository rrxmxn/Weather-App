function calculaPontoCardeal(graus) {
    // Define os intervalos de graus para cada ponto cardeal
    const direcoes = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"];
    const intervalos = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

    // Adiciona o primeiro ponto cardeal no final para completar o círculo
    direcoes.push("N");

    // Encontra o ponto cardeal correspondente ao valor em graus
    for (let i = 0; i < intervalos.length; i++) {
        if (graus < intervalos[i]) {
            return direcoes[i];
        }
    }

    // Se o valor estiver além de 337.5 graus (ou menos de 22.5 graus), retorna "N"
    return "N";
}

function converterCarimboParaHoraMinuto(carimboTempo, timezone) {
    const data = new Date(carimboTempo * 1000); // Multiplicar por 1000 para converter de segundos para milissegundos
    const offset = data.getTimezoneOffset();
    data.setSeconds(data.getSeconds() + timezone + (offset * 60));
    const horas = data.getHours();
    const minutos = data.getMinutes();

    const horasFormatadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;

    return `${horasFormatadas}:${minutosFormatados}`;
}

function mostrarElementos(elementos) {
    elementos.forEach(function (elemento) {
        elemento.classList.remove("hide");
    });
}

function ocultarElementos(elementos) {
    elementos.forEach(function (elemento) {
        elemento.classList.add("hide");
    });
}

function mostrarMensagem(elemento) {
    elemento.classList.remove("hide");
}

function fecharMensagem(elemento) {
    elemento.classList.add("hide");
}