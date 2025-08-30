  //validar form Login com regex 

  function validarFormLogin(event) {
    event.preventDefault(); // evita envio automático

    // Dados
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.treim();

    
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para email válido
    const regexSenha = /^(?=.*[a-zA-Z])(?=.*[\d\W_]).{10,}$/; // Regex para senha: mínimo 8 caracteres, pelo menos 1 letra e 1 número ou caractere especial

    // Alert de erro
    const erro = document.getElementById("Erro");

    if (email === "" || senha === ""){
      erro.textContent = "❌ Por favor, preencha todos os campos.";
    } else if (!regexEmail.test(email)) {
      event.preventDefault();
      erro.textContent = "❌ Insira um e-mail válido.";
    } else if (!regexSenha.test(senha)) {
      event.preventDefault();
      erro.textContent = "❌ A senha deve ter pelo menos 10 caracteres, incluindo letras e números ou caractere especial.";
    } else {
      erro.textContent = "";
      alert("✅ Login válido! (simulação)");
    }
  };
