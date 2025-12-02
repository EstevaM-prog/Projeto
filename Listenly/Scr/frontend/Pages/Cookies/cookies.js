document.addEventListener('DOMContentLoaded', () => {
            
            // --- LÓGICA DO TEMA (Igual às outras páginas) ---
            const themeBtn = document.getElementById('theme-toggle');
            const themeIcon = themeBtn.querySelector('i');
            
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

            // --- LÓGICA DE COOKIES ---
            const form = document.getElementById('cookie-form');
            const toast = document.getElementById('toast');

            // Carregar preferências salvas (Simulação)
            const prefs = JSON.parse(localStorage.getItem('cookiePrefs')) || {
                perf: true,
                func: true,
                ads: false
            };

            document.getElementById('perf-cookies').checked = prefs.perf;
            document.getElementById('func-cookies').checked = prefs.func;
            document.getElementById('ads-cookies').checked = prefs.ads;

            // Salvar Preferências
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const newPrefs = {
                    perf: document.getElementById('perf-cookies').checked,
                    func: document.getElementById('func-cookies').checked,
                    ads: document.getElementById('ads-cookies').checked
                };

                localStorage.setItem('cookiePrefs', JSON.stringify(newPrefs));
                
                showToast();
            });

            // Função Global para Rejeitar Tudo
            window.rejectAll = function() {
                document.getElementById('perf-cookies').checked = false;
                document.getElementById('func-cookies').checked = false;
                document.getElementById('ads-cookies').checked = false;
            }

            function showToast() {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
        });