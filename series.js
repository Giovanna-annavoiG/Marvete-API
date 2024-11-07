// Armazena todas as séries carregadas
let allTVShows = [];

// Função para carregar séries da Marvel
function loadMarvelTVShows() {
    const apiKey = 'ce2bc582fda4a4ae822d5c5c7b56e6c7'; // Substitua pela sua chave da API
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=first_air_date.desc&with_companies=420`; // 420 é a id da Marvel Studios

    fetch(url)
        .then(response => response.json())
        .then(data => {
            allTVShows = data.results; // Armazena todas as séries carregadas
            displayMarvelTVShows(allTVShows); // Exibe todas as séries inicialmente
        })
        .catch(error => console.error('Erro ao carregar séries da Marvel:', error));
}

// Função para exibir séries na página
function displayMarvelTVShows(shows) {
    const container = document.getElementById('tv-show-container');
    container.innerHTML = ''; // Limpa o container antes de adicionar novos cards

    shows.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)); // Ordena as séries por data

    shows.forEach(show => {
        const card = document.createElement('div');
        card.classList.add('tv-show-card');

        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
        image.alt = show.name;
        image.classList.add('tv-show-image');

        const content = document.createElement('div');
        content.classList.add('tv-show-content');

        const title = document.createElement('h3');
        title.classList.add('tv-show-title');
        title.textContent = show.name;

        const description = document.createElement('p');
        description.classList.add('tv-show-description');
        description.textContent = show.overview || "Descrição não disponível.";

        const releaseDate = document.createElement('p');
        releaseDate.classList.add('tv-show-release-date');
        releaseDate.textContent = `Data de lançamento: ${show.first_air_date}`;

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(releaseDate);
        card.appendChild(image);
        card.appendChild(content);
        container.appendChild(card);
    });
}

// Função de pesquisa para séries
function searchTVShow() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredShows = allTVShows.filter(show => show.name.toLowerCase().includes(searchInput));
    displayMarvelTVShows(filteredShows);
}

// Carrega as séries ao abrir a página
window.onload = function() {
    document.getElementById('search-button').addEventListener('click', searchTVShow);
    loadMarvelTVShows();
};
