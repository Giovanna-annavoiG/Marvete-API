// Armazena todos os filmes carregados
let allMovies = []; 

// Função para carregar filmes da API
function loadMovies() {
    const publicKey = 'ce2bc582fda4a4ae822d5c5c7b56e6c7'; // Sua chave pública
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${publicKey}&sort_by=release_date.desc&with_companies=420`; // 420 é a id da Marvel Studios
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            allMovies = data.results; // Armazena todos os filmes
            displayMovies(allMovies); // Exibe todos os filmes inicialmente
        })
        .catch(error => console.error('Erro ao carregar filmes:', error));
}
// id da produtora Marvel Studios (que é 420)
// Função para exibir filmes na página
function displayMovies(movies) {
    const container = document.getElementById('movie-container');
    container.innerHTML = ''; // Limpa o container antes de adicionar novos filmes

    movies.forEach(movie => {
        // Cria um card baseado na estrutura HTML existente
        const card = document.createElement('div');
        card.classList.add('movie-card');

        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        image.alt = movie.title; // Adiciona texto alternativo
        image.classList.add('movie-card-image');

        const content = document.createElement('div');
        content.classList.add('movie-card-content');

        const title = document.createElement('h3');
        title.classList.add('movie-card-title');
        title.textContent = movie.title;

        const releaseDate = document.createElement('p');
        releaseDate.classList.add('movie-card-release');
        releaseDate.textContent = `Data de Lançamento: ${movie.release_date}`;

        // Monta o card
        content.appendChild(title);
        content.appendChild(releaseDate);
        card.appendChild(image);
        card.appendChild(content);
        container.appendChild(card);
    });
}

// Função para pesquisar filmes
function searchMovie() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(searchInput));
    displayMovies(filteredMovies);
}



// Adiciona eventos no carregamento da janela
window.onload = function() {
    document.getElementById('search-button').addEventListener('click', searchMovie);
    loadMovies();
};

