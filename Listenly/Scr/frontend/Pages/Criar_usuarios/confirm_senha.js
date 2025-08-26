  export function confirmar_senha() {
    const senha = document.getElementById('senha').value;
    const senha2 = document.getElementById('senha2').value;
    const mensagem = document.getElementById('mensagem');

    if (senha !== senha2) {
    event.preventDefault(); // impede envio do formulário
    mensagem.textContent = "❌ As senhas não coincidem";
    mensagem.className = "erro";
    return false;
  } else {
    mensagem.textContent = "✅ Senhas conferem";
    mensagem.className = "sucesso";
    return true;
  }
}
