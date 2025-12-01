


// ======================================================
// SCRIPT PRINCIPAL DO LISTENLY 🎵
// Funções: Pesquisa, Carrossel de Artistas/Álbuns e Player de Música
// ======================================================

document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // ELEMENTOS DO CAMPO DE PESQUISA (TOP BAR)
    // =====================================
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.getElementById('btn-search');
    const searchBar = document.querySelector('.search-bar');
    const resultsDropdown = document.querySelector('.search-results-dropdown');

    // =====================================
    // ARRAYS DE DADOS: ARTISTAS E ÁLBUNS
    // =====================================
    const artists = [
        { name: 'Alee', image: '../Img/Artistas/profile_alee.jpg' },
        { name: 'Kyan', image: ',,/Img/Artistas/profile_kyan.jpg' },
        { name: 'Leal', image: '../Img/Artistas/profile_leal.jpg' },
        { name: 'Sabotage', image: '../Img/Artistas/profile_sabotage.jpg' },
        { name: 'SD9', image: '../Img/Artistas/profile_sd9.jpg' },
        { name: 'Teto', image: '../Img/Artistas/profile_teto.jpg' },
        { name: 'Travis Scott', image: '../Img/Artistas/profile_travis.jpg' },
        { name: 'Tyler', image: '../Img/Artistas/profile_tyler.jpg' },
        { name: 'Veigh', image: '../Img/Artistas/profile_veigh.jpg' },
        { name: 'Yago', image: '../Img/Artistas/profile_yago.jpg' }
    ];

    const albums = [
        { name: '505', image: '../Img/Album/artic_monkeys.jpg' },
        { name: 'BAILE', image: '../Img/Album/baile.jpg' },
        { name: 'Mina de Condominio', image: '../Img/Album/seu_jorge.jpg' },
        { name: 'PRIDE.', image: '../Img/Album/damn.jpg' },
        { name: 'No Piscar dos Olhos', image: '../Img/Album/febem.jpg' },
        { name: 'Feel Good Inc.', image: '../Img/Album/gorilaz.jpg' },
        { name: 'See You Again', image: '../Img/Album/tyler.jpg' },
        { name: 'Sorri, Sou Rei', image: '../Img/Album/natiruts.jpg' },
        { name: 'Sobrevivendo no Inferno', image: '../Img/Album/racionais.jpg' },
        { name: 'Nada Como um Dia', image: '../Img/Album/racionais_2.jpg' }
    ];

    // =====================================
    // FUNÇÃO: MOSTRAR RESULTADOS DE PESQUISA
    // =====================================
    function displayResults(results) {
        resultsDropdown.innerHTML = '';
        if (results.length === 0) {
            resultsDropdown.style.display = 'none';
            return;
        }
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <img src="${result.image}" alt="${result.name}">
                <h4>${result.name}</h4>
            `;
            resultItem.addEventListener('click', () => {
                searchInput.value = result.name;
                resultsDropdown.style.display = 'none';
            });
            resultsDropdown.appendChild(resultItem);
        });
        resultsDropdown.style.display = 'block';
    }

    // =====================================
    // FUNÇÃO: PESQUISAR ARTISTAS E ÁLBUNS
    // =====================================
    function search() {
        const query = searchInput.value.toLowerCase();
        if (query) {
            const results = [];
            artists.forEach(artist => {
                if (artist.name.toLowerCase().includes(query)) {
                    results.push({ ...artist, type: 'artist' });
                }
            });
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

    searchInput.addEventListener('keyup', search);
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
        const scrollAmount = 300;
        if (!grid || !prevButton || !nextButton) return;
        const items = Array.from(grid.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            grid.appendChild(clone);
        });
        prevButton.addEventListener('click', () => {
            if (grid.scrollLeft === 0) grid.scrollLeft = grid.scrollWidth / 2;
            grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        nextButton.addEventListener('click', () => {
            grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        grid.addEventListener('scroll', () => {
            if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth) grid.scrollLeft = 0;
        });
    }
    document.querySelectorAll('.carousel-container').forEach(setupCarousel);
});



// ======================================================
// PLAYER DE MÚSICA 🎧
// ======================================================

// Lista de músicas disponíveis no player
const playlist = [
    {
        title: "505",
        artist: "Arctic Monkeys",
        file: "./Audio/505.mp3",
        cover: "../Img/Album/artic_monkeys.jpg"
    },
    {
        title: 'BAILE',
        artist: 'Baile', // Extraído do alt="Baile"
        file: './Audio/BAILE.mp3',
        cover: '../Img/Album/baile.jpg'
    },
    {
        title: 'Mina de Condomínio',
        artist: 'Seu Jorge',
        file: './Audio/Mina de Condomínio.mp3',
        cover: '../Img/Album/seu_jorge.jpg'
    },
    {
        title: 'PRIDE.',
        artist: 'Kendrick Lamar', // Extraído do alt="Kendrick Lamar - Damn"
        file: './Audio/PRIDE..mp3',
        cover: '../Img/Album/damn.jpg'
    },
    {
        title: 'No Piscar dos Olhos',
        artist: 'Febem',
        file: './Audio/No Piscar dos Olhos.mp3',
        cover: '../Img/Album/febem.jpg'
    },
    {
        title: 'Feel Good Inc.',
        artist: 'Gorillaz',
        file: './Audio/Feel Good Inc..mp3',
        cover: '../Img/Album/gorilaz.jpg'
    },
    {
        title: 'See You Again',
        artist: 'Tyler, The Creator',
        file: './Audio/See You Again.mp3',
        cover: '../Img/Album/tyler.jpg'
    },
    {
        title: 'Sorri, Sou Rei',
        artist: 'Natiruts',
        file: './Audio/Sorri, Sou Rei.mp3',
        cover: '../Img/Album/natiruts.jpg'
    },
    {
        title: 'Sobrevivendo no Inferno',
        artist: "Racionais MC's",
        file: './Audio/Sobrevivendo no Inferno.mp3',
        cover: '../Img/Album/racionais.jpg'
    },
    {
        title: 'Nada Como um Dia',
        artist: "Racionais MC's",
        file: './Audio/Nada Como um Dia.mp3',
        cover: '../Img/Album/racionais_2.jpg'
    }
];

// Índice da música atual
let currentIndex = 0;
let isPlaying = false; // controla o estado atual

// Seleciona elementos do player
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
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
    audio.src = track.file;
    cover.src = track.cover;
    title.textContent = track.title;
    artist.textContent = track.artist;
    progress.value = 0;
    resetPlayButton(); // sempre mostra "play" ao carregar nova faixa
}

// codigo adicionado para teste de musica baixada
playlist.length = 0; // limpa a lista anterior, se existir
playlist.push(
    {
        title: "505",
        artist: "Arctic Monkeys",
        file: "./Audio/505.mp3",
        cover: "../Img/Album/artic_monkeys.jpg"
    },
    {
        title: 'BAILE',
        artist: 'Baile', // Extraído do alt="Baile"
        file: './Audio/BAILE.mp3',
        cover: '../Img/Album/baile.jpg'
    },
    {
        title: 'Mina de Condomínio',
        artist: 'Seu Jorge',
        file: './Audio/Mina de Condomínio.mp3',
        cover: '../Img/Album/seu_jorge.jpg'
    },
    {
        title: 'PRIDE.',
        artist: 'Kendrick Lamar', // Extraído do alt="Kendrick Lamar - Damn"
        file: './Audio/PRIDE..mp3',
        cover: '../Img/Album/damn.jpg'
    },
    {
        title: 'No Piscar dos Olhos',
        artist: 'Febem',
        file: './Audio/No Piscar dos Olhos.mp3',
        cover: '../Img/Album/febem.jpg'
    },
    {
        title: 'Feel Good Inc.',
        artist: 'Gorillaz',
        file: './Audio/Feel Good Inc..mp3',
        cover: '../Img/Album/gorilaz.jpg'
    },
    {
        title: 'See You Again',
        artist: 'Tyler, The Creator',
        file: './Audio/See You Again.mp3',
        cover: '../Img/Album/tyler.jpg'
    },
    {
        title: 'Sorri, Sou Rei',
        artist: 'Natiruts',
        file: './Audio/Sorri, Sou Rei.mp3',
        cover: '../Img/Album/natiruts.jpg'
    },
    {
        title: 'Sobrevivendo no Inferno',
        artist: "Racionais MC's",
        file: './Audio/Sobrevivendo no Inferno.mp3',
        cover: '../Img/Album/racionais.jpg'
    },
    {
        title: 'Nada Como um Dia',
        artist: "Racionais MC's",
        file: './Audio/Nada Como um Dia.mp3',
        cover: '../Img/Album/racionais_2.jpg'
    }
);


// =====================================
// FUNÇÃO: ALTERAR ÍCONE DO BOTÃO
// =====================================
function updatePlayButton() {
    playBtn.innerHTML = isPlaying
        ? '<i class="bi bi-pause-circle-fill"></i>'
        : '<i class="bi bi-play-circle-fill"></i>';
}

// =====================================
// FUNÇÃO: REINICIAR ESTADO DO BOTÃO
// =====================================
function resetPlayButton() {
    isPlaying = false;
    updatePlayButton();
}

// =====================================
// CONTROLE DE PLAY / PAUSE
// =====================================
// 1. Seleciona os elementos do HTML
// =====================================
// CONTROLE DE PLAY / PAUSE 🔊
// =====================================
playBtn.addEventListener('click', () => {
    if (audio.src === '') loadTrack(currentIndex);

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

// Atualiza o botão automaticamente conforme o estado do áudio
audio.addEventListener('play', () => {
    isPlaying = true;
    updatePlayButton();
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayButton();
});

audio.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayButton();
});

// =====================================
// BOTÃO "PRÓXIMA" MÚSICA
// =====================================
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadTrack(currentIndex);
    audio.play();
    isPlaying = true;
    updatePlayButton();
});

// =====================================
// BOTÃO "ANTERIOR" MÚSICA
// =====================================
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentIndex);
    audio.play();
    isPlaying = true;
    updatePlayButton();
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

// =====================================
// RESETA BOTÃO QUANDO A MÚSICA TERMINA
// =====================================
audio.addEventListener('ended', () => {
    resetPlayButton();
});

// =====================================
// CARREGA PRIMEIRA FAIXA AO INICIAR
// =====================================
loadTrack(currentIndex);
updatePlayButton();


// ======================================================
// USUÁRIO
// ======================================================
async function mostrarNomeUsuario() {
    const elementoMensagem = document.getElementById("mensagem");
    if (!elementoMensagem) {
        console.error("Elemento com id 'mensagem' não encontrado.");
        return;
    }

    const userId = localStorage.getItem("user_id");
    const apiRoute = `http://localhost:5000/v1/users/${userId}`;

    try {
        const resposta = await fetch(apiRoute, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const userData = await resposta.json();

        console.log(userData)

        const nome = userData?.nome?.trim();
        elementoMensagem.textContent = nome
            ? `Olá, ${nome}!`
            : "Olá, visitante!";
    } catch (erro) {
        console.error("Erro ao buscar usuário:", erro);
        elementoMensagem.textContent = "Erro ao carregar usuário 😢";
    }
}

document.addEventListener("DOMContentLoaded", mostrarNomeUsuario);

// ======================================================
// CLIQUE EM ÁLBUM ATUALIZA PLAYER
// ======================================================
(function () {
    function renderAlbums() {
        const albumsContainer = document.querySelector('.albums-grid');
        if (!albumsContainer) return;
        albumsContainer.innerHTML = ''; // limpa a grid antes de renderizar

        playlist.forEach(music => {
            const albumItem = document.createElement('div');
            albumItem.classList.add('album-item');
            albumItem.dataset.artist = music.artist;
            albumItem.dataset.audio = music.file;

            albumItem.innerHTML = `
                <img src="${music.cover}" alt="${music.artist}">
                <h4>${music.title}</h4>
            `;

            albumsContainer.appendChild(albumItem);
        });
    }

    function initClickToPlayer() {
        const albumsGrid = document.querySelectorAll('.albums-grid');
        if (!albumsGrid.length) return;

        const playerCoverImg = document.querySelector('.player-left img');
        const playerSong = document.querySelector('.song') || document.querySelector('#player-title');
        const playerArtist = document.querySelector('.artist') || document.querySelector('#player-artist');
        const audioEl = document.getElementById('audio');

        function updatePlayer({ imgSrc, title, artist, audioSrc }) {
            if (imgSrc && playerCoverImg) playerCoverImg.src = imgSrc;
            if (title && playerSong) playerSong.textContent = title;
            if (artist && playerArtist) playerArtist.textContent = artist;

            if (audioEl && audioSrc) {
                audioEl.pause();
                audioEl.src = audioSrc;
                audioEl.load();
                audioEl.play().catch(() => { });
            }
        }

        albumsGrid.forEach(grid => {
            grid.addEventListener('click', (ev) => {
                const item = ev.target.closest('.album-item');
                if (!item) return;

                const img = item.querySelector('img');
                const titleEl = item.querySelector('h4');
                const imgSrc = img?.src;
                const title = titleEl?.textContent.trim();
                const artist = item.dataset.artist || img?.alt || '';
                const audioSrc = item.dataset.audio || img?.dataset.audio || '';

                updatePlayer({ imgSrc, title, artist, audioSrc });

                document.querySelectorAll('.album-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    // Executa tudo quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            renderAlbums();
            initClickToPlayer();
        });
    } else {
        renderAlbums();
        initClickToPlayer();
    }
})();


// =====================================
// CONTROLE DE VOLUME 🎚️
// =====================================
const volumeControl = document.getElementById('volume-control');
const volumeIcon = document.getElementById('volume-icon');

// Atualiza volume quando o usuário move o slider
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
    if (audio.volume === 0) {
        volumeIcon.className = 'bi bi-volume-mute-fill';
    } else if (audio.volume < 0.5) {
        volumeIcon.className = 'bi bi-volume-down-fill';
    } else {
        volumeIcon.className = 'bi bi-volume-up-fill';
    }
});

// Muta/desmuta ao clicar no ícone
let lastVolume = 1;
volumeIcon.addEventListener('click', () => {
    if (audio.volume > 0) {
        lastVolume = audio.volume;
        audio.volume = 0;
        volumeControl.value = 0;
        volumeIcon.className = 'bi bi-volume-mute-fill';
    } else {
        audio.volume = lastVolume;
        volumeControl.value = lastVolume;
        if (lastVolume < 0.5) {
            volumeIcon.className = 'bi bi-volume-down-fill';
        } else {
            volumeIcon.className = 'bi bi-volume-up-fill';
        }
    }
});