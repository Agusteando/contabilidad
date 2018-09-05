$(document).ready(function () {

var data = {"talleres":["artes","catesismo","club de tareas","danza árabe","futbol","guitarra","jazz","mini tennis","tai kwon do","taller de inglés","teatro musical","teclado"],"comedores":["biberón","cena","comida","desayuno","papilla"],"tiempo extendido":['tiempo extendido'] };

$('#2sheets').click(function() {
	var data = JSON.parse($('#almacenamiento').val()); //Make it readable from input by an onload function
	var data = data[0]; //It comes in an array so get the only value.
	var data = JSON.parse(data['almacenamiento']); //Get through the first key
	console.log(data);
	var obj = {}; //For smart loop to get unique values
	var arr = []; //To concat existing and new values here.
	var arrayExistente = Object.values(data[$('#servicio').val()]); //Create an array of existing values.
	var array = JSON.parse([$('#data').val()]); //Get new values in readable format.

	if ($('#servicio').val() === "tiempo extendido") {
	console.log(Array.isArray(array));
	fecha = $('#fechaHoy').val();
	servicio = data[$('#servicio').val()];
	var arrayExistente = servicio[fecha];
	console.log(arrayExistente);
	if (arrayExistente === undefined) {	
	var arrayExistente = servicio[fecha] = {};
	
	var keeys = Object.keys(array);
	var vaalues = Object.values(array);
	for (i=0; i<keeys.length; i++) {
		arrayExistente[keeys[i]] = vaalues[i];
		}
	
	} else {
	
	var keeys = Object.keys(array);
	var vaalues = Object.values(array);
	for (i=0; i<keeys.length; i++) {arrayExistente[keeys[i]] = vaalues[i];}
	
	}

console.log(data);
} else {

//This entire block works with simple arrays for Servicio de alimentos.
if (arrayExistente.length !== 0) { arr = arrayExistente[0];} //Prevents undefined from being inside our array.
var merge = arr.concat(array); //To concat existing and new values here.
for (i=0; i<merge.length; i++) { obj[merge[i]] = ""; } //For smart loop to get unique values
var unique = Object.keys(obj); //Make an array of unique values.
plantel = $('#plantel').val(); //Variables to append our new entry to the main object
fecha = $('#fechaHoy').val();
servicio = data[$('#servicio').val()];
servicio[fecha] = unique; //This is the final output.
}


data = JSON.stringify(data); //Save as a string so database can store it without removing empty keys.

request = $.ajax({
                        url: "preSheets.php", //First: Save to DB and then send to Sheets.
						type: "POST",
						data: {'almacenamiento':data,
							   'plantel':plantel},
						success: function(data) {
							console.log(data);
							
					 }
				});
});				

var categorias = Object.keys(data)
var conceptos = Object.values(data)





var container = document.getElementById('categorias');
for (i=0; i<categorias.length; i++) {
	
	var fila = document.createElement('tr');
	var label = document.createElement('td');
	var contents = document.createElement('td');
	fila.style.width = "100%";
	fila.className = "filas_servicios";
/*	label.style.display = "inline-block"; */
	label.innerHTML = categorias[i];
	fila.appendChild(label);
	fila.appendChild(contents);
	label.className = "label_servicios";
	for (j=0; j<conceptos[i].length; j++) {
	var estosConceptos = conceptos[i];
	var btn = document.createElement('button');
	btn.className = "btn_conceptos";
	btn.innerHTML = estosConceptos[j];
	btn.style.width = "100%";
	btn.name = 'servicio';
	btn.value = estosConceptos[j];
	contents.appendChild(btn);
	}
	container.appendChild(fila);	
}


});

var properCase = function (str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};