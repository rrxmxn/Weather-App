const cidadePredefinida = "Blumenau";

const cidadeSelecionada = document.querySelector("#cidade");
const blocoSelecionaCidade = document.querySelector("#bloco-seleciona-cidade");
const pesquisar = document.querySelector("#pesquisaBotao");
const mensagemCidade = document.querySelector("#jsMensagemCidade");

const nomeCidade = document.querySelector("#nome-cidade");
const temperatura = document.querySelector("#temperatura");
const iconeTempo = document.querySelector("#tempo-icone");
const resumoTempo = document.querySelector("#resumo-tempo");
const sensacaoTermica = document.querySelector("#sensacao");
const umidade = document.querySelector("#umidade");
const pressao = document.querySelector("#pressao");
const hPa = document.querySelector("#hPa");
const visibilidade = document.querySelector("#visibilidade");
const medidaKM = document.querySelector("#medida-km");
const vento = document.querySelector("#vento");
const medidaKMH = document.querySelector("#medida-kmh");
const direcaoVento = document.querySelector("#direcao-vento");
const pontoCardeal = document.querySelector("#ponto-cardeal");
const nascerSol = document.querySelector("#nascer-sol");
const porSol = document.querySelector("#por-sol");

const sensacaoParagrafo = document.querySelector("#sensacao-paragrafo");
const ventoParagrafo = document.querySelector("#vento-paragrafo");

const getWeatherDados = async (cidade) => {
    if (cidade === "") {
        cidade = cidadePredefinida;
    }

    const apiURL = formataApiURL(cidade);

    const res = await fetch(apiURL);
    const dados = await res.json();

    if (dados.message === "city not found") {
        mostrarMensagem(mensagemCidade);
        const apiURL = ("https://api.openweathermap.org/data/2.5/weather?q=" + cidadePredefinida + "&lang=pt_br&units=metric&appid=" + apiKey);

        const res = await fetch(apiURL);
        const dados = await res.json();

        return dados;
    }

    return dados;
};

// Fazer tratamento de erros
//
//

const exibirDados = async (cidade) => {
    if (!apiKey) {
        await loadApiKey();
    }
    const dados = await getWeatherDados(cidade);

    mostrarElementos([medidaKM, direcaoVento, blocoSelecionaCidade, medidaKMH, hPa]);

    nomeCidade.innerText = dados.name;
    temperatura.innerText = (parseInt(dados.main.temp) + "°");
    iconeTempo.setAttribute(
        "src", `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    );
    resumoTempo.innerText = dados.weather[0].description;
    sensacaoTermica.innerText = (parseInt(dados.main.feels_like) + "°");
    umidade.innerText = (dados.main.humidity + "%");
    pressao.innerText = dados.main.pressure;
    visibilidade.innerText = (dados.visibility / 1000).toFixed(1);
    visibilidade.innerText = visibilidade.innerText.toString().replace(".", ",")
    vento.innerText = (dados.wind.speed * 3.6).toFixed(1);
    vento.innerText = vento.innerText.toString().replace(".", ",");
    document.getElementById("direcao-vento").style.transform = "rotate(" + dados.wind.deg + "deg)";
    pontoCardeal.innerText = calculaPontoCardeal(dados.wind.deg);
    nascerSol.innerText = converterCarimboParaHoraMinuto(dados.sys.sunrise, dados.timezone);
    porSol.innerText = converterCarimboParaHoraMinuto(dados.sys.sunset, dados.timezone);

    if (parseInt(dados.main.temp) == parseInt(dados.main.feels_like)) {
        sensacaoParagrafo.innerText = "A sensação térmica no momento coincide com a temperatura real. Quando ocorrem discrepâncias, estas podem ser atribuídas a elementos como a velocidade do vento e a umidade relativa do ar.";
    } else {
        sensacaoParagrafo.innerText = `A sensação térmica no momento é de ${parseInt(dados.main.feels_like)}°, mas a temperatura real é de
        ${parseInt(dados.main.temp)}°. A diferença se deve à fatores como a velocidade do vento e a umidade relativa do ar.`;
    }

    if (dados.wind && typeof dados.wind.gust !== "undefined") {
        mostrarElementos([ventoParagrafo]);
        var windGust = (dados.wind.gust * 3.6).toFixed(1);
        windGust = windGust.toString().replace(".", ",");
        ventoParagrafo.innerText = `Rajadas de até ${windGust} km/h.  As rajadas são pequenas lufadas de vento acima desta média e normalmente duram menos de 20 segundos.`;
    } else {
        ocultarElementos([ventoParagrafo]);
    }
}

pesquisar.addEventListener("click", async (e) => {
    e.preventDefault();
    const cidade = cidadeSelecionada.value;
    exibirDados(cidade);
    cidadeSelecionada.blur();
});

cidadeSelecionada.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const cidade = e.target.value;
        exibirDados(cidade);
        cidadeSelecionada.blur();
    }
});

async function inicializarApp() {
    await exibirDados(cidadePredefinida);
}

window.addEventListener("load", inicializarApp);