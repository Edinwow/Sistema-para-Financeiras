// Simuladores JavaScript made by https://github.com/Edinwow/Simuladores-Emprestimo 

// -------------------------- Comum --------------------------

var coeficiente = 0.02980;

function converteMoeda (valor) {
    var convertido = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return convertido;
}

// -------------------------- Contrato novo --------------------------
 
function calculaNovo() { // Recebe, calcula e retorna os valores informados e solicitados
var parcelaNovoString = document.getElementById('parcelaNovo').value; 
var liberadoNovoString = document.getElementById('liberadoNovo').value;

var parcelaNovo = parseFloat(parcelaNovoString.replace('.', '').replace(',', '.')); // Converte valor de parcela para número
var liberadoNovo = parseFloat(liberadoNovoString.replace('.', '').replace(',', '.')); // Converta valor liberado para número

if(parcelaNovoString == '' && liberadoNovoString == '') { // Se dois campos vazios
    alert('Insira um dos valores solicitados.');
    } else if(parcelaNovoString == '') { // Se valor liberado preenchido
        console.log('Envia para calculo de valor de parcela');
        document.getElementById('parcelaNovo').value = converteMoeda(calculaParcelaNovo(liberadoNovo));
        console.log('Valor de parcela retornado com sucesso');
    } else if(liberadoNovoString == '') { // Se valor de parcela preenchido 
        console.log('Envia para calculo de valor liberado');
        document.getElementById('liberadoNovo').value = converteMoeda(calculaLiberadoNovo(parcelaNovo));
        console.log('Valor liberado retornado com sucesso');
    } else { // Se dois campos preenchidos
        alert('Insira somente um dos valores.');
    }
}

function calculaParcelaNovo(liberado) {
    var parcela = parseFloat((liberado * coeficiente));
    console.log('Valor de parcela calculado com sucesso');
    return parcela;
}

function calculaLiberadoNovo(parcela) { 
    var liberado = parseFloat((parcela / coeficiente));
    console.log('Valor liberado calculado com sucesso');
    return liberado;
}

function limpaNovo() {
    document.getElementById('parcelaNovo').value = '';
    document.getElementById('liberadoNovo').value = '';
    console.log('Campos limpos com sucesso');
}

// -------------------------- Redução parcela --------------------------

var prazoMinimo = 6; // Número mínimo de parcelas em aberto que o banco opera para redução, caso aumentado ou reduzido é necessário também corrigir os fatores

var fatoresReducao = [0.174160, 0.150080, 0.132040, 0.118000, 0.106780, 0.097600, 0.089940, 0.083480, 0.077920, 0.073120, 0.068920, 0.065220, 0.061920, 0.058970, 0.056320, 0.053920, 0.051740, 0.049760, 0.047930, 0.046260, 0.044710, 0.043280, 0.041960, 0.040720, 0.039570, 0.038490, 0.037480, 0.036530, 0.035640, 0.034800, 0.034010, 0.033260, 0.032550, 0.031880, 0.031240, 0.030640, 0.030060, 0.029510, 0.028985, 0.028485, 0.028005, 0.027550, 0.027110, 0.026690, 0.026290, 0.025900, 0.025530, 0.025175, 0.024830, 0.024500, 0.024185, 0.023875, 0.023580, 0.023295, 0.023020, 0.022755, 0.022495, 0.022245, 0.022005, 0.021775, 0.021545, 0.021330, 0.021115, 0.020910, 0.020710, 0.020515, 0.020330, 0.020145, 0.019970, 0.019795, 0.019630, 0.019465, 0.019310, 0.019155, 0.019005, 0.018860, 0.018715, 0.018575, 0.018440]; // Fatores de redução para contratos de 6 a 84 parcelas em aberto

function calculaReducao() { // Recebe, calcula e retorna os valores informados e solicitados   
    var saldoReducaoString = document.getElementById('saldoReducao').value;
    var parcelaReducaoString = document.getElementById('parcelaReducao').value;
    var parcelaAbertaReducaoString = document.getElementById('parcelaAbertaReducao').value;
    var margemAtualSring = document.getElementById('margemAtualReducao').value;

    if(margemAtualSring == "") { // Se campo margem atual em branco define para 0
        margemAtualSring = "0";
    }

    var saldoReducao = parseFloat(saldoReducaoString.replace('.', '').replace(',', '.')); // Converte saldo para número
    var parcelaReducao = parseFloat(parcelaReducaoString.replace('.', '').replace(',', '.')); // Converte parcela para número
    var parcelaAbertaReducao = parseFloat(parcelaAbertaReducaoString.replace('.', '').replace(',', '.')); // Converte parcela em aberto para número
    var margemAtual = parseFloat(margemAtualSring.replace('.', '').replace(',', '.')); // Converte margem atual para número



    if(saldoReducaoString != '' && parcelaReducaoString != '' && parcelaAbertaReducaoString != '') { // Se três campos preenchidos
        if(parcelaAbertaReducao >= prazoMinimo) { // Se parcelas em aberto é maior que o mínimo
            console.log('Envia para calculo de parcela e margem reduzidas');
            var retornoReducao = calculaParcelaMargemReduzida(saldoReducao, parcelaReducao, parcelaAbertaReducao); 

            document.getElementById('parcelaReduzidaReducao').value = converteMoeda(retornoReducao[0]);
            console.log('Valor de parcela reduzida retornado com sucesso');

            document.getElementById('margemReduzidaReducao').value = converteMoeda(retornoReducao[1]);
            console.log('Valor de margem reduzida retornado com sucesso');
        } else { // Se parcelas em aberto menor que mínimo
            alert('Parcelas em aberto deve ser maior que ' + (prazoMinimo - 1) + '.');
        }
    } else { // Se três campos não preenchidos
        alert('Insira os 3 valores solicitados.');
    }

    document.getElementById('parcelaNovaReducao').value = converteMoeda(retornoReducao[1] + margemAtual); // Mostra valor da aprcela nova
    document.getElementById('liberadoNovo').value = converteMoeda(calculaLiberadoNovo(retornoReducao[1] + margemAtual)); // Mostra valor liberado
}

function calculaParcelaMargemReduzida(saldoReducao, parcelaReducao, parcelaAbertaReducao) {
    for(i = 0; i < fatoresReducao.length; i++) {
        if(parcelaAbertaReducao == prazoMinimo + i ) {   
        var parcelaReduzida = parseFloat((saldoReducao * fatoresReducao[i])); // Calcula parcela reduzida
        console.log('Valor de parcela reduzida calculada com sucesso');
        var margemReduzida = parseFloat((parcelaReducao - parcelaReduzida)); // Calcula margem reduzida
        console.log('Valor de margem reduzida calculada com sucesso');
        return [parcelaReduzida, margemReduzida];
        break;
        }
    }
}

function limpaReducao() {
    document.getElementById('saldoReducao').value = '';
    document.getElementById('parcelaReducao').value = '';
    document.getElementById('parcelaAbertaReducao').value = '';
    document.getElementById('parcelaReduzidaReducao').value = '';
    console.log('Campos limpos com sucesso');
}

function limpaNovoReducao() {
    document.getElementById('margemReduzidaReducao').value = '';
    document.getElementById('liberadoNovo').value = '';
    document.getElementById('margemAtualReducao').value = '';
    document.getElementById('parcelaNovaReducao').value = '';
    console.log('Campos limpos com sucesso');
}

// -------------------------- Aumento --------------------------

function calculaAumento() {
    var salarioMinimo = 1100; // Valor do salário mínimo
    var salarioMaior = 0.1016; // Proporção de aumento para salário maior que o mínimo
    var salarioMenor = 0.1018; // Proporção de aumento para salário manor que o mínimo
    var margemConsignavel = 0.3; // Proporção de margem consignável


    var salarioAntigoAumentoString = document.getElementById('salarioAntigoAumento').value;
    var salarioNovoAumentoString = document.getElementById('salarioNovoAumento').value;

    var salarioNovoAumento = parseFloat(salarioNovoAumentoString.replace('.', '').replace(',', '.'));
    var salarioAntigoAumento = parseFloat(salarioAntigoAumentoString.replace('.', '').replace(',', '.'));

    if(salarioAntigoAumentoString == '' && salarioNovoAumentoString == '') { // Se ambos em branco
        alert('Preencha um dos valores dos salários');
    }

    if(salarioAntigoAumentoString != '' && salarioNovoAumentoString != '') { // Se ambos preenchidos
        alert('Preencha somente um dos valores dos salários');
    }

    if(salarioAntigoAumentoString != '' && salarioNovoAumentoString == '') { // Calcula com salário antigo
        if(salarioAntigoAumento < salarioMinimo) {
            taxa = salarioMenor;
            document.getElementById('salarioNovoAumento').value = converteMoeda(salarioAntigoAumento * (taxa + 1));
            document.getElementById('porcentagemAumento').value = ((taxa * 100) + '%').replace('.', ',');
            document.getElementById('valorAumento').value = converteMoeda((salarioAntigoAumento * (taxa + 1)) - salarioAntigoAumento);
            document.getElementById('margemTotalAumento').value = converteMoeda(salarioAntigoAumento * (taxa + 1) * margemConsignavel);
            document.getElementById('margemNovaAumento').value = converteMoeda(salarioAntigoAumento * taxa * margemConsignavel);
            document.getElementById('margemNovaLiberadaAumento').value = converteMoeda(salarioAntigoAumento * taxa * margemConsignavel);
        }   else if(salarioAntigoAumento > salarioMinimo) {
                taxa = salarioMaior;
                document.getElementById('salarioNovoAumento').value = converteMoeda(salarioAntigoAumento * (taxa + 1));
                document.getElementById('porcentagemAumento').value = ((taxa * 100) + '%').replace('.', ',');
                document.getElementById('valorAumento').value = converteMoeda((salarioAntigoAumento * (taxa + 1)) - salarioAntigoAumento);
                document.getElementById('margemTotalAumento').value = converteMoeda(salarioAntigoAumento * (taxa + 1) * margemConsignavel);
                document.getElementById('margemNovaAumento').value = converteMoeda(salarioAntigoAumento * taxa * margemConsignavel);
                document.getElementById('margemNovaLiberadaAumento').value = converteMoeda(salarioAntigoAumento * taxa * margemConsignavel);
            } else {
                document.getElementById('salarioNovoAumento').value = converteMoeda(1212);
                document.getElementById('porcentagemAumento').value = '10,18%';
                document.getElementById('valorAumento').value = converteMoeda(1212 - salarioAntigoAumento);
                document.getElementById('margemTotalAumento').value = converteMoeda(1212 * margemConsignavel);
                document.getElementById('margemNovaAumento').value = converteMoeda(112 * margemConsignavel);
                document.getElementById('margemNovaLiberadaAumento').value = converteMoeda(112 * margemConsignavel);
            };
    }

    if(salarioAntigoAumentoString == '' && salarioNovoAumentoString != '') { // Calcula com salário antigo
        if(salarioNovoAumento < 1212) {
            taxa = salarioMenor;
            document.getElementById('salarioAntigoAumento').value = converteMoeda(salarioNovoAumento / (taxa + 1));
            document.getElementById('porcentagemAumento').value = ((taxa * 100) + '%').replace('.', ',');
            document.getElementById('valorAumento').value = converteMoeda(salarioNovoAumento - (salarioNovoAumento / (taxa + 1)));
            document.getElementById('margemTotalAumento').value = converteMoeda(salarioNovoAumento * margemConsignavel);
            document.getElementById('margemNovaAumento').value = converteMoeda((salarioNovoAumento - (salarioNovoAumento / (taxa + 1))) * margemConsignavel);
            document.getElementById('margemNovaLiberadaAumento').value = converteMoeda((salarioNovoAumento - (salarioNovoAumento / (taxa + 1))) * margemConsignavel);
        } else if(salarioNovoAumento > 1212) {
            taxa = salarioMaior;
            document.getElementById('salarioAntigoAumento').value = converteMoeda(salarioNovoAumento / (taxa + 1));
            document.getElementById('porcentagemAumento').value = ((taxa * 100) + '%').replace('.', ',');
            document.getElementById('valorAumento').value = converteMoeda(salarioNovoAumento - (salarioNovoAumento / (taxa + 1)));
            document.getElementById('margemTotalAumento').value = converteMoeda(salarioNovoAumento * margemConsignavel);
            document.getElementById('margemNovaAumento').value = converteMoeda((salarioNovoAumento - (salarioNovoAumento / (taxa + 1))) * margemConsignavel);
            document.getElementById('margemNovaLiberadaAumento').value = converteMoeda((salarioNovoAumento - (salarioNovoAumento / (taxa + 1))) * margemConsignavel);
        } else {
            document.getElementById('salarioAntigoAumento').value = converteMoeda(1100);
            document.getElementById('porcentagemAumento').value = '10,18%';
            document.getElementById('valorAumento').value = converteMoeda(salarioNovoAumento - 1100);
            document.getElementById('margemTotalAumento').value = converteMoeda(1212 * margemConsignavel);
            document.getElementById('margemNovaAumento').value = converteMoeda(112 * margemConsignavel);
            document.getElementById('margemNovaLiberadaAumento').value = converteMoeda(112 * margemConsignavel);
        };
    }
    
    calculaNovoAumento();
};

function calculaNovoAumento() {
    var margemNovaLiberadaAumentoString = document.getElementById('margemNovaLiberadaAumento').value;
    var margemNovaLiberadaAumento = parseFloat(margemNovaLiberadaAumentoString.replace('R$ ', '').replace('.', '').replace(',', '.'));

    document.getElementById('valorLiberadoAumento').value = converteMoeda(margemNovaLiberadaAumento / coeficiente);
}

function calculaAumento5() {
    var margemNovaLiberadaAumentoString = document.getElementById('margemNovaLiberadaAumento').value;
    var margemNovaLiberadaAumento = parseFloat(margemNovaLiberadaAumentoString.replace('R$ ', '').replace('.', '').replace(',', '.'));

    var salarioAntigoAumentoString = document.getElementById('salarioAntigoAumento').value;
    var salarioAntigoAumento = parseFloat(salarioAntigoAumentoString.replace('R$ ', '').replace('.', '').replace(',', '.'));

    var salario5 = salarioAntigoAumento * 0.05;
    
    document.getElementById('margemNovaLiberadaAumento').value = converteMoeda(margemNovaLiberadaAumento) + ' - ' + converteMoeda(salario5) + ' = ' + converteMoeda(margemNovaLiberadaAumento - salario5);

    document.getElementById('valorLiberadoAumento').value = converteMoeda((margemNovaLiberadaAumento - salario5) / coeficiente);
}

function limpaAumento() {
    document.getElementById('salarioAntigoAumento').value = '';
    document.getElementById('salarioNovoAumento').value = '';
    document.getElementById('porcentagemAumento').value = '';
    document.getElementById('valorAumento').value = '';
    document.getElementById('margemTotalAumento').value = '';
    document.getElementById('margemNovaAumento').value = '';
    document.getElementById('margemNovaLiberadaAumento').value = '';
    document.getElementById('valorLiberadoAumento').value = '';
}

// -------------------------- Aumento de margem --------------------------

function calculaAumentoMargem() {
    var salarioAumentoMargemString = document.getElementById('salarioAumentoMargem').value;
    var margemAtualAumentoMargemString = document.getElementById('margemAtualAumentoMargem').value;

    var salarioAumentoMargem = parseFloat(salarioAumentoMargemString.replace('.', '').replace(',', '.'));
    var margemAtualAumentoMargem = parseFloat(margemAtualAumentoMargemString.replace('.', '').replace(',', '.'));

    if(salarioAumentoMargemString == '') alert('Preencha o valor do salário');
    if(salarioAumentoMargemString != '') {
        if(margemAtualAumentoMargemString == '') margemAtualAumentoMargem = 0;
        var margemAumento = salarioAumentoMargem * 0.05;
        var margemTotal = margemAumento + margemAtualAumentoMargem;
        document.getElementById('margemNovaLiberadaAumentoMargem').value = converteMoeda(margemTotal);
        document.getElementById('valorLiberadoAumentoMargem').value = converteMoeda(margemTotal / coeficiente);

    }

}

function limpaAumentoMargem() {
    document.getElementById('salarioAumentoMargem').value = '';
    document.getElementById('margemAtualAumentoMargem').value = '';
    document.getElementById('margemNovaLiberadaAumentoMargem').value = '';
    document.getElementById('valorLiberadoAumentoMargem').value = '';
}

// -------------------------- Cartão consignado --------------------------

var proporcaoSaque = 0.7;

var minhaTabela = document.getElementById('cardConsigTable');

//DESATUALIZADO
var bmgIdades = [18, 69, 70, 70, 71, 71, 72, 72, 73, 73, 74, 74, 75, 75, 76, 76, 77, 77]; // Idade mínima e máxima de cada faixa
var bmgMultiplicadores = [32, 32, 29.5, 29.5, 28.65, 28.65, 27.5, 27.5, 25.9, 25.9, 23.8, 23.8, 20.7, 20.7, 15.85, 15.85, 9.05,]; // Repete 2x o multiplicador de caida faixa

//17/03
var oleIdades = [25, 74, 75, 75, 76, 76, 77, 77, 78, 78, 79, 79, 80, 80]; // Idade mínima e máxima de cada faixa
var oleMultiplicadores = [25, 25, 21.16, 21.16, 17.32, 17.32, 13.48, 13.48, 9.64, 9.64, 5.8, 5.8, 1.96, 1.96]; // Repete 2x o multiplicador de caida faixa

//17/03
var panIdades = [22, 73, 74, 74, 75, 75, 76, 76, 77, 77, 78, 78, 79, 79]; // Idade mínima e máxima de cada faixa
var panMultiplicadores = [27.5, 27.5, 26.5, 26.5, 25, 25, 23, 23, 20, 20, 16, 16, 9, 9 ]; // Repete 2x o multiplicador de caida faixa

//17/03
var cetelemIdades = [24, 75, 76, 77, 78, 79]; // Idade mínima e máxima de cada faixa
var cetelemMultiplicadores = [27.5, 27.5, 22, 22, 6, 6]; // Repete 2x o multiplicador de caida faixa

//15/03
var daycovalIdades = [21, 74]; // Idade mínima e máxima de cada faixa
var daycovalMultiplicadores = [27.5, 27.5]; // Repete 2x o multiplicador de caida faixa

function bmg (idade, parcela) {
    var i = 0;
    while (i < bmgIdades.length) {
        if (idade >= bmgIdades[i] && idade <= bmgIdades[i + 1]) {
            var limite = parcela * bmgMultiplicadores[i];
            var saque = limite * proporcaoSaque;
            minhaTabela.rows[1].cells[1].innerHTML = converteMoeda(limite); // Mostra valor do limite
            minhaTabela.rows[1].cells[2].innerHTML = converteMoeda(saque); // Mostra valor do saque
            minhaTabela.rows[1].cells[3].innerHTML = bmgMultiplicadores[i] + 'x'; // Mostra valor do saque
            break;
        }
        i = i + 2;
    }
}

function ole (idade, parcela) {
    var i = 0;
    while (i < oleIdades.length) {
        if (idade >= oleIdades[i] && idade <= oleIdades[i + 1]) {
            var limite = parcela * oleMultiplicadores[i];
            var saque = limite * proporcaoSaque;
            minhaTabela.rows[2].cells[1].innerHTML = converteMoeda(limite); // Mostra valor do limite
            minhaTabela.rows[2].cells[2].innerHTML = converteMoeda(saque); // Mostra valor do saque
            minhaTabela.rows[2].cells[3].innerHTML = oleMultiplicadores[i] + 'x'; // Mostra valor do saque
            break;
        }
        i = i + 2;
    }
}

function pan (idade, parcela) {
    var i = 0;
    while (i < panIdades.length) {
        if (idade >= panIdades[i] && idade <= panIdades[i + 1]) {
            var limite = parcela * panMultiplicadores[i];
            var saque = limite * proporcaoSaque;
            minhaTabela.rows[3].cells[1].innerHTML = converteMoeda(limite); // Mostra valor do limite
            minhaTabela.rows[3].cells[2].innerHTML = converteMoeda(saque); // Mostra valor do saque
            minhaTabela.rows[3].cells[3].innerHTML = panMultiplicadores[i] + 'x'; // Mostra valor do saque
            break;
        }
        i = i + 2;
    }
}

function cetelem (idade, parcela) {
    var i = 0;
    while (i < cetelemIdades.length) {
        if (idade >= cetelemIdades[i] && idade <= cetelemIdades[i + 1]) {
            var limite = parcela * cetelemMultiplicadores[i];
            var saque = limite * proporcaoSaque;
            minhaTabela.rows[4].cells[1].innerHTML = converteMoeda(limite); // Mostra valor do limite
            minhaTabela.rows[4].cells[2].innerHTML = converteMoeda(saque); // Mostra valor do saque
            minhaTabela.rows[4].cells[3].innerHTML = cetelemMultiplicadores[i] + 'x'; // Mostra valor do saque
            break;
        }
        i = i + 2;
    }
}

function daycoval (idade, parcela) {
    var i = 0;
    while (i < daycovalIdades.length) {
        if (idade >= daycovalIdades[i] && idade <= daycovalIdades[i + 1]) {
            var limite = parcela * daycovalMultiplicadores[i];
            var saque = limite * proporcaoSaque;
            minhaTabela.rows[5].cells[1].innerHTML = converteMoeda(limite); // Mostra valor do limite
            minhaTabela.rows[5].cells[2].innerHTML = converteMoeda(saque); // Mostra valor do saque
            minhaTabela.rows[5].cells[3].innerHTML = daycovalMultiplicadores[i] + 'x'; // Mostra valor do saque
            break;
        }
        i = i + 2;
    }
}

function calculaCartoes () {

    var idade = parseFloat(document.getElementById("idadeCartao").value);
    var parcela = parseFloat(document.getElementById("parcelaCartao").value);

    if((idade + parcela) > 0) {
        limpaTabela();
        bmg (idade, parcela);
        ole (idade, parcela);
        pan (idade, parcela);
        cetelem (idade, parcela);
        daycoval (idade, parcela);
    } else {
        alert("Preencha os dois valores para calcular.")
    }
}

function limpaTabela() { // Limpa tabela
    for(i = 1; i < 6; i++) {
        minhaTabela.rows[i].cells[1].innerHTML = "";
        minhaTabela.rows[i].cells[2].innerHTML = "";
        minhaTabela.rows[i].cells[3].innerHTML = "";
    }
}

function limpaInputs() { // Limpa campos do usuário
    document.getElementById("idadeCartao").value = "";
    document.getElementById("parcelaCartao").value = "";
}

function limpaCartoes() { // Limpa todos os campos
    limpaTabela();
    limpaInputs();
}

// -------------------------- Desbloqueio --------------------------
function calculaDesbloqueio() {

    //var days = document.getElementById("select").value;
    //var date = new Date(document.getElementById("date1").value);
   // date.setDate(date.getDate() + parseInt(days));
    //document.getElementById("date2").valueAsDate = date;

    var data = new Date(document.getElementById('dataConcessao').value);
    data.setDate(data.getDate() + 90);
    document.getElementById('dataDesbloqueio').valueAsDate = data;
}
