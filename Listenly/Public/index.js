// Search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.getElementById('btn-search');
    const searchBar = document.querySelector('.search-bar');
    const resultsDropdown = document.querySelector('.search-results-dropdown');

// Array dos Aristas (Nome, Imagem)
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

// Array dos Albums (Nome, Imagem)
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

//Function de Resultado
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

// Function de Pesquisa
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

// Function de Carrosel das imagens (Aristas / Album)
    function setupCarousel(carouselContainer) {
        const grid = carouselContainer.querySelector('.artist-grid, .albums-grid');
        const prevButton = carouselContainer.querySelector('.carousel-button.prev');
        const nextButton = carouselContainer.querySelector('.carousel-button.next');
        const scrollAmount = 300;
        let isScrolling = false;

        if (!grid || !prevButton || !nextButton) return;

        const items = Array.from(grid.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            grid.appendChild(clone);
        });

        function handleScroll() {
            if (grid.scrollLeft >= grid.scrollWidth / 2) {
                grid.scrollLeft = 0;
            }
        }

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

        prevButton.addEventListener('click', () => {
            if (grid.scrollLeft === 0) {
                grid.scrollLeft = grid.scrollWidth / 2;
            }
            grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        grid.addEventListener('scroll', () => {
            if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth) {
                grid.scrollLeft = 0;
            }
        });
    }

    document.querySelectorAll('.carousel-container').forEach(setupCarousel);
});
