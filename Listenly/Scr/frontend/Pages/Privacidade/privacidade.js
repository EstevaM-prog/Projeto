document.addEventListener('DOMContentLoaded', () => {
            
            // --- LÓGICA DO TEMA ---
            const themeBtn = document.getElementById('theme-toggle');
            const themeIcon = themeBtn.querySelector('i');
            
            // Carrega o tema salvo no LocalStorage
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);

            themeBtn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
                updateThemeIcon(next);
            });

            function updateThemeIcon(theme) {
                if(theme === 'light') {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                }
            }

            // Opcional: Fechar outros detalhes quando um é aberto (Efeito Acordeão Exclusivo)
            const details = document.querySelectorAll('details');
            details.forEach((detail) => {
                detail.addEventListener('click', function() {
                    if (!this.open) { // Se vai abrir
                        details.forEach(d => {
                            if (d !== this && d.open) d.removeAttribute('open');
                        });
                    }
                });
            });
        });