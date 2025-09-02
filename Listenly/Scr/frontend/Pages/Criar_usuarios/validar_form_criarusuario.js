// Validar form criar_usuarios com regex
function validarFormCreateUser(event) {
    event.preventDefault(); // agora funciona corretamente

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const senha2 = document.getElementById('senha2').value.trim();

    const erro = document.getElementById('mensagem');

    const regexName = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)+$/; // pelo menos duas palavras
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexSenha = /^(?=.*[a-zA-Z])(?=.*[\d\W_]).{10,}$/;

    if (!username || !email || !senha || !senha2) {
        alert("❌ Por favor, preencha todos os campos.");
        erro.textContent = "❌ Por favor, preencha todos os campos.";
        erro.className = "erro";
        return false;
    }
    if (!regexName.test(username)) {
        alert("❌ Insira um nome completo válido (mínimo duas palavras).");
        erro.textContent = "❌ Insira um nome completo válido (mínimo duas palavras).";
        erro.className = "erro";
        return false;
    }
    if (!regexEmail.test(email)) {
        alert("❌ Insira um e-mail válido.");
        erro.textContent = "❌ Insira um e-mail válido.";
        erro.className = "erro";
        return false;
    }
    if (!regexSenha.test(senha)) {
        alert("❌ A senha deve ter pelo menos 10 caracteres, incluindo letras e números ou caractere especial.");
        erro.textContent = "❌ A senha deve ter pelo menos 10 caracteres, incluindo letras e números ou caractere especial.";
        erro.className = "erro";
        return false;
    }
    if (senha !== senha2) {
        alert("❌ As senhas não coincidem.");
        erro.textContent = "❌ As senhas não coincidem.";
        erro.className = "erro";
        return false;
    }

    // Apenas um alert já é suficiente
    alert("✅ Cadastro válido!");
    erro.textContent = "✅ Cadastro válido!";
    erro.className = "sucesso";

    return true;
}
