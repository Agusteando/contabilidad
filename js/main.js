$(document).ready(function () {
	
var rol = ($('#rol').val()).toLowerCase();

if (rol !== 'admin') {
$('.btn-plantel').not('#'+rol).each(function() {

	$(this).prop('disabled',true).css({'opacity':0.2,'cursor':'not-allowed'});
});
}
//Hacer un query para extraer data relevante desde MySQL, si no es factible google sheets.

var data = { 'PM':{'comedores':200,'talleres':100,"tiempo extendido":10},'SM':{'comedores':200,'talleres':100,"tiempo extendido":10},'PT':{'comedores':200,'talleres':100,"tiempo extendido":10},'ST':{'comedores':200,'talleres':100,"tiempo extendido":10},'KM':{'comedores':200,'talleres':100,"tiempo extendido":10},'KT':{'comedores':200,'talleres':100,"tiempo extendido":10} };

var planteles = Object.keys(data);
var conceptos = Object.values(data);

console.log(planteles);
console.log(conceptos);

for (i=0; i<planteles.length; i++) {

var PLANTEL = document.getElementById(planteles[i]);

var table = document.createElement('table');


var data =  Object.keys(conceptos[i]);

for (j=0; j<data.length; j++) {
	
var col1 = document.createElement('td');
var col2 = document.createElement('td');
var row = document.createElement('tr');

row.className = "summary";
col1.innerHTML = data[j];
col2.innerHTML = "Test";
col1.className = "main";
col2.className = "main";

row.appendChild(col1);
row.appendChild(col2);
table.appendChild(row);
}





PLANTEL.appendChild(table);


}

});