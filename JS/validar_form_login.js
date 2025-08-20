//validar form Login com regex 

export function validarFormLogin() {
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  // Regex para email válido
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Regex para senha: mínimo 8 caracteres, pelo menos 1 letra e 1 número ou caractere especial
  const regexSenha = /^(?=.*[A-Za-z])(?=.*[\d\W]).{8,}$/;

  if (!regexEmail.test(email)) {
    alert('❌ Email inválido.');
    return false;
  }

  if (!regexSenha.test(senha)) {
    alert('❌ A senha deve ter no mínimo 8 caracteres e conter pelo menos 1 letra e 1 número ou caractere especial.');
    return false;
  }

  return true;
}
