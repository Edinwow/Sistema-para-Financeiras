// -------------------------- Chama zap --------------------------

function chamaZap() { 
    var numeroZap = document.getElementById('numeroZap').value;
    var mensagemZap = document.getElementById('mensagemZap').value;
    var link = 'https://api.whatsapp.com/send?phone=55' + numeroZap + '&text=' + mensagemZap;
    window.open(link);
}

function limpaZap() {
    document.getElementById('numeroZap').value = '';
    mensagemZap = document.getElementById('mensagemZap').value = '';
}

function dadosZap() {
    document.getElementById('mensagemZap').value = '*Financeira* \n📞(51) 1234-1234 ou 📱(51) 1234-1234 \n*Av. Pedro Navegante 900, Vila Nova - Porto Alegre/RS*    \nCNPJ: 12.345.678-0001/90';
}

function falamosZap() {
    document.getElementById('mensagemZap').value = 'Oi, *FULANO*, falamos a pouco referente ao seu limite de crédito consignado, peço que salve meu contato para que não esqueça de mim, assim quando precisar de valores vai poder me chamar 😉😉'
}

function tambemTrabalhamos() {
    document.getElementById('mensagemZap').value = 'Também trabalhamos com saque no cartão de crédito, se você tiver algum cartão com limite disponível podemos liberar o valor em dinheiro e você paga parcelado na fatura como se fosse uma compra. Se você tiver é só me informar o limite disponível e a bandeira do cartão que faço a simulação pra ti 😉'
}