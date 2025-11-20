// --- Texto dos Termos de Uso ---
        const termosTexto = `📜 TERMOS DE USO - WEB MUSIC

1. ACEITAÇÃO
Ao se cadastrar, você concorda com estes termos de uso.

2. USO RESPONSÁVEL
Você concorda em não utilizar a plataforma para fins ilegais ou para distribuir conteúdo protegido por direitos autorais sem permissão.

3. PRIVACIDADE
Seus dados (nome, e-mail) são armazenados de forma segura e utilizados apenas para fornecer o serviço.

4. CONTEÚDO
O usuário é o único responsável pelo conteúdo que interage ou compartilha na plataforma.

5. CONDUTA
Comportamento abusivo, discurso de ódio ou spam resultarão no banimento imediato da conta.

Clique em OK para confirmar que leu e aceita os termos.`;

        // --- Evento para Mostrar Termos ---
        // Adiciona o evento ao checkbox 'termos'
        document.getElementById('termos').addEventListener('change', function() {
            if (this.checked) {
                alert(termosTexto);
            }
        });


        // --- Funções Solicitadas ---

        // Função Genérica para Mostrar Senha (agora aceita ID do input e do ícone)
        function mostrarSenha(inputId, iconId) {
            const senhaInput = document.getElementById(inputId);
            const icone = document.getElementById(iconId);

            if (senhaInput.type === "password") {
                senhaInput.type = "text";
                icone.classList.replace("bi-lock", "bi-unlock");
                icone.classList.replace("bi-shield-lock", "bi-shield-check"); // Caso use ícone diferente na senha 2
            } else {
                senhaInput.type = "password";
                icone.classList.replace("bi-unlock", "bi-lock");
                icone.classList.replace("bi-shield-check", "bi-shield-lock");
            }
        }

        // Validar Formulário de Cadastro
        function validarFormCadastro(event) {
            event.preventDefault(); // evita envio do formulário

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();
            const senha2 = document.getElementById('senha2').value.trim();
            const termos = document.getElementById('termos').checked;
            const mensagem = document.getElementById('mensagem');

            // Regex
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            const regexSenha = /^(?=.*[a-zA-Z])(?=.*[\d\W_]).{10,}$/; 

            function exibirErro(texto){
                mensagem.textContent = texto;
                mensagem.className = "erro";
            }

            // Validações Básicas
            if (username === "" || email === "" || senha === "" || senha2 === "") {
                exibirErro("❌ Por favor, preencha todos os campos.");
                return false;
            }

            if (!termos) {
                exibirErro("❌ Você precisa aceitar os termos de uso.");
                return false;
            }

            if (!regexEmail.test(email)){
                exibirErro("❌ Insira um e-mail válido.");
                return false;
            }

            if (!regexSenha.test(senha)){
                exibirErro("❌ A senha deve ter pelo menos 10 caracteres, com letras e números.");
                return false;
            }

            // Validação: Senha 1 igual a Senha 2
            if (senha !== senha2) {
                exibirErro("❌ As senhas não coincidem.");
                return false;
            }

            // Sucesso
            const sucessoTexto = "✅ Cadastro realizado! Redirecionando...";
            mensagem.textContent = sucessoTexto;
            mensagem.className = "sucesso";
            
            // Animação visual no botão
            const btn = document.querySelector('.login-button');
            btn.innerHTML = "Criando conta...";
            btn.style.opacity = "0.7";

            // Salvar dados básicos (Simulação)
            localStorage.setItem('savedEmail', email); // Já deixa salvo para o login

            // Redirecionamento
            setTimeout(() => {
                window.location.href = "/Listenly/Scr/frontend/Pages/Home/home.html"; // Volta para o login após cadastro
            }, 2000);

            return true;
        }

        // Inicialização
        window.addEventListener('DOMContentLoaded', () => {
            // Recuperar tema salvo
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'dark') {
                document.body.classList.add('dark-mode');
                document.getElementById('theme-toggle').textContent = '☀️';
            }
        });
        
        // Listeners
        document.getElementById('cadastroForm').addEventListener('submit', validarFormCadastro);

        // Dark Mode Toggle (Igual ao Login)
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