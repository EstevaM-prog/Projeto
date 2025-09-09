document.addEventListener('DOMContentLoaded', () => {
    const numeroCartaoInput = document.getElementById('numero_cartao');
    const validadeCartaoInput = document.getElementById('validade_cartao');
    const codSegurancaInput = document.getElementById('cod_seguranca');
    const formPagamento = document.querySelector('.form_pagamento form');

    // Função para permitir apenas números
    function onlyNumbers(event) {
        event.target.value = event.target.value.replace(/\D/g, '');
    }

    // Formatação do número do cartão
    numeroCartaoInput.addEventListener('input', (event) => {
        let { value } = event.target;
        value = value.replace(/\D/g, ''); // Remove todos os caracteres que não sejam dígitos
        value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona um espaço a cada 4 dígitos
        if (value.length > 19) {
            value = value.slice(0, 19);
        }
        event.target.value = value;
    });

    // Formatação da validade
    validadeCartaoInput.addEventListener('input', (event) => {
        let { value } = event.target;
        value = value.replace(/\D/g, ''); // Remove todos os caracteres que não sejam dígitos
        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
        }
        if (value.length > 5) {
            value = value.slice(0, 5);
        }
        event.target.value = value;
    });

    // Restringe o CVV apenas a números
    codSegurancaInput.addEventListener('input', onlyNumbers);

    // Associa a função de validação ao evento de envio do formulário
    if (formPagamento) {
        formPagamento.addEventListener('submit', validarFormPagamento);
    }
});