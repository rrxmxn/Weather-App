function initMap() {
    const apiKeyGoogle = " ";

    const inputCidade = document.getElementById('cidade');

    // Mostra ou oculta o bloco de sugestões e define sua posição
    function toggleSuggestions(predictions) {
        const suggestionsDiv = document.getElementById('suggestions');

        if (predictions.length === 0) {
            suggestionsDiv.style.display = 'none';
        } else {
            const input = document.getElementById('cidade-fundo');
            const inputRect = input.getBoundingClientRect();
            suggestionsDiv.style.width = (inputRect.width + 'px');
            suggestionsDiv.style.marginLeft = 'auto';
            suggestionsDiv.style.marginRight = 'auto'
            suggestionsDiv.style.height = 'auto';
            suggestionsDiv.style.borderRadius = '.5em';
            suggestionsDiv.style.display = 'block';
            suggestionsDiv.style.backgroundColor = '#adf5ff';

            const bodyRect = document.body.getBoundingClientRect();
            const suggestionsBottom = inputRect.bottom + suggestionsDiv.clientHeight;

            // Verifica se as sugestões ultrapassam a parte inferior da janela e ajusta a posição se necessário
            if (suggestionsBottom > bodyRect.bottom) {
                const overflow = suggestionsBottom - bodyRect.bottom;
                suggestionsDiv.style.top = (inputRect.bottom - overflow) + 'px';
            }
        }
    }

    // Obtem sugestões de cidades à medida que o usuário digita
    function getSuggestions(input) {
        const autocompleteService = new google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions({
                input: input,
                types: ['(cities)'],
                apiKey: apiKeyGoogle,
            },
            (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    toggleSuggestions(predictions);
                    updateSuggestions(predictions);
                }
            }
        );
    }

    // Preenche o bloco de sugestões com sugestões de cidades
    function updateSuggestions(predictions) {
        const suggestionsDiv = document.getElementById('suggestions');
        suggestionsDiv.innerHTML = '';

        for (const prediction of predictions) {
            const suggestion = document.createElement('div');
            suggestion.textContent = prediction.description;
            suggestion.addEventListener('click', () => {
                document.getElementById('cidade').value = prediction.description;
                suggestionsDiv.style.display = 'none';
            });
            suggestionsDiv.appendChild(suggestion);
        }
    }

    // Ouve o evento de digitação no campo de entrada
    document.getElementById('cidade').addEventListener('input', (event) => {
        const inputText = event.target.value;
        if (inputText.length >= 3) {
            getSuggestions(inputText);
        } else {
            const suggestionsDiv = document.getElementById('suggestions');
            suggestionsDiv.style.display = 'none';
        }
    });

    function esconderSugestoes() {

        const suggestionsDiv = document.getElementById('suggestions');

        suggestionsDiv.style.display = 'none';
    }

    inputCidade.addEventListener('click', () => {
        esconderSugestoes();
    });

    // Evento de teclado no campo de entrada
    inputCidade.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            esconderSugestoes();
        }
    });
}