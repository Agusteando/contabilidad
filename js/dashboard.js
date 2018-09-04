$(document).ready(function () {

var data = {"talleres":["artes","catesismo","club de tareas","danza árabe","futbol","guitarra","jazz","mini tennis","tai kwon do","taller de inglés","teatro musical","teclado"],"comedores":["biberón","cena","comida","desayuno","papilla"],"tiempo extendido":['tiempo extendido'] };



var categorias = Object.keys(data)
var conceptos = Object.values(data)
var arr = [];
var obj = {};
for (i=0; i<conceptos.length; i++) {
	for (j=0; j<conceptos[i].length; j++) {
		var lista = conceptos[i]
		arr.push(lista[j]);
	}
}
console.log(arr);
console.log(conceptos);

for (i=0; i<arr.length; i++) {
	obj[arr[i]] = {};
}




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