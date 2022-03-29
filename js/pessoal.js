// Cartão de crédito simulator JavaScript made by https://github.com/Edinwow/Simuladores-Emprestimo

var myTable = document.getElementById('cardTable');

var fatores = [0.3080591189, 0.2582943028, 0.2259190025, 0.2035830261, 0.1873757852, 0.1756471195, 0.1661867651, 0.1596063673, 0.1546882691]; // Fatores de acordo com o banco JBCred para prazos de 4 a 12 meses

var prazoMinimo = 4; // Prazo mínimo aplicado pelo banco

function calculaCartao() { // Recebe, calcula e retorna os valores informados e solicitados
    var limiteString = document.getElementById('limiteCartao').value;
    var solicitadoString = document.getElementById('solicitadoCartao').value;

    var limite = parseFloat(limiteString.replace('.' , '').replace(',' , '.')); // Converte valor de parcela para número
    var solicitado = parseFloat(solicitadoString.replace('.' , '').replace(',' , '.')); // Converte valor de parcela para número

    if(solicitadoString == '' && limiteString == '') {  // Se nenhum campo preenchido
        alert('Preencha um dos valores solicitados.');
    }  

    if(solicitadoString != '' & limiteString != '') { // Se ambos os campos preenchidos
        alert('Preencha somente um dos valores solicitados.');
    }

    if(limiteString != '' && solicitadoString == '') { // Se só limite preenchido
        for(var i = 0; i < fatores.length; i++) {
        myTable.rows[i+1].cells[1].innerHTML = converteMoeda(calculaSolicitadoCartao(limite)[0][i]); // Retorno de valor de parcela
        myTable.rows[i+1].cells[2].innerHTML = converteMoeda(calculaSolicitadoCartao(limite)[1][i]); // Retorno do valor liberado
        myTable.rows[i+1].cells[3].innerHTML = converteMoeda(limite - calculaSolicitadoCartao(limite)[1][i]); // Retorno do valor do juros
        myTable.rows[0].cells[2].innerHTML = "Liberado";
        }
        console.log('Retornado calculo com base em valor de limite');
    } 

    if(solicitadoString != '' && limiteString == '') { // Se só solicitado preenchido
        for(var i = 0; i < fatores.length; i++) {
        myTable.rows[i+1].cells[1].innerHTML = converteMoeda(calculaLimiteCartao(solicitado)[0][i]); // Retorno de valor de parcela
        myTable.rows[i+1].cells[2].innerHTML = converteMoeda(calculaLimiteCartao(solicitado)[1][i]); // Retorno do valor de limite necessário
        myTable.rows[i+1].cells[3].innerHTML = converteMoeda(calculaLimiteCartao(solicitado)[1][i] - solicitado); // Retorno do valor do juros
        myTable.rows[0].cells[2].innerHTML = "Limite";
        }
        console.log('Retornado calculo com base em valor solicitado');
    }   

}

function calculaLimiteCartao(solicitado) {
    var parcelas = [];
    var limites = [];

    for(var i = 0; i < fatores.length; i++) {
        var parcela = solicitado * fatores[i];
        var limite = parcela * (i + prazoMinimo)
        parcelas.push(parcela);
        limites.push(limite);
    }        
    return [parcelas, limites];
}

function calculaSolicitadoCartao(limite) {
    var parcelas = [];
    var liberados = [];
    
    for(var i = 0; i < fatores.length; i++) {
        var parcela = limite / (i + prazoMinimo);
        var liberado = parcela / fatores[i];
        parcelas.push(parcela);
        liberados.push(liberado);
    }
    return [parcelas, liberados];
}

function converteMoeda (valor) {
    var convertido = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return convertido;
}

function limpaCartao() {
    document.getElementById('limiteCartao').value = '';
    document.getElementById('solicitadoCartao').value = '';
    for(i = 1; i <= 10; i++) {
        myTable.rows[i].cells[1].innerHTML = "-";
        myTable.rows[i].cells[2].innerHTML = "-";
        myTable.rows[i].cells[3].innerHTML = "-";
    }
    console.log('Campos limpos com sucesso');
}