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
    document.getElementById('mensagemZap').value = '*GS Financiamentos* \n📞(51) 3508-0628 ou 📱(51) 99441-4390 \n*Av. Baltazar de O. Garcia 931, Jd Planalto - Porto Alegre/RS*    \nCNPJ: 16.655.541-0001/98';
}

function falamosZap() {
    document.getElementById('mensagemZap').value = 'Oi, *FULANO*, falamos a pouco referente ao seu limite de crédito consignado, peço que salve meu contato para que não esqueça de mim, assim quando precisar de valores vai poder me chamar 😉😉'
}

function tambemTrabalhamos() {
    document.getElementById('mensagemZap').value = 'Também trabalhamos com saque no cartão de crédito, se você tiver algum cartão com limite disponível podemos liberar o valor em dinheiro e você paga parcelado na fatura como se fosse uma compra. Se você tiver é só me informar o limite disponível e a bandeira do cartão que faço a simulação pra ti 😉'
}