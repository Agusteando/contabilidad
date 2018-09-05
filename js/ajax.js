$( document ).ready(function( $ ) {


plantel = $('#plantel').val();
request = $.ajax({
                        url: "key.php",
						type: "POST",
						data: {'plantel':plantel},
						success: function(response) {
						$('#almacenamiento').val(response);
						console.log('Verifica integridad de base de datos: ');	
						console.log(response);						
						}
				});	
				/*
request = $.ajax({	//This is only after sending to sheets through a save button, so it creates table structure on ss.
                        url: "initialize.php",
						type: "post",
						success: function(response) {
						console.log(response);}
				});
*/
				
$('#salon').on('change','input',function() {
	var obj = {};
	var date = new Date();
	var hora = date.toLocaleTimeString();
	
	
	if ($('#servicio').val() === "tiempo extendido") {
		
		if ($(this).parent().find('input').is(':checked')) {
	var oldObj = $('#data').val();
	if (oldObj.length > 0) {
	var obj = JSON.parse(oldObj);
	}
	
	obj[$(this).val()] = hora;
	
	console.log(obj);
	
	
	$('#data').val(JSON.stringify(obj));
		} else {
	var oldObj = $('#data').val();
	if (oldObj.length > 0) {
	var obj = JSON.parse(oldObj);
	}
	delete obj[$(this).val()]
	console.log(obj);
	$('#data').val(JSON.stringify(obj));
		}
	} else {
	
	var arr = [];
	$('input:checked').each(function() {
		arr.push($(this).val());
	});
	console.log(arr);
$('#data').val(JSON.stringify(arr));	
	}
});

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

						var data = JSON.parse(response);
						
						console.log(data);
						
						var salon = document.getElementById('salon');
						
						for (i=0; i<data.length; i++) {
							
							var container = document.createElement('label');
							container.className = "bigBox";
							var span = document.createElement('span');
							span.className = "checkmark ss "+data[i].genero;
							var box = document.createElement('input');
							box.setAttribute("type", "checkbox");
							container.innerHTML = data[i].apellidoPaterno+" "+data[i].apellidoMaterno+" "+data[i].nombres;
							box.value = data[i].id;
							container.appendChild(box);				
							container.appendChild(span);
							salon.appendChild(container);

							/*
							
							
							
							
								var carita = document.createElement('span');
								var label = document.createElement('span');
								var mark = document.createElement('span');
								var row = document.createElement('tr');
								carita.className = "ss "+data[i].genero;
								
								

						label.innerHTML = data[i].apellidoPaterno+" "+data[i].apellidoMaterno+" "+data[i].nombres;
						label.style.color = 'black';
						mark.id = 'check';
						mark.style.display = 'none'; 
						
						carita.appendChild(mark);
						carita.appendChild(label);
						salon.appendChild(carita);
						.appendChild(row);
						*/
						}
						
						
						
						}
                });
request.done(function (response, textStatus, jqXHR){
$('#categorias').hide();
$('#containerTwo').show();});
request.fail(function (jqXHR, textStatus, errorThrown){console.error("Failure: "+ textStatus, errorThrown);});
request.always(function () {}); $('#categorias').hide();
$('#containerTwo').show();event.preventDefault(); 
});


});