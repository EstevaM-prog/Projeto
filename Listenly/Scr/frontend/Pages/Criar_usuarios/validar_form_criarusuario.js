// Validar formulário criar_usuarios com regex
function validarFormCreateUser(event) {
    event.preventDefault(); // impede envio automático do form

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const senha2 = document.getElementById('senha2').value.trim();
    const mensagem = document.getElementById('mensagem');

    // Regex
    const regexUsername = /^[a-zA-Z0-9._]{3,20}$/; // 3-20 caracteres, letras, números, . ou _
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexSenha = /^(?=.*[a-zA-Z])(?=.*[\d\W_]).{10,}$/; // mínimo 10 caracteres, letra + número ou especial

    // Função para exibir erro
    function exibirErro(texto) {
        alert(texto);
        mensagem.textContent = texto;
        mensagem.className = "erro";
    }

    // Valida campos obrigatórios
    if (!username || !email || !senha || !senha2) {
        exibirErro("❌ Por favor, preencha todos os campos.");
        return false;
    }

    // Valida username
    if (!regexUsername.test(username)) {
        exibirErro("❌ Insira um nome de usuário válido (3-20 caracteres, letras, números, . ou _).");
        return false;
    }

    // Valida email
    if (!regexEmail.test(email)) {
        exibirErro("❌ Insira um e-mail válido.");
        return false;
    }

    // Valida senha
    if (!regexSenha.test(senha)) {
        exibirErro("❌ A senha deve ter pelo menos 10 caracteres, incluindo letras e números ou caractere especial.");
        return false;
    }

    // Confirma senha
    if (senha !== senha2) {
        exibirErro("❌ As senhas não coincidem.");
        return false;
    }

    // Sucesso
    const sucessoTexto = "✅ Cadastro válido!";
    alert(sucessoTexto);
    mensagem.textContent = sucessoTexto;
    mensagem.className = "sucesso";

    return true;
}
