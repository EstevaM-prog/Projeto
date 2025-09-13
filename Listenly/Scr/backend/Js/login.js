// Função de Mostrar Senha

function mostrarSenha(){
                        const senha = document.getElementById("senha");
                        const icone = document.getElementById("iconeSenha")

                        if (senha.type === "password") {
                            senha.type = "text";
                            icone.classList.replace("bi-lock", "bi-unlock")
                        } else {
                            senha.type = "password";
                            icone.classList.replace("bi-unlock", "bi-lock")
                        }
                    }


// Validar Form

function validarFormLogin(event) {
    event.preventDefault(); // evita envio do formulário

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const mensagem = document.getElementById('mensagem');

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const regexSenha = /^(?=.*[a-zA-Z])(?=.*[\d\W_]).{10,}$/; 


    function exibirErro(texto){
        alert(texto);
        mensagem.textContent = texto;
        mensagem.className = "erro";
    }

    if (email === "" || senha === "") {
        exibirErro("❌ Por favor, preencha todos os campos.");
        return false;
    }
    if (!regexEmail.test(email)){
        exibirErro("❌ Insira um e-mail válido.");
    }
    if (!regexSenha.test(senha)){
        exibirErro("❌ A senha deve ter pelo menos 10 caracteres, incluindo letras e números ou caractere especial.");
    }

    //Sucesso
    const sucessoTexto = "✅  Login válido";
    alert(sucessoTexto);
    mensagem.textContent = sucessoTexto;
    mensagem.className = "sucesso";
    
    // redireciona para a página home após o usuário clicar em "OK"
    window.location.href = "/Listenly/Scr/frontend/Pages/Home/home.html"; // coloque o caminho da sua página inicial

    return true;
}

// Cookies de Login

