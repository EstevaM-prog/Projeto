  export function confirmar_senha() {
    const senha = document.getElementById('senha').value;
    const senha2 = document.getElementById('senha2').value;
    const mensagem = document.getElementById('mensagem');

    if (senha !== senha2) {
      mensagem.textContent = "As senhas não coincidem";
      mensagem.className = "erro";
      return false; // bloqueia o envio do formulário
    } else {
    mensagem.textContent = "Senhas conferem";
    mensagem.className = "sucesso";
    return true; // permite o envio
    }
  }