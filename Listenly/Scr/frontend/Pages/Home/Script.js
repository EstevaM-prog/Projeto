// ======================================================
// SCRIPT PRINCIPAL DO LISTENLY 🎵
// Funções: Pesquisa, Carrossel de Artistas/Álbuns e Player de Música
// ======================================================

// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // ELEMENTOS DO CAMPO DE PESQUISA (TOP BAR)
    // =====================================
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.getElementById('btn-search'); // (não usado, mas reservado)
    const searchBar = document.querySelector('.search-bar');
    const resultsDropdown = document.querySelector('.search-results-dropdown');

    // =====================================
    // ARRAYS DE DADOS: ARTISTAS E ÁLBUNS
    // =====================================

    // Lista de artistas com nome e caminho da imagem
    const artists = [
        { name: 'Alee', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_alee.jpg' },
        { name: 'Kyan', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_kyan.jpg' },
        { name: 'Leal', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_leal.jpg' },
        { name: 'Sabotage', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_sabotage.jpg' },
        { name: 'SD9', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_sd9.jpg' },
        { name: 'Teto', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_teto.jpg' },
        { name: 'Travis Scott', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_travis.jpg' },
        { name: 'Tyler', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_tyler.jpg' },
        { name: 'Veigh', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_veigh.jpg' },
        { name: 'Yago', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/profile_yago.jpg' }
    ];

    // Lista de álbuns com nome e capa
    const albums = [
        { name: '505', image: '/Listenly/Scr/frontend/Pages/Img/Album/artic_monkeys.jpg' },
        { name: 'BAILE', image: '/Listenly/Scr/frontend/Pages/Img/Album/baile.jpg' },
        { name: 'Mina de Condominio', image: '/Listenly/Scr/frontend/Pages/Img/Album/seu_jorge.jpg' },
        { name: 'PRIDE.', image: '/Listenly/Scr/frontend/Pages/Img/Album/damn.jpg' },
        { name: 'No Piscar dos Olhos', image: '/Listenly/Scr/frontend/Pages/Img/Album/febem.jpg' },
        { name: 'Feel Good Inc.', image: '/Listenly/Scr/frontend/Pages/Img/Album/gorilaz.jpg' },
        { name: 'See You Again', image: '/Listenly/Scr/frontend/Pages/Img/Album/tyler.jpg' },
        { name: 'Sorri, Sou Rei', image: '/Listenly/Scr/frontend/Pages/Img/Album/natiruts.jpg' },
        { name: 'Sobrevivendo no Inferno', image: '/Listenly/Scr/frontend/Pages/Img/Album/racionais.jpg' },
        { name: 'Nada Como um Dia', image: '/Listenly/Scr/frontend/Pages/Img/Album/racionais_2.jpg' }
    ];

    // =====================================
    // FUNÇÃO: MOSTRAR RESULTADOS DE PESQUISA
    // =====================================
    function displayResults(results) {
        // Limpa o conteúdo anterior
        resultsDropdown.innerHTML = '';

        // Se não houver resultados, esconde o menu
        if (results.length === 0) {
            resultsDropdown.style.display = 'none';
            return;
        }

        // Cria dinamicamente cada resultado encontrado
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <img src="${result.image}" alt="${result.name}">
                <h4>${result.name}</h4>
            `;

            // Quando clicar em um resultado, preenche o campo e fecha o dropdown
            resultItem.addEventListener('click', () => {
                searchInput.value = result.name;
                resultsDropdown.style.display = 'none';
            });

            // Adiciona o resultado na lista
            resultsDropdown.appendChild(resultItem);
        });

        // Exibe o menu suspenso
        resultsDropdown.style.display = 'block';
    }

    // =====================================
    // FUNÇÃO: PESQUISAR ARTISTAS E ÁLBUNS
    // =====================================
    function search() {
        const query = searchInput.value.toLowerCase(); // Normaliza o texto digitado

        if (query) {
            const results = [];

            // Busca nos artistas
            artists.forEach(artist => {
                if (artist.name.toLowerCase().includes(query)) {
                    results.push({ ...artist, type: 'artist' });
                }
            });

            // Busca nos álbuns
            albums.forEach(album => {
                if (album.name.toLowerCase().includes(query)) {
                    results.push({ ...album, type: 'album' });
                }
            });

            displayResults(results);
        } else {
            resultsDropdown.style.display = 'none';
        }
    }

    // Executa a busca conforme o usuário digita
    searchInput.addEventListener('keyup', search);

    // Fecha o dropdown ao clicar fora da barra de pesquisa
    document.addEventListener('click', (event) => {
        if (!searchBar.contains(event.target)) {
            searchInput.value = '';
            resultsDropdown.style.display = 'none';
        }
    });

    // =====================================
    // FUNÇÃO: CONFIGURAÇÃO DO CARROSSEL
    // =====================================
    function setupCarousel(carouselContainer) {
        const grid = carouselContainer.querySelector('.artist-grid, .albums-grid');
        const prevButton = carouselContainer.querySelector('.carousel-button.prev');
        const nextButton = carouselContainer.querySelector('.carousel-button.next');
        const scrollAmount = 300; // Distância de rolagem por clique
        let isScrolling = false;

        // Evita erro caso algum elemento esteja ausente
        if (!grid || !prevButton || !nextButton) return;

        // Duplicação dos itens para efeito de rolagem infinita
        const items = Array.from(grid.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            grid.appendChild(clone);
        });

        // Função que reposiciona o scroll quando chega ao final
        function handleScroll() {
            if (grid.scrollLeft >= grid.scrollWidth / 2) {
                grid.scrollLeft = 0;
            }
        }

        // Controle de rolagem suave (usado internamente)
        function scroll(direction) {
            if (isScrolling) return;
            isScrolling = true;

            const start = grid.scrollLeft;
            const end = start + direction * scrollAmount;

            grid.scrollTo({
                left: end,
                behavior: 'smooth'
            });

            setTimeout(() => {
                if (grid.scrollLeft >= grid.scrollWidth / 2) {
                    grid.scrollLeft = grid.scrollLeft - (grid.scrollWidth / 2);
                } else if (grid.scrollLeft === 0 && direction === -1) {
                    grid.scrollLeft = grid.scrollWidth / 2;
                }
                isScrolling = false;
            }, 500);
        }

        // Botão anterior (rola para a esquerda)
        prevButton.addEventListener('click', () => {
            if (grid.scrollLeft === 0) {
                grid.scrollLeft = grid.scrollWidth / 2;
            }
            grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        // Botão próximo (rola para a direita)
        nextButton.addEventListener('click', () => {
            grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Verifica o limite da rolagem e reinicia quando chega ao fim
        grid.addEventListener('scroll', () => {
            if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth) {
                grid.scrollLeft = 0;
            }
        });
    }

    // Ativa o carrossel para todos os containers existentes
    document.querySelectorAll('.carousel-container').forEach(setupCarousel);
});


// ======================================================
// PLAYER DE MÚSICA 🎧
// ======================================================

// Lista de músicas disponíveis no player
const playlist = [
    { title: '505', artist: 'Arctic Monkeys', file: '../Playlist/musica1.mp3', cover: '../Img/Album/artic_monkeys.jpg' },
    { title: 'BAILE', artist: 'SD9', file: '../Playlist/musica2.mp3', cover: '../Img/Album/baile.jpg' },
    { title: 'See You Again', artist: 'Tyler', file: '../Playlist/musica3.mp3', cover: '../Img/Album/tyler.jpg' }
];

// Índice da música atual
let currentIndex = 0;

// Seleciona elementos do player
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const cover = document.getElementById('player-cover');
const title = document.getElementById('player-title');
const artist = document.getElementById('player-artist');

// =====================================
// FUNÇÃO: CARREGAR MÚSICA PELO ÍNDICE
// =====================================
function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.file;      // Caminho do arquivo MP3
    cover.src = track.cover;     // Atualiza capa
    title.textContent = track.title;  // Atualiza título
    artist.textContent = track.artist; // Atualiza artista
    progress.value = 0;          // Reseta barra de progresso
}
loadTrack(currentIndex); // Carrega a primeira música ao iniciar

// =====================================
// BOTÃO DE PLAY / PAUSE
// =====================================
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    }
});

// =====================================
// BOTÃO "PRÓXIMA" MÚSICA
// =====================================
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % playlist.length; // Vai para o próximo índice
    loadTrack(currentIndex);
    audio.play();
    playBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
});

// =====================================
// BOTÃO "ANTERIOR" MÚSICA
// =====================================
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentIndex);
    audio.play();
    playBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
});

// =====================================
// ATUALIZA BARRA DE PROGRESSO EM TEMPO REAL
// =====================================
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

// =====================================
// PERMITE ALTERAR O PONTO DA MÚSICA MANUALMENTE
// =====================================
progress.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});
