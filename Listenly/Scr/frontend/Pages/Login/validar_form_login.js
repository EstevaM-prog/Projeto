

function validarFormLogin(event) {
    event.preventDefault(); // evita envio do formulário

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const regexSenha = /^(?=.*[a-zA-Z])(?=.*[\d\W_]).{10,}$/; 

    if (email === "" || senha === "") {
        alert("❌ Por favor, preencha todos os campos.");
    } else if (!regexEmail.test(email)) {
        alert("❌ Insira um e-mail válido.");
    } else if (!regexSenha.test(senha)) {
        alert("❌ A senha deve ter pelo menos 10 caracteres, incluindo letras e números ou caractere especial.");
    } else {
        alert("✅ Login válido! (simulação)");
        // aqui você poderia enviar o formulário com form.submit() se quiser
    }
} 

