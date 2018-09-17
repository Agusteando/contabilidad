function build(data) {
	var categorias = Object.keys(data)
	var conceptos = Object.values(data)
	var arrayConceptos = [].concat.apply([],conceptos);
	var plantel = $('#plantel').val();

	var container = document.getElementById('categorias');
	container.style.margin = "50px";
	for (i = 0; i < categorias.length; i++) {
	
		var fila = document.createElement('div');
		var label = document.createElement('td');
		fila.style.display = "table-row";
		var contents = document.createElement('td');
		contents.style.width = "100%";
	/* 	contents.style.verticalAlign = "middle"; */

		fila.style.width = "100%";
		fila.className = "filas_servicios";


		label.style.width = "25vw";
		label.innerHTML = properCase(categorias[i]);
		fila.appendChild(label);
		fila.className = "ui-widget-content";
		label.className = "label_servicios";
		for (j = 0; j < conceptos[i].length; j++) {


			var btn = document.createElement('button');
			var estosConceptos = conceptos[i];
			var row = document.createElement('tr');

			
			var contents1 = document.createElement('td');
			var contents2 = document.createElement('td');
			var contents3 = document.createElement('td');
			
			contents1.appendChild(btn);
			contents2.innerHTML = 0
			contents3.innerHTML = 0
			
			
			contents1.style.width = "100%";
			contents2.style.width = "100px";
			contents3.style.width = "100px";


			btn.className = "btn_conceptos ui-button ui-corner-all";
			btn.innerHTML = estosConceptos[j]; 
			btn.style.width = "100%";
			btn.style.color = "#337ab7";
			btn.name = 'servicio';
			btn.value = estosConceptos[j];
			row.appendChild(btn);
			row.appendChild(contents2);
			row.appendChild(contents3);
			
		

			contents.appendChild(row);

		}
		fila.appendChild(contents);
		container.appendChild(fila);
	}
			
		$('#conceptos').val(JSON.stringify(data))
		
		var contratos = $('#contratosSheets').val();
		var json = JSON.parse(contratos); //Make it readable from input by an onload function		
		var obj = {};
		var obj2 = {};
		
		for (i=0; i<arrayConceptos.length; i++) {
			obj[arrayConceptos[i]] = 0;
			obj2[arrayConceptos[i]] = 0;
		}
		
		for (j=0; j<arrayConceptos.length; j++) {
			var counter = 1;
		for (i=0; i<json.length; i++) {
		if (json[i].servicio == arrayConceptos[j] && (json[i].plantel).toUpperCase() == plantel.toUpperCase()) {

			obj[arrayConceptos[j]] = counter++
			obj2[arrayConceptos[j]] += parseInt(json[i].costo);
			
				console.log(obj);
			}
		}
	}

	var contratados = Object.values(obj);
	var recuperacion = Object.values(obj2);

console.log(contratados);

	var i = 0;
	$('.btn_conceptos').each(function() {
		$(this).next().text(contratados[i]);
		$(this).next().next().text(recuperacion[i]);
		i++
	});

	
		
}

jQuery.fn.textNodes = function() {
  return this.contents().filter(function() {
    return (this.nodeType === Node.TEXT_NODE && this.nodeValue.trim() !== "");
  });
}

function fetch() {
// 	window.history.replaceState(null, null, "?plantel="+encodeURIComponent(plantel)+"&concepto="+encodeURIComponent(theValue)); */

var theValue = $('#servicio').val();
		var arr = {};
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
						
						if (response !== 'No se encontraron contratos') {
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
						}
						
						
						}
						}
                });

request.done(function (response, textStatus, jqXHR){
$('#categorias').hide();
$('#containerTwo').show();});
request.fail(function (jqXHR, textStatus, errorThrown){console.error("Failure: "+ textStatus, errorThrown);});
request.always(function () {}); $('#categorias').hide();
$('#containerTwo').show();

}

				
$('#salon').on('change','input',function() {
	var obj = {};
	var date = new Date();
	var hora = date.toLocaleTimeString();
	$('#status').text('Sin guardar');	
	
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
	

$( document ).ready(function( $ ) {
	
		request = $.ajax({	//Exports our database from MySQL to be used in sheets later.
                        url: "initialize.php",
						type: "post",
						success: function(response) {
						$('#contratosSheets').val(response);


						}
				});

//var url_string = window.location.href;
//var url = new URL(url_string);
//var servicio = url.searchParams.get('servicio'); 

if (window.location.search.indexOf('servicio=') > -1) {
   fetch();
}

 var timePicker = $('#timepicker').timepicker({
    'minTime': '3:00pm',
    'maxTime': '7:00pm',
    'showDuration': true
});



/* $('.horaSalida').on('changeTime', function() {
    $(this).text($(this).val());
}); */

plantel = $('#plantel').val();
request = $.ajax({
                        url: "key.php",
						type: "POST",
						data: {'plantel':plantel},
						success: function(response) {
						$('#almacenamiento').val(response);
						console.log('Verifica integridad de base de datos: ');
		var data = JSON.parse(response); //Make it readable from input by an onload function
		var data = data[0]; //It comes in an array so get the only value.
		build(JSON.parse(data['skeleton']));

		console.log(JSON.parse(data['almacenamiento']));
												
						}
				});	
				




/* $('#table').on('click','.horaSalida', function(){
$(this).timepicker({
    'minTime': '3:00pm',
    'maxTime': '6:00pm',
    'showDuration': true
});

}); */

/* $('#table').on('changeTime','.horaSalida',function() {

$(this).text($(this).val());

 //  $(this).parent().contents().filter(function(){ return this.nodeType == 3; }).replaceWith($(this).val());

}); */

timePicker.on('changeTime', function() {
$(this).parent().textNodes().replaceWith('');
$(this).parent().append($(this).val());
  });

 $('#table').on('click','.horaSalida',function() {

timePicker.appendTo(this);

   timePicker.timepicker('show');


}); 


$('#table').on('click','.datePlz', function(){

$(this).datetimepicker({timepicker:false,mask:true,format:'Y/m/d'});
});



$('#table').on('change','.datePlz', function(){
var val = $(this).val();
$(this).text(val);
});


$('#table').on('change','.properPlz',function() {
            var proper = properCase($(this).text());
			$(this).text(proper)			
});

$('#add').click(function() {
var servicio = $('#servicio').val();

	$('#2obj').toggle();
	$('#formContrato').toggle();
	$('#salon').toggle();

console.log(servicio);
if (servicio === "tiempo extendido") {
	$('.horaSalida').slideDown();
} else {
	$('.horaSalida').slideUp();
}

	$('.datePlz').datetimepicker({timepicker:false,mask:true,format:'Y/m/d'});
});
	
$('#table').on('change','.servicioPlz',function() {
	var servicio = $(this).text();
	var data = JSON.parse($('#conceptos').val());
	var conceptos = Object.values(data)
	var source = [].concat.apply([],conceptos);
	
	if (source.indexOf(servicio) == -1) {
		this.innerHTML = '';
		this.style.backgroundColor = 'red';
		document.getElementById("export-btn").disabled = true;
	} else {
		$(this).css('backgroundColor','#ff9433');
		document.getElementById("export-btn").disabled = false;
	if (servicio === 'tiempo extendido') {
	$('.horaSalida').slideDown();
	var hora = $(this).next().text();
	console.log(hora);
	if (hora.length === 0) {
		document.getElementById("export-btn").disabled = true;
	} else {
		document.getElementById("export-btn").disabled = false;
	}
	} else {
		$('.horaSalida').slideUp();
		document.getElementById("export-btn").disabled = false;
	}
	}
});


$('#table').on('change','.genderPlz',function() {
var genders = ['Masculino','Femenino'];
var input = $(this).text();

console.log(genders.indexOf(input));

if (genders.indexOf(input) == -1) {
	this.style.backgroundColor = 'red';
	document.getElementById("export-btn").disabled = true;
} else {
	$(this).css('backgroundColor','#ff9433');
	document.getElementById("export-btn").disabled = false;
}

});


$('#formContrato').submit(function(event) {
                event.preventDefault();
});


	



});