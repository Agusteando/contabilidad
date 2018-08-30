$( document ).ready(function( $ ) {

$('.properPlz').change(function() {
            var proper = properCase($(this).text());
			$(this).text(proper)			
});

$('#formContrato').submit(function(event) {
                event.preventDefault();
});

$('#add').click(function() {

	$('#formContrato').toggle();
});
	
$('.btn_conceptos').click(function() {
	var arr = {};
	var theValue = $(this).val();
		$('#servicio').val(theValue);
		$('h2').text(properCase(theValue));
		  var $form = $('#selectionScreen');
                var $inputs = $form.find("input, select, button, textarea");
                var serializedData = $inputs.serializeArray();
for (i=0; i<serializedData.length; i++) {
	arr[serializedData[i].name] = serializedData[i].value;
}
console.log(arr);

                request = $.ajax({
                        url: "request.php",
						type: "post",
                        data: arr,
						success: function(response) {
						$('#contents').append(response);
						}
                });
request.done(function (response, textStatus, jqXHR){
$('#categorias').hide();
$('#containerTwo').show();});
request.fail(function (jqXHR, textStatus, errorThrown){console.error("Failure: "+ textStatus, errorThrown);});
request.always(function () {}); event.preventDefault();
});


});