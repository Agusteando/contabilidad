function build(data) {
	var categorias = Object.keys(data)
	var conceptos = Object.values(data)
	var arrayConceptos = [].concat.apply([], conceptos);
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

	for (i = 0; i < arrayConceptos.length; i++) {
		obj[arrayConceptos[i]] = 0;
		obj2[arrayConceptos[i]] = 0;
	}

	for (j = 0; j < arrayConceptos.length; j++) {
		var counter = 1;
		for (i = 0; i < json.length; i++) {
			if (json[i].servicio == arrayConceptos[j] && (json[i].plantel).toUpperCase() == plantel.toUpperCase()) {

				obj[arrayConceptos[j]] = counter++
					obj2[arrayConceptos[j]] += parseInt(json[i].costo);


			}
		}
	}

	var contratados = Object.values(obj);
	var recuperacion = Object.values(obj2);


	var i = 0;
	$('.btn_conceptos').each(function () {
		$(this).next().text(contratados[i]);
		$(this).next().next().text(recuperacion[i]);
		i++
	});


}

function tablaConceptos(data) {

	var table = document.getElementById('tablaConceptos');
	
	var categorias = Object.keys(data)
	var conceptos = Object.values(data)
	var arrayConceptos = [].concat.apply([], conceptos);
	var arr = [];
	
	for (i=0; i<conceptos.length; i++) {
	arr.push(conceptos[i].length);	
	}


	
	var height = Math.max(...arr);
	var h = 0;

  	for (j=0; j<height; j++) {
		var estosConceptos = conceptos[j];
		var row = document.createElement('tr');
		row.style.width = "100%";
		
		for (i=0; i<categorias.length; i++) {
		if (j === 0) {
		var th = document.createElement('th');
		th.innerHTML = categorias[h];
		} else {
		var th = document.createElement('td');
		}

		th.style.width = "100px"
		th.contentEditable = true;
		
		row.append(th);
		h++
	}

		table.appendChild(row);
	}  
}

jQuery.fn.textNodes = function () {
	return this.contents().filter(function () {
		return (this.nodeType === Node.TEXT_NODE && this.nodeValue.trim() !== "");
	});
}

function fetch() {


	var theValue = $('#servicio').val();
	var arr = {};
	var $form = $('#selectionScreen');
	var $inputs = $form.find("input, select, button, textarea");
	var serializedData = $inputs.serializeArray();
	for (i = 0; i < serializedData.length; i++) {
		arr[serializedData[i].name] = serializedData[i].value;
	}
	console.log(arr);
	request = $.ajax({
		url: "request.php",
		type: "post",
		data: arr,
		success: function (response) {

			if (response !== 'No se encontraron contratos') {
				var data = JSON.parse(response);

				console.log(data);

				var salon = document.getElementById('salon');

				for (i = 0; i < data.length; i++) {

					var container = document.createElement('label');
					container.className = "bigBox";
					var span = document.createElement('span');
					span.className = "checkmark ss " + data[i].genero;
					var box = document.createElement('input');
					box.setAttribute("type", "checkbox");
					container.innerHTML = data[i].apellidoPaterno + " " + data[i].apellidoMaterno + " " + data[i].nombres;
					box.value = data[i].id;
					container.appendChild(box);
					container.appendChild(span);
					salon.appendChild(container);
				}


			}
		}
	});

	request.done(function (response, textStatus, jqXHR) {
		$('#categorias').hide();
		$('#containerTwo').show();
	});
	request.fail(function (jqXHR, textStatus, errorThrown) {
		console.error("Failure: " + textStatus, errorThrown);
	});
	request.always(function () {});
	$('#categorias').hide();
	$('#containerTwo').show();

}


$('#salon').on('change', 'input', function () {
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
		$('input:checked').each(function () {
			arr.push($(this).val());
		});
		console.log(arr);
		$('#data').val(JSON.stringify(arr));

	}
});

function init(e) {
	var plantel = $('#plantelSheets').val();
	request = $.ajax({ //Exports our database from MySQL to be used in sheets later.
		url: "initialize.php",
		data: {
			'plantel': plantel
		},
		type: "post",
		success: function (response) {
			$('#contratosSheets').val(response);

			if (e !== undefined) {
			if (e.type === 'click') {
				updateSheets();
				console.log('App Script was called');
			} else {
				console.log('Didnt disturb App Script');
			}
			}

		}
	});
}


$(document).ready(function ($) {


	var plantel = $('#plantel').val();

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


	request = $.ajax({
		url: "key.php",
		type: "POST",
		data: {
			'plantel': plantel
		},
		success: function (response) {
			console.log(response);
			$('#almacenamiento').val(response);

			var data = JSON.parse(response); //Make it readable from input by an onload function
			var data = data[0]; //It comes in an array so get the only value.



			
			$.when($.ajax(init())).then(function () {
				build(JSON.parse(data['skeleton']))
			});

			tablaConceptos(JSON.parse(data['skeleton']));
	
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

	timePicker.on('changeTime', function () {
		$(this).parent().textNodes().replaceWith('');
		$(this).parent().append($(this).val());
	});

	$('#table').on('click', '.horaSalida', function () {

		timePicker.appendTo(this);

		timePicker.timepicker('show');


	});


	$('#table').on('click', '.datePlz', function () {

		$(this).datetimepicker({
			timepicker: false,
			mask: true,
			format: 'Y/m/d'
		});
	});


	$('#table').on('change', '.datePlz', function () {
		var val = $(this).val();
		$(this).text(val);
	});


	$('#table').on('change', '.properPlz', function () {
		var proper = properCase($(this).text());
		$(this).text(proper)
	});

	$('#agregarEventual').click(function () {
		$('#formEventual').toggle();
	});

	$('#agregarContrato').click(function () {
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

		$('.datePlz').datetimepicker({
			timepicker: false,
			mask: true,
			format: 'Y/m/d'
		});
	});
	
		$('#agregarConcepto').click(function () {
		$('#tablaConceptos').toggle();
	});


	$('#table').on('change', '.servicioPlz', function () {
		var servicio = $(this).text();
		var data = JSON.parse($('#conceptos').val());
		var conceptos = Object.values(data)
		var source = [].concat.apply([], conceptos);

		if (source.indexOf(servicio) == -1) {
			this.innerHTML = '';
			this.style.backgroundColor = 'red';
			document.getElementById("export-btn").disabled = true;
		} else {
			$(this).css('backgroundColor', '#ff9433');
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


	$('#table').on('change', '.genderPlz', function () {
		var genders = ['Masculino', 'Femenino'];
		var input = $(this).text();

		console.log(genders.indexOf(input));

		if (genders.indexOf(input) == -1) {
			this.style.backgroundColor = 'red';
			document.getElementById("export-btn").disabled = true;
		} else {
			$(this).css('backgroundColor', '#ff9433');
			document.getElementById("export-btn").disabled = false;
		}

	});


	$('#formContrato').submit(function (event) {
		event.preventDefault();
	});

	$('#formEventual').submit(function (event) {


		var $form = $(this);
		var $inputs = $form.find("input, select, button, textarea");
		var serializedData = $form.serialize();
		var arr = $form.serializeArray();

		$('#labelEventual').text('Intentando guardar');
		var url = "https://script.google.com/macros/s/AKfycbzqO3v7GmY6xM2XuGVvqOH4R6WkKWXudToa6lzx-kVSzOQD4b8/exec?tipo="
		var param = "eventuales"
		request = $.ajax({
			crossDomain: true,
			url: url + encodeURIComponent(param),
			type: "post",
			data: serializedData,
			dataType: "json"
		});


		request.done(function (response, textStatus, jqXHR) {
			// log a message to the console
			$('#labelEventual').text('Se añadió un registro eventual');
		});


		request.fail(function (jqXHR, textStatus, errorThrown) {
			// log the error to the console
			console.error(
				"The following error occured: " +
				textStatus, errorThrown
			);
		});


		request.always(function (arr) {
			// reenable the inputs
			$inputs.val('');
			var data = arr.data

			var salon = document.getElementById('wrapper');

			var container = document.createElement('label');
			container.className = "bigBox";
			var span = document.createElement('span');
			span.className = "checkmark ss Masculino";
			var box = document.createElement('input');
			box.setAttribute("type", "checkbox");
			container.innerHTML = data[1];
			box.value = data[0];
			container.appendChild(box);
			container.appendChild(span);
			salon.appendChild(container);

		});

		// prevent default posting of form
		event.preventDefault();


	});


});