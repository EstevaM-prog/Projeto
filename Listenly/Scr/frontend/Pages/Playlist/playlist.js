document.addEventListener('DOMContentLoaded', () => {
            // --- TEMA ---
            const themeBtn = document.getElementById('theme-toggle-sidebar');
            const themeIcon = themeBtn.querySelector('i');
            const themeText = themeBtn.querySelector('.link-text');
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeUI(savedTheme);

            themeBtn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
                updateThemeUI(next);
            });

            function updateThemeUI(theme) {
                if(theme === 'light') {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                    themeText.textContent = 'Modo Claro';
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                    themeText.textContent = 'Modo Escuro';
                }
            }

            // --- SIDEBAR COLAPSÁVEL ---
            const sidebar = document.getElementById('sidebar');
            const collapseBtn = document.getElementById('sidebar-collapse-btn');
            const collapseIcon = collapseBtn.querySelector('i');

            collapseBtn.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                if (sidebar.classList.contains('collapsed')) {
                    collapseIcon.classList.replace('fa-chevron-left', 'fa-chevron-right');
                } else {
                    collapseIcon.classList.replace('fa-chevron-right', 'fa-chevron-left');
                }
            });

            // --- FUNCIONALIDADE: CRIAR PLAYLIST ---
            const createPlaylistBtn = document.getElementById('create-playlist-btn');
            const playlistContainer = document.querySelector('.nav-playlists');

            createPlaylistBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const playlistName = prompt("Digite o nome da sua nova playlist:");
                
                if (playlistName && playlistName.trim() !== "") {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <a href="#" title="${playlistName}">
                            <div class="playlist-icon-box"><i class="fas fa-music"></i></div> 
                            <span class="link-text fade-in">${playlistName}</span>
                        </a>
                    `;
                    // Adiciona antes do botão de criar playlist, mas como exemplo vamos adicionar ao final
                    playlistContainer.appendChild(li);
                    alert(`Playlist "${playlistName}" criada com sucesso!`);
                }
            });

            // --- FUNCIONALIDADE: MÚSICAS CURTIDAS ---
            const likedSongsBtn = document.getElementById('liked-songs-btn');
            const playlistHeaderTitle = document.querySelector('#playlist-title');
            const playlistCover = document.querySelector('.playlist-cover');
            const playlistDesc = document.querySelector('.playlist-description');

            likedSongsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Simula navegação mudando o conteúdo visualmente
                playlistHeaderTitle.textContent = "Músicas Curtidas";
                playlistDesc.textContent = "Todas as músicas que você amou em um só lugar.";
                
                // Altera a capa para uma cor sólida ou imagem específica (exemplo)
                playlistCover.src = "https://misc.scdn.co/liked-songs/liked-songs-300.png"; // Imagem de exemplo do Spotify
                playlistCover.onerror = function() {
                     // Fallback se a imagem externa falhar
                    this.style.backgroundColor = "#450af5";
                    this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E";
                    this.style.padding = "50px";
                };
                
                // Remove classe active de todos os links e adiciona neste
                document.querySelectorAll('.nav-links a, .nav-playlists a').forEach(a => a.classList.remove('active'));
                likedSongsBtn.classList.add('active');
            });


            // --- FUNCIONALIDADE: MENU DROPDOWN (...) ---
            const moreOptionsBtn = document.getElementById('more-options-btn');
            const dropdown = document.getElementById('options-dropdown');

            // Toggle dropdown
            moreOptionsBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede que o clique feche imediatamente
                dropdown.classList.toggle('show');
            });

            // Fechar dropdown ao clicar fora
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target) && !moreOptionsBtn.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });
            
            // Ação dos itens do dropdown (simulação)
            dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', () => {
                    console.log('Opção selecionada:', item.textContent.trim());
                    dropdown.classList.remove('show');
                });
            });


            // --- BOTÃO DE LIKE NAS FAIXAS ---
            const mainLikeBtn = document.querySelector('.playlist-controls .btn-icon[title="Salvar na Biblioteca"]');
            if(mainLikeBtn) {
                mainLikeBtn.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    if(icon.classList.contains('far')) {
                        icon.classList.replace('far', 'fas');
                        icon.style.color = '#1db954';
                        this.classList.add('liked');
                    } else {
                        icon.classList.replace('fas', 'far');
                        icon.style.color = '';
                        this.classList.remove('liked');
                    }
                });
            }
        });