// Searchbar JavaScript taken from internet

$('#name-filter').keyup(function() {
    var nomeFiltro = $(this).val().toLowerCase(); 
  $('table tbody').find('tr').each(function() {
    var conteudoCelulaNome = $(this).find('td:first').text();
    var correspondeNome = conteudoCelulaNome.toLowerCase().indexOf(nomeFiltro) >= 0;
      $(this).css('display', correspondeNome ? '' : 'none');
    });
  });