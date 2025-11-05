document.addEventListener("DOMContentLoaded", () => {
    // Escopo principal: Garante que o script só seja executado após o carregamento completo do DOM

    // Seleção dos elementos HTML principais (Note que playBtn e pauseBtn estão comentados aqui,
    // mas são usados e declarados novamente no escopo global abaixo, causando um problema de escopo).
    const audio = document.getElementById('audio');
    //const playBtn = document.getElementById('play'); 
    //const pauseBtn = document.getElementById('pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progress-bar');
    const timeElapsed = document.getElementById('time-elapsed');
    const timeDuration = document.getElementById('time-duration');
    const volumeSlider = document.getElementById('volume');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    // Coleta todos os cards de música na página
    const cards = Array.from(document.querySelectorAll('.card'));

    // Criação da Playlist
    let current = 0; // Inicializa o índice da música atual (começa na primeira)
    const playlist = cards.map((c, i) => ({
        // Mapeia os cards HTML para um array de objetos JavaScript (a playlist)
        // src: Pega a fonte do áudio do atributo data-src do card
        src: c.dataset.src || '', 
        // title: Pega o texto dentro do elemento .meta, ou usa um título genérico se não encontrar
        title: c.querySelector('.meta')?.textContent || `Track ${i + 1}`,
    }));

    // Repetição da playlist e carregamento da faixa
    function loadTrack(index) {
        // Lógica de loop: Se for para antes do início (index < 0), volta para a última música
        if (index < 0) index = playlist.length - 1; 
        // Lógica de loop: Se for além do final, volta para a primeira música
        if (index >= playlist.length) index = 0; 
        
        current = index; // Atualiza o índice da música atual
        const track = playlist[current]; // Pega o objeto da música da playlist
        
        // Extrai o título e artista do campo title, usando "—" como separador
        const [title, artist] = track.title.split('—').map(t => t?.trim());
        
        // Atualiza os elementos HTML do título e artista
        songTitle.textContent = title || 'Faixa';
        songArtist.textContent = artist || '';
        
        // Se a faixa tiver uma fonte (src), carrega o áudio
        if (track.src) {
            audio.src = track.src; // Define a URL do novo áudio
            audio.load(); // Pede ao navegador para carregar o áudio
        } else {
            // Se não houver fonte (música vazia), reseta o player
            audio.removeAttribute('src');
            progressBar.style.width = '0%';
            timeElapsed.textContent = '0:00';
            timeDuration.textContent = '0:00';
        }
    }

    /*
    // Função para alternar o ícone Play/Pause (Comentada no seu código original)
    function updatePlayButton() {
        playBtn.textContent = (audio.paused || !audio.src) ? '▶' : '❚❚';
    }
    */

    // Formata o tempo (converte segundos em formato M:SS)
    function formatTime(t) {
        // Retorna "0:00" se o valor não for válido
        if (!t || isNaN(t)) return '0:00'; 
        // Calcula os minutos (arredonda para baixo)
        const m = Math.floor(t / 60); 
        // Calcula os segundos restantes e garante que tenha dois dígitos (ex: 05)
        const s = Math.floor(t % 60).toString().padStart(2, '0'); 
        // Retorna a string formatada
        return `${m}:${s}`;
    }

    loadTrack(0); // Inicializa o player carregando a primeira faixa da playlist (índice 0)

    // Eventos (Listeners)
    
    // Ao clicar em um card da playlist
    cards.forEach((c, i) => c.addEventListener('click', () => {
        loadTrack(i); // Carrega a faixa correspondente ao card clicado
        if (audio.src) audio.play(); // Toca a música, se houver fonte
        updatePlayButton(); // Atualiza o ícone
    }));

    // Ação do botão Play (Problema de escopo: playBtn não está definido aqui, mas é usado em outras funções)
    /*
    playBtn.addEventListener('click', () => {
        if (!audio.src) return;
        audio.paused ? audio.play() : audio.pause();
        updatePlayButton();
    });
    */

    // Controle de Navegação Audio (Botões Próximo/Anterior)
    prevBtn.addEventListener('click', () => { loadTrack(current - 1); audio.play(); updatePlayButton(); });
    nextBtn.addEventListener('click', () => { loadTrack(current + 1); audio.play(); updatePlayButton(); });

    // Atualiza o ícone do Play/Pause quando o áudio começa a tocar ou é pausado
    audio.addEventListener('play', updatePlayButton);
    audio.addEventListener('pause', updatePlayButton);

    // Carrega e exibe a duração total da música quando os metadados são carregados
    audio.addEventListener('loadedmetadata', () => {
        timeDuration.textContent = formatTime(audio.duration);
    });

    // Atualiza a barra de progresso e o tempo decorrido em tempo real (várias vezes por segundo)
    audio.addEventListener('timeupdate', () => {
        // Calcula a porcentagem da música que já foi reproduzida
        const pct = (audio.currentTime / audio.duration) * 100 || 0; 
        progressBar.style.width = `${pct}%`; // Aplica a largura à barra de progresso
        timeElapsed.textContent = formatTime(audio.currentTime); // Atualiza o tempo decorrido
    });

    // Permite "pular" para uma parte da música ao clicar na barra de progresso
    progress.addEventListener('click', e => {
        if (!audio.src || !audio.duration) return;
        // Calcula a posição e largura da barra na tela
        const rect = progress.getBoundingClientRect(); 
        // Calcula a porcentagem onde o usuário clicou (posição do clique / largura total da barra)
        const pct = (e.clientX - rect.left) / rect.width; 
        // Define o tempo de reprodução (currentTime) para o ponto clicado
        audio.currentTime = pct * audio.duration; 
    });

    // Controle de Volume: Atualiza o volume do áudio quando o slider é movido
    // Nota: O volume deve ser um valor de 0.0 a 1.0. Se o slider for de 0 a 100, deve ser dividido por 100.
    volumeSlider.addEventListener('input', e => audio.volume = parseFloat(e.target.value)); 

    // O que acontece quando a música termina de tocar
    audio.addEventListener('ended', () => {
        loadTrack(current + 1); // Carrega a próxima faixa
        audio.play(); // Inicia a reprodução da próxima faixa
    });

    // Inicialização final do volume e do ícone de Play/Pause
    audio.volume = parseFloat(volumeSlider.value);
    updatePlayButton();
});


// =============================================================
// CÓDIGO FORA DO DOMContentLoaded (ESCOPO GLOBAL)
// =============================================================

// Simula um user logado By: Estevam
async function mostrarNomeUsuario() {
    const elementoMensagem = document.getElementById("mensagem");

    try {
        // Faz a requisição ao backend para obter dados do usuário
        const resposta = await fetch("/api/user");
        const userData = await resposta.json();

        if (userData && userData.username) {
            // Se o nome de usuário for encontrado, exibe a saudação
            elementoMensagem.textContent = `Olá, ${userData.username}!`;
        } else {
            elementoMensagem.textContent = "Olá, visitante!";
        }
    } catch (erro) {
        // Em caso de erro na requisição
        console.error("Erro ao buscar usuário:", erro);
        elementoMensagem.textContent = "Erro ao carregar usuário 😢";
    }
}

// Chama a função assim que a pagina carregar (executada imediatamente)
mostrarNomeUsuario();


// 03/09/25 Functions by: Estevam
// Function Play/Pause Music
// esta funcionando (Nota: Este bloco é um código de controle de Play/Pause duplicado e usa um ID diferente: statusMusic)
// 1. Selecione os elementos do HTML
const statusMusic = document.getElementById('statusMusic'); // Elemento de áudio duplicado
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');

// 2. Anexe o evento ao botão PLAY
playBtn.addEventListener('click', () => {
    console.log("Botão PLAY clicado");
    statusMusic.play(); // Toca o áudio do elemento duplicado
});

// 3. Anexe o evento ao botão PAUSE
pauseBtn.addEventListener('click', () => {
    console.log("Botão PAUSE clicado");
    statusMusic.pause(); // Pausa o áudio do elemento duplicado
});


// feacture volume da musica
// não esta funcionando (Nota: Este é um bloco de controle de volume duplicado, usando um ID audioPlayer que já foi definido dentro do DOMContentLoaded)
const audioPlayer = document.getElementById('audio');
const volumeSlider = document.getElementById('volume');

// TESTE DE SANIDADE: Verificar se os elementos foram encontrados
if (!audioPlayer) {
    console.error("ERRO FATAL: Elemento <audio id='audio'> não encontrado.");
}
if (!volumeSlider) {
    console.error("ERRO FATAL: Elemento <input id='volume'> não encontrado.");
}

// Se algum erro foi logado acima, o código não vai funcionar.
// Se não houver erros, a lógica abaixo deve funcionar:

function setVolume() {
    // Lógica para conversão de volume (se o slider for de 0 a 100)
    // 1. Pega o valor do slider (ex: 80)
    const volumeValue = volumeSlider.value / 100;
    
    // 3. Aplica o valor convertido (0.8) ao áudio
    audioPlayer.volume = volumeValue;
    
    console.log("Volume alterado para:", volumeSlider.value, "-> Audio volume:", volumeValue);
}

// Inicializa o volume
if (audioPlayer && volumeSlider) {
    setVolume();
    // Adicionar um "ouvinte" para quando o slider for alterado
    volumeSlider.addEventListener('input', setVolume);
}