// Mensagem de erro
const mensagemErro = "Código de erro: 500 - Falha no servidor";

// Atualiza o conteúdo do elemento de erro
document.getElementById("mensagem-erro").textContent = mensagemErro;

// Captura data e hora atual
const agora = new Date();

const dia = String(agora.getDate()).padStart(2, '0');
const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Meses vão de 0 a 11
const ano = agora.getFullYear();

const hora = String(agora.getHours()).padStart(2, '0');
const minuto = String(agora.getMinutes()).padStart(2, '0');
const segundo = String(agora.getSeconds()).padStart(2, '0');

// Formata data e hora
const dataHoraFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

// Atualiza o elemento de data e hora
document.getElementById("data-hora-erro").textContent = `Erro ocorrido em: ${dataHoraFormatada}`;
