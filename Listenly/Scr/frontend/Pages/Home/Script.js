document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progress-bar');
    const timeElapsed = document.getElementById('time-elapsed');
    const timeDuration = document.getElementById('time-duration');
    const volumeSlider = document.getElementById('volume');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const cards = Array.from(document.querySelectorAll('.card'));

    let current = 0;
    const playlist = cards.map((c, i) => ({
        src: c.dataset.src || '',
        title: c.querySelector('.meta')?.textContent || `Track ${i + 1}`,
    }));

    function loadTrack(index) {
        if (index < 0) index = playlist.length - 1;
        if (index >= playlist.length) index = 0;
        current = index;
        const track = playlist[current];
        const [title, artist] = track.title.split('—').map(t => t?.trim());
        songTitle.textContent = title || 'Faixa';
        songArtist.textContent = artist || '';
        if (track.src) {
            audio.src = track.src;
            audio.load();
        } else {
            audio.removeAttribute('src');
            progressBar.style.width = '0%';
            timeElapsed.textContent = '0:00';
            timeDuration.textContent = '0:00';
        }
    }

    function updatePlayButton() {
        playBtn.textContent = (audio.paused || !audio.src) ? '▶' : '❚❚';
    }

    function formatTime(t) {
        if (!t || isNaN(t)) return '0:00';
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    loadTrack(0);

    // Eventos
    cards.forEach((c, i) => c.addEventListener('click', () => {
        loadTrack(i);
        if (audio.src) audio.play();
        updatePlayButton();
    }));

    playBtn.addEventListener('click', () => {
        if (!audio.src) return;
        audio.paused ? audio.play() : audio.pause();
        updatePlayButton();
    });

    prevBtn.addEventListener('click', () => { loadTrack(current - 1); audio.play(); updatePlayButton(); });
    nextBtn.addEventListener('click', () => { loadTrack(current + 1); audio.play(); updatePlayButton(); });

    audio.addEventListener('play', updatePlayButton);
    audio.addEventListener('pause', updatePlayButton);

    audio.addEventListener('loadedmetadata', () => {
        timeDuration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const pct = (audio.currentTime / audio.duration) * 100 || 0;
        progressBar.style.width = `${pct}%`;
        timeElapsed.textContent = formatTime(audio.currentTime);
    });

    progress.addEventListener('click', e => {
        if (!audio.src || !audio.duration) return;
        const rect = progress.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
    });

    volumeSlider.addEventListener('input', e => audio.volume = parseFloat(e.target.value));

    audio.addEventListener('ended', () => {
        loadTrack(current + 1);
        audio.play();
    });

    audio.volume = parseFloat(volumeSlider.value);
    updatePlayButton();
});
