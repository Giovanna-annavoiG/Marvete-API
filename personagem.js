// Armazena todos os heróis carregados
let allHeroes = []; 

// Função para carregar heróis da API
function loadHeroes() {
    const limit = 50;
    const publicKey = '00c82e3cb538f877e08b108e9ace0409'; // Sua chave pública
    const ts = 1730656564; // Timestamp fixo usado para gerar o hash
    const hash = 'e8646cc8cf798d0034c3808f49a20776'; // Hash gerado com o timestamp, chave privada e chave pública
    const url = `https://gateway.marvel.com/v1/public/characters?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            allHeroes = data.data.results; // Armazena todos os heróis
            displayCharacters(allHeroes); // Exibe todos os heróis inicialmente
        })
        .catch(error => console.error('Erro ao carregar heróis:', error));
}

// Função para exibir personagens na página
function displayCharacters(characters) {
    const container = document.getElementById('hero-container');
    container.innerHTML = ''; // Limpa o container antes de adicionar novos personagens

    characters.forEach(character => {
        // Cria um card baseado na estrutura HTML existente
        const card = document.createElement('div');
        card.classList.add('hero-card');

        const image = document.createElement('img');
        image.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        image.alt = character.name; // Adiciona texto alternativo
        image.classList.add('hero-card-image');

        const content = document.createElement('div');
        content.classList.add('hero-card-content');

        const title = document.createElement('h3');
        title.classList.add('hero-card-title');
        title.textContent = character.name;

        const id = document.createElement('p');
        id.classList.add('hero-card-id');
        id.textContent = `ID: ${character.id}`;

        const description = document.createElement('p');
        description.classList.add('hero-card-description');
        description.textContent = `Descrição breve do herói.`; // Você pode ajustar isso se tiver uma descrição

        // Monta o card
        content.appendChild(title);
        content.appendChild(id);
        content.appendChild(description);
        card.appendChild(image);
        card.appendChild(content);
        container.appendChild(card);
    });
}

// Função para pesquisar heróis
function searchHero() {
    const searchInput = document.getElementById('search-input').value.toLowerCase(); // Obtém o texto da pesquisa
    const filteredHeroes = allHeroes.filter(hero => hero.name.toLowerCase().includes(searchInput)); // Filtra heróis
    displayCharacters(filteredHeroes); // Exibe os heróis filtrados
}

// Adiciona eventos no carregamento da janela
window.onload = function() {
    document.getElementById('search-button').addEventListener('click', searchHero);
    
    // Carrega todos os heróis pela primeira vez
    loadHeroes(); // Certifique-se de que essa linha está depois da definição da função
};