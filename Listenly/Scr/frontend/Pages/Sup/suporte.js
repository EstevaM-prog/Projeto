document.addEventListener('DOMContentLoaded', () => {
            
            // --- LÓGICA DO TEMA ---
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

            // --- ENVIO DO FORMULÁRIO ---
            const form = document.getElementById('supportForm');
            const toast = document.getElementById('toast');
            const submitBtn = document.querySelector('.btn-submit');

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Efeito de carregamento
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;

                // Simulação de envio
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                    
                    // Mostrar Toast
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 3000);
                }, 1500);
            });

            // Acordeão Exclusivo (Fecha um ao abrir outro)
            const details = document.querySelectorAll('details');
            details.forEach((detail) => {
                detail.addEventListener('click', function() {
                    if (!this.open) {
                        details.forEach(d => {
                            if (d !== this && d.open) d.removeAttribute('open');
                        });
                    }
                });
            });
        });