let apiKey;

// Função para carregar a apiKey a partir do arquivo JSON
async function loadApiKey() {
    try {
        const response = await fetch('../configs/config.json');
        const data = await response.json();
        apiKey = data.apiKey;
    } catch (error) {
        console.error('Erro ao carregar config.json', error);
    }
}

function formataApiURL(nomeCidade) {
    return ("https://api.openweathermap.org/data/2.5/weather?q=" + nomeCidade.replace(/\s+/g, '%20') + "&lang=pt_br&units=metric&appid=" + apiKey);
}