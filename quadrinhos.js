let allComics = [];

// Função para carregar quadrinhos da API
function loadComics() {
    const limit = 50;
    const publicKey = '00c82e3cb538f877e08b108e9ace0409'; // Sua chave pública
    const ts = 1730656564; // Timestamp fixo usado para gerar o hash
    const hash = 'e8646cc8cf798d0034c3808f49a20776'; // Hash gerado com o timestamp, chave privada e chave pública
    const url = `https://gateway.marvel.com/v1/public/comics?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            allComics = data.data.results; // Armazena todos os heróis
            displayComics(allComics); // Exibe todos os heróis inicialmente
        })
        .catch(error => console.error('Erro ao carregar heróis:', error));

}

// Função para exibir quadrinhos na página
function displayComics(comics) {
    const comicContainer = document.getElementById('comic-container');
    comicContainer.innerHTML = ''; // Limpa o container antes de adicionar novos quadrinhos

    comics.forEach(comic => {
        const card = document.createElement('div');
        card.className = 'comic-card';

        const img = document.createElement('img');
        img.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`; // URL da imagem
        img.alt = comic.title; // Nome do quadrinho
        img.className = 'comic-card-image'; // Adiciona uma classe para o CSS
        card.appendChild(img);

        const title = document.createElement('h3');
        title.className = 'comic-card-title';
        title.textContent = comic.title; // Título do quadrinho
        card.appendChild(title);

        comicContainer.appendChild(card);
    });
}

// Função para pesquisar quadrinhos
function searchComic() {
    const searchInput = document.getElementById('search-input').value.toLowerCase(); // Obtém o texto da pesquisa
    const filteredComics = allComics.filter(comic => comic.title.toLowerCase().includes(searchInput)); // Filtra quadrinhos
    displayComics(filteredComics); // Exibe os quadrinhos filtrados
}

// Adiciona eventos no carregamento da janela
window.onload = function() {
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', searchComic);
    } else {
        console.error('Botão de pesquisa não encontrado!');
    }

    loadComics(); // Carrega todos os quadrinhos pela primeira vez
};