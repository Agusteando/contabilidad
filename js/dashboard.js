$(document).ready(function () {

/* 	document.getElementById("export-btn").disabled = true; */

	$('#2obj').click(function (e) {

		var data = JSON.parse($('#almacenamiento').val()); //Make it readable from input by an onload function
		var data = data[0]; //It comes in an array so get the only value.
		var data = JSON.parse(data['almacenamiento']); //Get through the first key
		


		var obj = {}; //For smart loop to get unique values
		var arr = []; //To concat existing and new values here.
		servicio = data[$('#servicio').val()];
		var arrayExistente = Object.values(data[$('#servicio').val()]); //Create an array of existing values.


		var array = JSON.parse([$('#data').val()]); //Get new values in readable format.
		fecha = $('#fechaHoy').val();
		var arrayExistente = servicio[fecha];

		if ($('#servicio').val() === "tiempo extendido") {
			console.log(Array.isArray(array));
			console.log(arrayExistente);
			if (arrayExistente === undefined) {
				var arrayExistente = servicio[fecha] = {};

				var keeys = Object.keys(array);
				var vaalues = Object.values(array);
				for (i = 0; i < keeys.length; i++) {
					arrayExistente[keeys[i]] = vaalues[i];
				}

			} else {

				var keeys = Object.keys(array);
				var vaalues = Object.values(array);
				for (i = 0; i < keeys.length; i++) {
					arrayExistente[keeys[i]] = vaalues[i];
				}

			}


		} else {
			//This entire block works with simple arrays for Servicio de alimentos. No associative arrays.
			if (arrayExistente === undefined) {
				arrayExistente = [];

			} //Prevents undefined from being inside our array.
			//console.log(arrayExistente +" + "+array+": ");
			var merge = arrayExistente.concat(array); //To concat existing and new values here.
			for (i = 0; i < merge.length; i++) {
				obj[merge[i]] = "";
			} //For smart loop to get unique values

			var unique = Object.keys(obj); //Make an array of unique values.
			plantel = $('#plantel').val(); //Variables to append our new entry to the main object
			fecha = $('#fechaHoy').val();
			servicio = data[$('#servicio').val()];
			servicio[fecha] = unique; //This is the final output.
		}


		data = JSON.stringify(data); //Save as a string so database can store it without removing empty keys.

$('#dataSheets').val(data);
			guardaRegistros(data,e);	
	});


});

function guardaRegistros(data,e) {

console.log(data);
	var plantel = $('#plantelSheets').val();
			 request = $.ajax({
			url: "preSheets.php", //First: Save to DB and then send to Sheets.
			type: "POST",
			data: {
				'almacenamiento': data,
				'plantel': plantel
			},
			success: function () {
				init(e);
			}
		}); 
}

var properCase = function (str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};