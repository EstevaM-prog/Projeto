    // Validar form criar_usuarios com regex
    export function validarFormCreateUser(event) {
    const name = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const senha2 = document.getElementById('senha2').value.trim();

    // Span para exibir erro
    const erro = document.getElementById('mensagem');

    // Regex [name, email, senha]
    const regexName = /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexSenha = /^(?=.*[a-zA-Z])(?=.*[\d\W_]).{10,}$/;

    if (!name || !email || !senha || !senha2) {
    event.preventDefault();
    erro.textContent = "❌ Por favor, preencha todos os campos.";
    erro.className = "erro";
    return false;
    }
    if (!regexName.test(name)) {
        event.preventDefault();
        erro.textContent = "❌ Insira um nome completo válido (mínimo duas palavras).";
        erro.className = "erro";
        return false;
    }
    if (!regexEmail.test(email)) {
        event.preventDefault();
        erro.textContent = "❌ Insira um e-mail válido.";
        erro.className = "erro";
        return false;
    }
    if (!regexSenha.test(senha)) {
        event.preventDefault();
        erro.textContent =
        "❌ A senha deve ter pelo menos 10 caracteres, incluindo letras e números ou caractere especial.";
        erro.className = "erro";
        return false;
    }
    if (senha !== senha2) {
        event.preventDefault();
        erro.textContent = "❌ As senhas não coincidem.";
        erro.className = "erro";
        return false;
    }

    erro.textContent = "";
    erro.className = "sucesso";
    alert("✅ Cadastro válido! (simulação)");
    return true;
    }
