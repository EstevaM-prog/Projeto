/*

document.addEventListener('DOMContentLoaded', () => {
    
    // Const ( Name e Foto do artista)
    const artistsData = [
        { name: '', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
        { name: '#', image: '/Listenly/Scr/frontend/Pages/Img/Artistas/'},
    ];

    // Const ( Name, Arista, Imagem do album)
    const albumsData = [
        { name: 'test', artist: 'teste', Image: '/Listenly/Src/frontend/Pages/Img/bg_light.jpg' },
        
        { name: 'Arctic Monkeys', artist: 'Arctic Monkeys', image: '/Listenly/Src/frontend/Pages/Img/Album/artic_monkeys.jpg' },
        { name: 'Baile', artist: 'Fdn', image: '/Listenly/Src/frontend/Pages/Img/Album/baile.jpg' },
        { name: 'Eu não sou santo não', artist: 'Bezerra da Silva', image: '/Listenly/Src/frontend/Pages/Img/Album/bezerra.jpg' },
        { name: 'Damn', artist: '#', Image: '/Listenly/Src/frontend/Pages/Img/Album/damn.jpg' },
        { name: 'Febem', artist: '#', image: '/Listenly/Src/frontend/Pages/Img/Album/febem.jpg' },
        { name: 'Gorillaz', artist: '#', image: '/Listenly/Src/frontend/Pages/Img/Album/gorilaz.jpg' },
        { name: 'Kenner', artist: 'Fdn', image: '/Listenly/Src/frontend/Pages/Img/Album/kenner.jpg' },
        { name: 'Natiruts', artist: '#', image: '/Listenly/Src/frontend/Pages/Img/Album/natiruts.jpg' },
        { name: 'Racionais', artist: '#', image: '/Listenly/Src/frontend/Pages/Img/Album/racionais.jpg' },
        { name: 'Seu Jorge America Brasil', artist: 'Seu Jorge', image: '/Listenly/Src/frontend/Pages/Img/Album/seu_jorge.jpg' },
        { name: 'Trilha Sonora do Gueto', artist: '#', image: '/Listenly/Src/frontend/Pages/Img/Album/tsg.jpg' },
        { name: 'Perfect', artist: 'Tyler, the Creator', image: '/Listenly/Src/frontend/Pages/Img/Album/tyler.jpg' },
        { name: 'Yago', artist: 'Yago o próprio', image: '/Listenly/Src/frontend/Pages/Img/Album/yago.jpg' },
        { name: 'Racionais 2', artist: '#', image: '/Listenly/Src/frontend/Pages/Img/Album/racionais_2.jpg' }
    ];


    // const do grid de imagens (Artistas / Albuns)
    const artistGrid = document.querySelector('.artist-grid')
    const albumsGrid = document.querySelector('.albums-grid')


    // criando div com forEach
    artistsData.forEach( artist => {
        const artistCard = document.createElement('div')
        artistCard.classList.add('artist-card')

        // Inserindo as coias dentro da div
        artistCard.innerHTML = `
            <img scr=${artist.image} alt=imagem do ${artist.name}>
            <div>
                <h3>${artist.name}</h3>
                <p>artista</p>
            </div>
        `

        artistGrid.appendChild(artistCard)
    })

    // criando div com forEach
    albumsData.forEach(album => {
        const albumCard = document.createElement('div')
        albumCard.classList.add('album-card')

        // Inserindo as coias dentro da div
        albumCard.innerHTML = `
            <img src="${album.image}" alt="imagem do ${album.name}">
            <div>
                <h3>${album.name}</h3>
                <p>${album.artist}</p>
            </div>
        `

        albumsGrid.appendChild(albumCard)
        })


})


// Função para verificar se o usuário está logado
function isLoggedIn() {
            const cookies = document.cookie.split(';');
            for (let c of cookies) {
                c = c.trim();
                if (c === "logado=true") {
                    return true;
                }
            }
            return false;
        }

        // Verifica o login e redireciona se necessário
        window.onload = function() {
            if (isLoggedIn()) {
                // Usuário logado → vai para home
                window.location.href = "home.html";
            } else {
                // Usuário não logado → permanece na index
                console.log("Usuário não logado. Permanece na index.html");
            }
        }

        */