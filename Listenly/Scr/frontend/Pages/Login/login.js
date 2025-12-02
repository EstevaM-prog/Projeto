// --- Funções Solicitadas ---

        // Função de Mostrar Senha
        function mostrarSenha() {
            const senha = document.getElementById("senha");
            const icone = document.getElementById("iconeSenha");

            if (senha.type === "password") {
                senha.type = "text";
                icone.classList.replace("bi-lock", "bi-unlock");
            } else {
                senha.type = "password";
                icone.classList.replace("bi-unlock", "bi-lock");
            }
        }

        // Validar Form e Gerenciar "Lembrar-me"
        function validarFormLogin(event) {
            event.preventDefault(); // evita envio do formulário

            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();
            const remember = document.getElementById('remember').checked;
            const mensagem = document.getElementById('mensagem');

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            // Regex: Pelo menos 1 letra, 1 número/especial, mín 10 caracteres
            const regexSenha = /^(?=.*[a-zA-Z])(?=.*[\d\W_]).{10,}$/; 

            function exibirErro(texto){
                mensagem.textContent = texto;
                mensagem.className = "erro";
            }

            if (email === "" || senha === "") {
                exibirErro("❌ Por favor, preencha todos os campos.");
                return false;
            }
            if (!regexEmail.test(email)){
                exibirErro("❌ Insira um e-mail válido.");
                return false;
            }
            if (!regexSenha.test(senha)){
                exibirErro("❌ A senha deve ter pelo menos 10 caracteres, incluindo letras e números/símbolos.");
                return false;
            }

            // --- Lógica "Lembrar-me" (Cookies de Login) ---
            if (remember) {
                // Salva o email no LocalStorage
                localStorage.setItem('savedEmail', email);
            } else {
                // Remove se o usuário desmarcar
                localStorage.removeItem('savedEmail');
            }

            // Sucesso
            const sucessoTexto = "✅ Login válido! Redirecionando...";
            mensagem.textContent = sucessoTexto;
            mensagem.className = "sucesso";
            
            // Animação visual no botão
            const btn = document.querySelector('.login-button');
            btn.innerHTML = "Carregando...";
            btn.style.opacity = "0.7";

            // Simulação de redirecionamento
            setTimeout(() => {
                window.location.href = "/Listenly/Scr/frontend/Pages/Home/home.html"; 
            }, 1500);

            return true;
        }

        // Function de Confirmar senha
        function confirmar_senha() {
            const senha = document.getElementById('senha').value;
            const senha2 = document.getElementById('senha2') ? document.getElementById('senha2').value : ""; 
            const mensagem = document.getElementById('mensagem');

            if (senha !== senha2) {
                mensagem.textContent = "❌ As senhas não coincidem";
                mensagem.className = "erro";
                return false;
            } else {
                mensagem.textContent = "✅ Senhas conferem";
                mensagem.className = "sucesso";
                return true;
            }
        }

        // --- Inicialização e Verificação de Dados Salvos ---
        
        window.addEventListener('DOMContentLoaded', () => {
            // Recuperar email salvo (Lembrar-me)
            const savedEmail = localStorage.getItem('savedEmail');
            if (savedEmail) {
                document.getElementById('email').value = savedEmail;
                document.getElementById('remember').checked = true;
            }

            // Recuperar tema salvo
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'dark') {
                document.body.classList.add('dark-mode');
                document.getElementById('theme-toggle').textContent = '☀️';
            }
        });
        
        // --- Configuração dos Event Listeners ---
        
        // Adiciona o listener ao formulário
        document.getElementById('loginForm').addEventListener('submit', validarFormLogin);

        // --- Lógica do Dark Mode ---
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });