var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');



	$('.table').on('focus', '.servicioPlz', function () {
	var data = JSON.parse($('#conceptos').val());
	var conceptos = Object.values(data)
	var source = [].concat.apply([],conceptos);

		$(this).autocomplete({
			source: source,
			minLength: 0,
		}).click(function () {
$(this).data("ui-autocomplete").menu.bindings = $();
			$(this).autocomplete("search","");
		});
	});

	$('.table').on('focus', '.genderPlz', function () {

		$(this).autocomplete({
			source: ["Masculino","Femenino"],
			minLength: 0,
		}).click(function () {
			$(this).autocomplete("search","");
		});
	});

	
$('body').on('focus', '[contenteditable]', function() {
    const $this = $(this);
    $this.data('before', $this.html());
}).on('blur paste', '[contenteditable]', function() {
    const $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $this.trigger('change');
    }
});

$('.table-add').click(function () {
	
  var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $clone.find('.datePlz').datetimepicker();

  $TABLE.find('table').append($clone);

});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});

$('.table-up').click(function () {
  var $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  var $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');

  var $rows = $TABLE.find('tr:not(:hidden)');
  var headers = [];
  var data = [];
  
  // Get the headers (add special header logic here)
  $($TABLE.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    var $td = $(this).find('td').not('.skip');
    var h = {};
    
    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();   
    });
    
    data.push(h);
  });
  
  // Output the result

console.log(data);
  
for (i=1; i<data.length; i++) {
  console.log(data[i]);
  
                  request = $.ajax({
                        url: "contratos.php",
						type: "post",
                        data: data[i],
						success: function(response) {
						$('#contents').append(response);
						}
                });
				
request.done(function (response, textStatus, jqXHR){
$('h2').text('Creación de contrato exitosa');

});
request.fail(function (jqXHR, textStatus, errorThrown){console.error("Failure: "+ textStatus, errorThrown);
});
request.always(function () {}); event.preventDefault();
}
});